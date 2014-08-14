<?php
require_once MODX_CORE_PATH.'model/phpthumb/modphpthumb.class.php';

class AsianSingleJudgeCreateProcessor extends modObjectProcessor {

    public $object;
    /** @var modMediaSource|modFileMediaSource $source */
    public $source;
    //private $resourceParentId = 21; // Change on upload
    //private $resourceTemplateId = 10; // Change on upload
    public $path;

    public function getSource() {
        $this->modx->loadClass('sources.modMediaSource');
        $this->source = modMediaSource::getDefaultSource($this->modx,$this->getProperty('source'));
        if (empty($this->source) || !$this->source->getWorkingContext()) {
            return false;
        }
        return $this->source;
    }

    public function process() {
        // gets the id of current gallery
        $galleryId = $this->getProperty('galleryId');

        // creates a group using the gallery id if one doesn't already exist
        if (!$userGroup = $this->modx->getObject('modUserGroup', array('name' => 'AsianJudgesGallery#'.$galleryId))) {
            $userGroup = $this->modx->newObject('modUserGroup', array('name' => 'AsianJudgesGallery#'.$galleryId));
            $userGroup->save();

            // Add context access to the usergroup
            $context = $this->modx->newObject('modAccessContext');
            $context->set('target', 'web');
            $context->set('principal_class', 'modUserGroup');
            $context->set('principle', $userGroup->get('id'));
            $context->set('authority', '7');
            $context->set('policy', '4');
            $context->save();
        }



        // creates the appropriate role for the user if it doesn't already exist
        if (!$role = $this->modx->getObject('modUserGroupRole', array('name' => 'AsianJudge'))) {
            $role = $this->modx->newObject('modUserGroupRole',
                array('name' => 'AsianJudge',
                    'authority' => '7'));
            $role->save();
        }


        // Get the filename string from the $_FILES array
        $filenames = array();
        if (is_array($_FILES)) {
            foreach ($_FILES as $file) {
                if (!empty($file['name'])) {
                    $filenames[] = $file['name'];
                }
            }
        }
        $fileName = $filenames[0];


        // creates the user account with all the fields the judge will need
        if(!$user = $this->modx->getObject('modUserProfile', array('email' => $this->getProperty('email')))) {
            $user = $this->modx->newObject('modUser', array('username' => $this->getProperty('email'))); // make the username the email
            $user->set('primary_group', $userGroup->get('id'));
            $user->set('password',$this->getProperty('password'));
            $profile = $this->modx->newObject('modUserProfile');
            $profile->set('fullname', $this->getProperty('fullname'));
            $profile->set('email', $this->getProperty('email'));
            // These 3 fields are unneeded so using them for position, organisation and biography.
            $profile->set('address', $this->getProperty('address'));
            $profile->set('city', $this->getProperty('city'));
            $profile->set('comment', $this->getProperty('comment'));
            // Assign the filename to the correct property
            $profile->set('website', $fileName); // using website as it is an unneeded field
            $profile->save();
            $user->addOne($profile);
            $success = $user->save();

            $this->path = MODX_BASE_PATH . $this->getProperty('parent').$galleryId.'/judges/' . $profile->get('website');
        } else {
            $success = false;
        }


		// Save details into separate judge database table to make accessing easier in front end
        $frontJudge = $this->modx->newObject('asianJudges');
        $frontJudge->set('gallery_id', $galleryId);
        $frontJudge->set('fullname', $this->getProperty('fullname'));
        $frontJudge->set('email', $this->getProperty('email'));
        $frontJudge->set('country', '');
        $frontJudge->set('position', $this->getProperty('address'));
        $frontJudge->set('organisation', $this->getProperty('city'));
        $frontJudge->set('biography', $this->getProperty('comment'));
        $frontJudge->set('filename', $fileName);
        $frontJudge->save();

        // Assign the user both a group and a role
        $joinSuccess = $user->joinGroup($userGroup->get('id'), $role->get('id'));

        // creates a resource group if it doesn't already exist
        if (!$resourceGroup = $this->modx->getObject('modResourceGroup', array('name' => 'JudgesGallery'))) {
            $resourceGroup = $this->modx->newObject('modResourceGroup', array('name' => 'JudgesGallery'));
            $resourceGroup->save();
        } else {
            $resourceGroup = $this->modx->getObject('modResourceGroup', array('name' => 'JudgesGallery'));
        }

		$this->modx->log(modX::LOG_LEVEL_DEBUG, ' BEFORE FIND PAGE ');
        // Add page to the resource group
        $galleryPage = $this->modx->getObject('modResource', array('pagetitle' => 'JudgesGallery'));
        $galleryPage->joinGroup($resourceGroup->get('id'));

		$this->modx->log(modX::LOG_LEVEL_DEBUG, ' AFTER FIND PAGE ');

        // Add the resource group to the user group
        $rgId = $resourceGroup->get('id');
        $resourceAccess = $this->modx->newObject('modAccessResourceGroup');
        $resourceAccess->fromArray(array(
            'principal' => $userGroup->get('id'),
            'principal_class' => 'modUserGroup',
            'target' => $rgId,
            'authority' => 7,
            'policy' => 13,
            'context_key' => 'web',
        ));
        if ($resourceAccess->save() == false) {
            $this->modx->log(modX::LOG_LEVEL_ERROR,'6-1. Could not create access to RG');
        } else {$this->modx->log(modX::LOG_LEVEL_ERROR,'6-1. Access to RG created');}



        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        // Save image to gallery and make thumbs
        $imageSaved = $this->saveImage();
        if ($imageSaved != true) {
            return $this->failure();
        }
        $this->generateThumbs();

        $this->modx->cacheManager->refresh();

        // Success checks and return
        if ($success && $joinSuccess) {
            $this->modx->log(modX::LOG_LEVEL_ERROR,'Profile Created: '.print_r($_POST,true));
            return $this->success();
        } else {
            $this->modx->log(modX::LOG_LEVEL_ERROR,'Profile Denied: '.print_r($_POST,true));
            return $this->failure();
        }

    }

