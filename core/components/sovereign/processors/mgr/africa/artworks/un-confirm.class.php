<?php
class GalleryAfricanUnConfirmProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('confirmed', 0);
        return parent::initialize();
    }

}
return 'GalleryAfricanUnConfirmProcessor';