<?php
class AfricanArtworkUnTagWinnerProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('winner', '');
        return parent::initialize();
    }
}
return 'AfricanArtworkUnTagWinnerProcessor';