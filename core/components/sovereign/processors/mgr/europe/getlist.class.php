<?php
class GalleryEuropeGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'galleryEurope';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'galleryname:LIKE' => '%'.$query.'%',
                'OR:year:LIKE' => '%'.$query.'%',
            ));
        }

        $id = $this->getProperty('id');
        if (!empty($id)) {
            $c->where(array(
                'id' => $id
            ));
        }
        return $c;
    }
}
return 'GalleryEuropeGetListProcessor';