    private function saveImage() {
        $id = $this->getProperty('galleryId');

        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking current id: ' . $id);
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        $success = $this->source->uploadObjectsToContainer($this->getProperty('parent').$id.'/judges/',$_FILES);

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }
        return true;
    }

    private function generateThumbs() {

        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking galleryUrl: ' . $path);
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . pathinfo($path,PATHINFO_DIRNAME).'/'.basename($path));
        $modPhpThumb = new modPhpThumb($this->modx);
        $modPhpThumb->setSourceFilename(pathinfo($this->path,PATHINFO_DIRNAME).'/'.basename($this->path)); // original image
        $modPhpThumb->setParameter('w', 276);
        $modPhpThumb->setParameter('h', 276);
        $modPhpThumb->setParameter('zc', 'C');
        $thumbName = 'large';
        $modPhpThumb->setParameter('config_output_format', 'jpeg');
        $output_filename = pathinfo($this->path,PATHINFO_DIRNAME).'/'.basename($this->path).'_'.$thumbName.'.'.$modPhpThumb->config_output_format;
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . $output_filename);
        if ($modPhpThumb->GenerateThumbnail()) {
            $modPhpThumb->RenderToFile($output_filename);
        }
        unset($modPhpThumb);

        $modPhpThumb = new modPhpThumb($this->modx);
        $modPhpThumb->setSourceFilename(pathinfo($this->path,PATHINFO_DIRNAME).'/'.basename($this->path)); // original image
        $modPhpThumb->setParameter('w', 170);
        $modPhpThumb->setParameter('h', 170);
        $modPhpThumb->setParameter('zc', 'C');
        $thumbName = 'medium';
        $modPhpThumb->setParameter('config_output_format', 'jpeg');
        $output_filename = pathinfo($this->path,PATHINFO_DIRNAME).'/'.basename($this->path).'_'.$thumbName.'.'.$modPhpThumb->config_output_format;
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . $output_filename);
        if ($modPhpThumb->GenerateThumbnail()) {
            $modPhpThumb->RenderToFile($output_filename);
        }
        unset($modPhpThumb);

        $modPhpThumb = new modPhpThumb($this->modx);
        $modPhpThumb->setSourceFilename(pathinfo($this->path,PATHINFO_DIRNAME).'/'.basename($this->path)); // original image
        $modPhpThumb->setParameter('w', 70);
        $modPhpThumb->setParameter('h', 50);
        $modPhpThumb->setParameter('zc', 'C');
        $thumbName = 'small';
        $modPhpThumb->setParameter('config_output_format', 'jpeg');
        $output_filename = pathinfo($this->path,PATHINFO_DIRNAME).'/'.basename($this->path).'_'.$thumbName.'.'.$modPhpThumb->config_output_format;
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . $output_filename);
        if ($modPhpThumb->GenerateThumbnail()) {
            $modPhpThumb->RenderToFile($output_filename);
        }
        unset($modPhpThumb);
    }

}
return 'AsianSingleJudgeCreateProcessor';