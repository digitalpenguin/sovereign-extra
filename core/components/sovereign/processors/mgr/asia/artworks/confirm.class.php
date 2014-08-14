<?php
class GalleryAsianConfirmProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('confirmed', 1);
        return parent::initialize();
    }

}
return 'GalleryAsianConfirmProcessor';