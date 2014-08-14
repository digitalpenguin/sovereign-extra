<?php
class GalleryAfricanEndPublicVotingProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('public_voting',0);

        return parent::initialize();
    }
}
return 'GalleryAfricanEndPublicVotingProcessor';