<?php
/**
 * Create a directory and add the properties to database.
 *
 * @param string $galleryName The name of the directory to create
 * @param string $parent The parent directory
 * @param boolean $prependPath (optional) If true, will prepend rb_base_dir to
 * the final path
 *
 * @package sovereign
 */
require_once MODX_CORE_PATH.'model/phpthumb/modphpthumb.class.php';

class GalleryAsianCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    /** @var modMediaSource|modFileMediaSource $source */
    public $source;
    public function checkPermissions() {
        return $this->modx->hasPermission('directory_create');
    }

    public function getLanguageTopics() {
        return array('file');
    }

    public function initialize() {

        $this->setUserId();
        $this->setCreateTime();
        // Get the filename string from the $_FILES array
        $filenames = array();
        if (is_array($_FILES)) {
            foreach ($_FILES as $file) {
                if (!empty($file['name'])) {
                    $filenames[] = $file['name'];
                }
            }
        }
        // Assign the filename to the correct property
        $fileName = $filenames[0];
        $this->setProperty('cover_filename', $fileName);
        $this->setProperty('phase', $this->getProperty('galleryphase'));
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        return parent::initialize();
    }

    private function setUserId() {
        $user = $this->modx->getLoginUserID();
        $this->setProperty('createdby', $user);
    }

    private function setCreateTime() {
        date_default_timezone_set('Asia/Hong_Kong');
        $date = date('m/d/Y h:i:s a', time());
        $this->setProperty('createdon', $date);
    }

    /**
     * Get the active Source
     * @return modMediaSource|boolean
     */
    public function getSource() {
        $this->modx->loadClass('sources.modMediaSource');
        $this->source = modMediaSource::getDefaultSource($this->modx,$this->getProperty('source'));
        if (empty($this->source) || !$this->source->getWorkingContext()) {
            return false;
        }
        return $this->source;
    }

    public function beforeSave() {
        $name = $this->getProperty('galleryname');
        if (empty($name)) {
            $this->addFieldError('galleryname',$this->modx->lexicon('sovereign.competition_err_ns_name'));
        } else if ($this->doesAlreadyExist(array('galleryname' => $name))) {
            $this->addFieldError('galleryname',$this->modx->lexicon('sovereign.competition_err_ae'));
        }
        return parent::beforeSave();
    }


    public function afterSave() {
        $id = $this->object->get('id');
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' CURRENT VALUE OF ID: ' . $id);

        /*if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }*/
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking current parent: ' . $this->getProperty('parent'));

        $success = $this->source->createContainer($id, $this->getProperty('parent'));

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $success2 = $this->source->createContainer('thumbnails', $this->getProperty('parent').$id);
        if (empty($success2)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $success3 = $this->source->createContainer('cover', $this->getProperty('parent').$id);
        if (empty($success3)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $success4 = $this->source->createContainer('judges', $this->getProperty('parent').$id);
        if (empty($success4)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }


        // Get filesystem source
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        $success = $this->source->uploadObjectsToContainer($this->getProperty('parent').$id.'/cover/',$_FILES);

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $path = MODX_BASE_PATH . $this->getProperty('galleryUrl').$id.'/cover/' . $this->getProperty('cover_filename');
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking galleryUrl: ' . $path);
        // generate thumb for this uploaded image
        $this->generateThumbs($path);
        return parent::afterSave();
    }

    private function generateThumbs($path) {
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . pathinfo($path,PATHINFO_DIRNAME).'/'.basename($path));
        $modPhpThumb = new modPhpThumb($this->modx);
        $modPhpThumb->setSourceFilename(pathinfo($path,PATHINFO_DIRNAME).'/'.basename($path)); // original image
        $modPhpThumb->setParameter('w', 1000);
        $modPhpThumb->setParameter('h', 180);
        $modPhpThumb->setParameter('zc', 'C');
        $thumbName = 'thumb';
        $modPhpThumb->setParameter('config_output_format', 'jpeg');
        $output_filename = pathinfo($path,PATHINFO_DIRNAME).'/'.basename($path).'_'.$thumbName.'.'.$modPhpThumb->config_output_format;
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . $output_filename);
        if ($modPhpThumb->GenerateThumbnail()) {
            $modPhpThumb->RenderToFile($output_filename);
        }
        unset($modPhpThumb);

        $modPhpThumb = new modPhpThumb($this->modx);
        $modPhpThumb->setSourceFilename(pathinfo($path,PATHINFO_DIRNAME).'/'.basename($path)); // original image
        $modPhpThumb->setParameter('w', 180);
        $modPhpThumb->setParameter('h', 50);
        $modPhpThumb->setParameter('zc', 'C');
        $thumbName = 'small';
        $modPhpThumb->setParameter('config_output_format', 'jpeg');
        $output_filename = pathinfo($path,PATHINFO_DIRNAME).'/'.basename($path).'_'.$thumbName.'.'.$modPhpThumb->config_output_format;
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . $output_filename);
        if ($modPhpThumb->GenerateThumbnail()) {
            $modPhpThumb->RenderToFile($output_filename);
        }
        unset($modPhpThumb);

    }
}
return 'GalleryAsianCreateProcessor';