<?php
class AsianArtworkUnTagWinnerProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('winner', '');
        return parent::initialize();
    }
}
return 'AsianArtworkUnTagWinnerProcessor';