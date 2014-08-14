<?php
require_once MODX_CORE_PATH.'model/phpthumb/modphpthumb.class.php';
class GalleryAfricanUploadCoverImageProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    /** @var modMediaSource|modFileMediaSource $source */
    public $source;

    public function initialize() {
        // Grab the file
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
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        return parent::initialize();
    }

    public function getSource() {
        $this->modx->loadClass('sources.modMediaSource');
        $this->source = modMediaSource::getDefaultSource($this->modx,$this->getProperty('source'));
        if (empty($this->source) || !$this->source->getWorkingContext()) {
            return false;
        }
        return $this->source;
    }

    public function process() {
        $id = $this->getProperty('id');

        // Get filesystem source
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        $success = $this->source->uploadObjectsToContainer($this->getProperty('galleryUrl').$id.'/cover/',$_FILES);

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $path = MODX_BASE_PATH . $this->getProperty('galleryUrl').$id.'/cover/' . $this->getProperty('cover_filename');
        $this->generateThumbs($path);

        return parent::process();
    }

    private function generateThumbs($path) {
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking path: ' . pathinfo($path,PATHINFO_DIRNAME).'/'.basename($path));
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
return 'GalleryAfricanUploadCoverImageProcessor';