<?php
class GalleryAsianEndPublicVotingProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('public_voting',0);

        return parent::initialize();
    }
}
return 'GalleryAsianEndPublicVotingProcessor';