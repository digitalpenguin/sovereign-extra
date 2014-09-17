<?php
class GalleryAsianSubmissionsGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'asianGalleries';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';


    /**
     * Checks for matching value in the specified fields
     * @param xPDOQuery $c
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c) {

        $c->where(array(
            'phase' => 0
        ));

        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'galleryname:LIKE' => '%'.$query.'%',
                'OR:description:LIKE' => '%'.$query.'%',
            ));
        }
        return $c;
    }

    /**
     * Returns the specified row with new values from the functions below
     * @param array $list
     * @return array
     */
    public function afterIteration(array $list) {
        $rows = array();
        foreach ($list as $row){
            $row['artworktotal'] = $this->getArtworkCount($row['id']);
            $row['createdby'] = $this->getUserName($row['createdby']);
            $row['type'] = $this->getgalleryType($row['type']);
            $rows[] = $row;
        }
        return $rows;
    }

    /**
     * Returns the number of artworks in the specified gallery
     * @param $galleryId
     * @return int
     */
    private function getArtworkCount($galleryId) {
        $count = $this->modx->getCount('asianArtworks', array('gallery_id' => $galleryId));
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of count:' . $count);
        return $count;
    }

    /**
     * Returns the full user's name that created the gallery
     * @param $userId
     * @return mixed
     */
    private function getUserName($userId) {
        $profile = $this->modx->getObject('modUserProfile', array('internalKey' => $userId));
        $fullName = $profile->get('fullname');
        return $fullName;
    }

    private function getGalleryType($type) {
        if ($type == 0) {
            return 'Asian Art Prize';
        } else if ($type == 1) {
            return 'HK School Prize';
        } else {
            return 'SEA Art Prize';
        }
    }

}
return 'GalleryAsianSubmissionsGetListProcessor';