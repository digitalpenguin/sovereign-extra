<?php
class GalleryAsianStartPublicVotingProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('public_voting',1);

        return parent::initialize();
    }
}
return 'GalleryAsianStartPublicVotingProcessor';