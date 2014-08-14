<?php
class GalleryAsianActivateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {


        // Makes sure there are no other galleries open of the same type and phase.
        $type = $this->getProperty('type');
        $c = $this->modx->newQuery('asianGalleries');
        $c->where(array(
            'enabled' => 1,
            array(
                'AND:phase:=' => 0,
                array(
                    'AND:type:=' => $type
                )
            )
        ));
        $count = $this->modx->getCount('asianGalleries', $c);

        if($count != 0) {
            return 'Sorry, you may only activate one gallery of the same type for submissions. Either deactivate the current gallery or end the current submission phase to activate a new gallery.';
        } else {
            $this->setProperty('enabled', 1);
        }

        return parent::initialize();
    }

}
return 'GalleryAsianActivateProcessor';