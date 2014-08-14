<?php
class GalleryAfricanConfirmProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('confirmed', 1);
        return parent::initialize();
    }

}
return 'GalleryAfricanConfirmProcessor';