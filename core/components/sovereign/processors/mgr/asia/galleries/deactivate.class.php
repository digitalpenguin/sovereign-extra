<?php
class GalleryAsianDeactivateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('enabled', 0);
        return parent::initialize();
    }
}
return 'GalleryAsianDeactivateProcessor';