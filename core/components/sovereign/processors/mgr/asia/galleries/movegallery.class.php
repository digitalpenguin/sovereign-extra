<?php
class GalleryAsianMoveToJudgesProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $phase = $this->getProperty('phase');

        $c = $this->modx->newQuery('asianArtworks');
        $c->where(array(
            'gallery_id' => $this->getProperty('id')
        ));
        $artworks = $this->modx->getCollection('asianArtworks', $c);
        foreach($artworks as $artwork) {
            if ($artwork->get('confirmed') == 0) {
                return 'Cannot move gallery while there are unconfirmed artworks!<br/> Either confirm the artworks or remove them.';
            }
        }

        if (!empty($phase)) {
            switch ($phase) {
                case 0:
                    $this->setProperty('phase', 0);
                    break;
                case 1:
                    $this->setProperty('phase', 1);
                    break;
                case 2:
                    $this->setProperty('phase', 2);
                    break;
            }
        }

        $this->setProperty('public_voting', 0);
        return parent::initialize();
    }

}
return 'GalleryAsianMoveToJudgesProcessor';