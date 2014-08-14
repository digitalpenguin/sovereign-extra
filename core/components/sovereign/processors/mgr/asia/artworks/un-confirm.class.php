<?php
class GalleryAsianUnConfirmProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('confirmed', 0);
        return parent::initialize();
    }

}
return 'GalleryAsianUnConfirmProcessor';