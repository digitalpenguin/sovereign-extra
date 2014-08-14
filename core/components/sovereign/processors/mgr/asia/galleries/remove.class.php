<?php
/**
 * Remove a directory
 * @param string $galleryname The name of the gallery
 * @param string $dir The directory to remove
 * @param boolean $prependPath (optional) If true, will prepend rb_base_dir to
 * the final path
 *
 * @package sovereign
 *
 */
class GalleryAsianRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    /** @var modMediaSource|modFileMediaSource $source */
    public $source;

    /**
     * This function is overridden to prevent a competition from being deleted when artworks still exist.
     * @return bool
     */
    private function checkArtworksExist(){
        $galleryId = $this->getProperty('id');
        $c = $this->modx->newQuery('asianArtworks');
        $c->where(array('gallery_id' => $galleryId));
        $c->prepare();
        $total = $this->modx->getCount('asianArtworks', $c);
        if ($total > 0) {
            return true;
        }
        return false;
    }

    public function process() {
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of dir : ' . $this->getProperty('dir'));

        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('remove')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        $artworksExist = $this->checkArtworksExist();
        if (!$artworksExist) {
            $success = $this->source->removeContainer($this->getProperty('dir'));
            $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of dir : ' . $this->getProperty('dir'));
        } else {
            return $this->failure($this->modx->lexicon('sovereign.remove.refuse_delete_items_exist'));
        }

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }
        return parent::process();
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
return 'GalleryAsianRemoveProcessor';