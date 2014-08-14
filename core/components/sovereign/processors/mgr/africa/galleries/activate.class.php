<?php
class GalleryAfricanActivateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {


        // Makes sure there are no other galleries open of the same type and phase.
        $type = $this->getProperty('type');
        $c = $this->modx->newQuery('africanGalleries');
        $c->where(array(
            'enabled' => 1,
            array(
                'AND:phase:=' => 0,
                array(
                    'AND:type:=' => $type
                )
            )
        ));
        $count = $this->modx->getCount('africanGalleries', $c);

        if($count != 0) {
            return 'Sorry, you may only activate one gallery of the same type for submissions. Either deactivate the current gallery or end the current submission phase to activate a new gallery.';
        } else {
            $this->setProperty('enabled', 1);
        }

        return parent::initialize();
    }

}
return 'GalleryAfricanActivateProcessor';