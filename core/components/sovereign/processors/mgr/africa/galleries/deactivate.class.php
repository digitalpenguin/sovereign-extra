<?php
class GalleryAfricanDeactivateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('enabled', 0);
        return parent::initialize();
    }
}
return 'GalleryAfricanDeactivateProcessor';