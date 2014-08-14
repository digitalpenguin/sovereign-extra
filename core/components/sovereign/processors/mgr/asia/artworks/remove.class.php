<?php
/**
 * Removes a file.
 *
 * @param string $file The name of the file.
 * @param boolean $prependPath If true, will prepend the rb_base_dir to the file
 * name.
 *
 * @package sovereign
 */
class GalleryAsianArtworksRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'asianArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    /** @var asianArtworks $object */
    public $object;

    /** @var modMediaSource|modFileMediaSource $source */
    public $source;

    public function process() {
        $sizes = array('_small.jpeg', '_medium.jpeg', '_large.jpeg');
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of file : ' . $this->getProperty('file'));

        $file = $this->getProperty('file');
        if (empty($file)) return $this->modx->error->failure($this->modx->lexicon('file_err_ns'));

        $loaded = $this->getSource();
        if (!($this->source instanceof modMediaSource)) {
            return $loaded;
        }
        if (!$this->source->checkPolicy('remove')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        //$this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of source : ' . $this->source->removeObject($file));

        $success = $this->source->removeObject($file);
        if (empty($success)) {
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->addFieldError($k,$msg);
            }
            return $this->failure();
        }

        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of file : ' . $this->getProperty('file'));

        foreach ($sizes as $size) {
            $success2 = $this->source->removeObject(pathinfo($file,PATHINFO_DIRNAME).'/thumbnails/'.basename($file).$size);
            if (empty($success2)) {
                $msg = 'thumbnail '.$size.' could not be removed!';
                $errors = $this->source->getErrors();
                foreach ($errors as $k => $msg) {
                    $this->addFieldError($k,$msg);
                }
                return $this->failure();
            }
        }

        return parent::process();
    }


    /**
     * @return boolean|string
     */
    public function getSource() {
        $source = $this->getProperty('source',1);
        /** @var modMediaSource $source */
        $this->modx->loadClass('sources.modMediaSource');
        $this->source = modMediaSource::getDefaultSource($this->modx,$source);
        if (!$this->source->getWorkingContext()) {
            return $this->modx->lexicon('permission_denied');
        }
        $this->source->setRequestProperties($this->getProperties());
        return $this->source->initialize();
    }

}
return 'GalleryAsianArtworksRemoveProcessor';