<?php
class AsianArtworksPublicGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'asianArtworks';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';

    public function prepareQueryBeforeCount(xPDOQuery $c) {

        // Used to filter artworks into galleries
        $galleryId = $this->getProperty('galleryId');
        if(!empty($galleryId)) {
            $c->where(array(
                    'gallery_id' => $galleryId, // only show artworks that match this gallery id

            ));
        }

        // Used to search for artworks in specific galleries
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'gallery_id' => $galleryId, // only show artworks that match this gallery id
                    array(
                        'art_title:LIKE' => '%'.$query.'%',
                        'OR:first_name:LIKE' => '%'.$query.'%',
                        'OR:surname:LIKE' => '%'.$query.'%',
                        'OR:country:LIKE' => '%'.$query.'%',
                        'OR:nominator:LIKE' => '%'.$query.'%'
                    )
            ));
        }

        return $c;
    }

    public function afterIteration(array $list) {
        $rows = array();
        foreach ($list as $row){
            $row['votes'] = $this->getVoteTotal($row['id']);
            $rows[] = $row;
        }
        return $rows;
    }

    private function getVoteTotal($artworkId) {
        $total = 0;
        $votes = $this->modx->getCollection('asianVotes', array('artwork_id'=>$artworkId));
        foreach ($votes as $vote) {
            $total = $total + $vote->get('value_public');
        }
        return $total;
    }
}
return 'AsianArtworksPublicGetListProcessor';