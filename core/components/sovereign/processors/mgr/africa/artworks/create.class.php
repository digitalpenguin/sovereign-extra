<?php

require_once MODX_CORE_PATH.'model/phpthumb/modphpthumb.class.php';

class SovereignAfricanArtworkCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'africanArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';
    /** @var africanArtworks $object */
    public $object;

    /** @var modMediaSource $source */
    public $source;


    public function checkPermissions() {
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of dir : ' . $this->getProperty('galleryId'));

        return $this->modx->hasPermission('file_upload');
    }

    public function getLanguageTopics() {
        $langs = parent::getLanguageTopics();
        $langs[] = 'sovereign';
        return $langs;
    }

    public function initialize() {
        $this->setDefaultProperties(array(
            'source' => 1,
            'galleryname' => false,
        ));
        $this->setUserId();
        $this->setCreateTime();
        $this->setProperty('gallery_id', $this->getProperty('galleryId'));
        if (!$this->getProperty('galleryUrl')) return $this->modx->lexicon('file_folder_err_ns');
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

    public function process() {

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
        $this->setProperty('filename', $fileName);

        // Get filesystem source
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        return parent::process();
    }


    /**
     * Validate inputs
     * @return bool
     */
    public function beforeSave() {
        $fileName = $this->getProperty('filename');
        if (empty($fileName)) {
            $this->addFieldError('filename',$this->modx->lexicon('sovereign.artwork_err_ns_image'));
        } else if ($this->checkIfArtworksExist($fileName)) {
            $this->addFieldError('filename',$this->modx->lexicon('sovereign.artwork_err_ae_image'));
        }

        $artworkTitle = $this->getProperty('art_title');
        $galleryId = $this->getProperty('gallery_id');
        if (empty($artworkTitle)) {
            $this->addFieldError('art_title',$this->modx->lexicon('sovereign.artwork_err_ns_art_title'));
        } else if ($this->doesAlreadyExist(array('art_title' => $artworkTitle, 'gallery_id' => $galleryId))) {
            $this->addFieldError('art_title',$this->modx->lexicon('sovereign.artwork_err_ae_art_title'));
        }
        return parent::beforeSave();
    }

    /**
     * Checks if both filename and gallery_id exist in database
     * This enables the same image to be in different galleries but not the same one.
     * @param $filename
     * @return bool
     */
    private function checkIfArtworksExist($filename) {
        $galleryId = $this->getProperty('gallery_id');
        $c = $this->modx->newQuery('africanArtworks');
        $c->where(array('filename' => $filename, 'gallery_id' => $galleryId));
        $c->prepare();
        $total = $this->modx->getCount('africanArtworks', $c);
        if ($total > 0) {
            return true;
        }
        return false;
    }


    /**
     * After object has been saved, uploads image to specified location and generates the thumbs.
     * This is done after the save to ensure validation passes before transfer begins.
     * @return array|bool|string
     */
    public function afterSave() {
        $success = $this->source->uploadObjectsToContainer($this->getProperty('galleryUrl'),$_FILES);

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $path = MODX_BASE_PATH . $this->getProperty('galleryUrl') . $this->getProperty('filename');
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking galleryUrl: ' . $path);
        // generate thumbs for this uploaded image and save them to /thumbs sub-directory
        $this->generateThumbs($path);
    }




    /**
     * Generate thumbnails of the uploaded image
     */
    private function generateThumbs($path) {
        $i = 0;
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . $path);
        list($width, $height) = getimagesize($path);
        if ($width > $height) {
            // Landscape
            $thumbnail_widths = array(70, 170, 838);
            foreach ($thumbnail_widths as $thumbnail_width) {
                $modPhpThumb = new modPhpThumb($this->modx);
                $modPhpThumb->setSourceFilename($path); // original image
                if ($i === 0) {
                    $modPhpThumb->setParameter('w', $thumbnail_width);
                    $modPhpThumb->setParameter('h', 50);
                    $modPhpThumb->setParameter('zc', 'C');
                    $sizeName = 'small';
                } else if ($i === 1) {
                    $modPhpThumb->setParameter('w', $thumbnail_width);
                    $modPhpThumb->setParameter('h', $thumbnail_width);
                    $modPhpThumb->setParameter('zc', 'C');
                    $sizeName = 'medium';
                } else {
                    $modPhpThumb->setParameter('w', $thumbnail_width);
                    $sizeName = 'large';
                }
                $modPhpThumb->setParameter('config_output_format', 'jpeg');
                $output_filename = pathinfo($path,PATHINFO_DIRNAME).'/thumbnails/'.basename($path).'_'.$sizeName.'.'.$modPhpThumb->config_output_format;
                $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking output filename: ' . $output_filename);

                if ($modPhpThumb->GenerateThumbnail()) {
                    $modPhpThumb->RenderToFile($output_filename);
                }
                $i++;
                unset($modPhpThumb);

            }
        } else {
            // Portrait or Square
            $thumbnail_heights = array(70, 170, 650);
            foreach ($thumbnail_heights as $thumbnail_height) {
                $modPhpThumb = new modPhpThumb($this->modx);
                $modPhpThumb->setSourceFilename($path); // original image
                if ($i === 0) {
                    $modPhpThumb->setParameter('w', $thumbnail_height);
                    $modPhpThumb->setParameter('h', 50);
                    $modPhpThumb->setParameter('zc', 'C');
                    $sizeName = 'small';
                } else if ($i===1) {
                    $modPhpThumb->setParameter('w', $thumbnail_height);
                    $modPhpThumb->setParameter('h', $thumbnail_height);
                    $modPhpThumb->setParameter('zc', 'C');
                    $sizeName = 'medium';
                } else {
                    $modPhpThumb->setParameter('h', $thumbnail_height);
					$modPhpThumb->setParameter('w', 471);
                    $modPhpThumb->setParameter('zc', 'C');
                    $sizeName = 'large';
                }
                $modPhpThumb->setParameter('config_output_format', 'jpeg');
                $output_filename = pathinfo($path,PATHINFO_DIRNAME).'/thumbnails/'.basename($path).'_'.$sizeName.'.'.$modPhpThumb->config_output_format;
                if ($modPhpThumb->GenerateThumbnail()) {
                    $modPhpThumb->RenderToFile($output_filename);
                }
                $i++;
                unset($modPhpThumb);
            }
        }
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


}
return 'SovereignAfricanArtworkCreateProcessor';

