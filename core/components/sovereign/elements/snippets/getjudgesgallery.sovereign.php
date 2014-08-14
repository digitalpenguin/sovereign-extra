<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'judgesGallery');
$tpl2 = $modx->getOption('tpl',$scriptProperties,'judgesGalleryAlt');
$sort = $modx->getOption('sort',$scriptProperties,'id');
$dir = $modx->getOption('dir',$scriptProperties,'DESC');
$limit = $modx->getOption('limit',$scriptProperties,10);
$offset = $modx->getOption('offset',$scriptProperties,0);
$totalVar = $modx->getOption('totalVar', $scriptProperties, 'total');


$artworks = array();

// Check for judges user group and check region
foreach($modx->user->getUserGroupNames() as $group) {
    $groupArray = str_split($group, 3);
    switch($groupArray[0]) {

        // African Gallery
        case 'Afr':
            $africanGroup = str_split($group, 21);
            $galleryId = $africanGroup[1]; // Gets the gallery number from the end of the group name
            // Get total number of records
            $c = $modx->newQuery('africanArtworks');
            if(!empty($galleryId)) {
                $c->where(array(
                    'gallery_id' => $galleryId
                ));
            } else {
                return '<p>No artworks currently available!</p>';
            }
            $total = $modx->getCount('africanArtworks',$c);
            $modx->setPlaceholder($totalVar,$total);
            $c->limit($limit,$offset);
            $c->sortby($sort,$dir);
            $artworks = $modx->getCollection('africanArtworks',$c);

            $output = '';
            $i = 1;
            foreach ($artworks as $artwork) {
                // set placeholder to preset votes to last modified value
                if(!$vote = $artwork->getOne('AfricanVote', array('artwork_id'=>$artwork->get('id'), 'user_id'=>$modx->user->get('id')))) {
                    //echo 'null';
                    $modx->setPlaceholder('stored_vote', 0);
                } else {
                    //echo $vote->get('id');
                    $modx->setPlaceholder('stored_vote', $vote->get('value_judges'));
                }
                $artworkArray = $artwork->toArray();
                if ($i % 2 != 0) {
                    $output .= $sovereign->getChunk($tpl,$artworkArray);
                } else {
                    $output .= $sovereign->getChunk($tpl2,$artworkArray);
                }
                $i++;
            }
            return $output;

            break;

        // Asian Gallery
        case 'Asi':
            $asianGroup = str_split($group, 19);
            $galleryId = $asianGroup[1]; // Gets the gallery number from the end of the group name
            // Get total number of records
            $c = $modx->newQuery('asianArtworks');
            if(!empty($galleryId)) {
                $c->where(array(
                    'gallery_id' => $galleryId
                ));
            } else {
                return '<p>No artworks currently available!</p>';
            }
            $total = $modx->getCount('asianArtworks',$c);
            $modx->setPlaceholder($totalVar,$total);

            $c->limit($limit,$offset);
            $c->sortby($sort,$dir);
            $artworks = $modx->getCollection('asianArtworks',$c);

            $output = '';
            $i = 1;
            foreach ($artworks as $artwork) {
                // set placeholder to preset votes to last modified value
                if(!$vote = $artwork->getOne('AsianVote', array('artwork_id'=>$artwork->get('id'), 'user_id'=>$modx->user->get('id')))) {
                    //echo 'null';
                    $modx->setPlaceholder('stored_vote', 0);
                } else {
                    //echo $vote->get('id');
                    $modx->setPlaceholder('stored_vote', $vote->get('value_judges'));
                }
                $artworkArray = $artwork->toArray();
                if ($i % 2 != 0) {
                    $output .= $sovereign->getChunk($tpl,$artworkArray);
                } else {
                    $output .= $sovereign->getChunk($tpl2,$artworkArray);
                }
                $i++;
            }
            return $output;
            break;

        // European Gallery
        case 'Eur':
            $europeanGroup = str_split($group, 22);
            $galleryId = $europeanGroup[1]; // Gets the gallery number from the end of the group name
            // Get total number of records
            $c = $modx->newQuery('europeanArtworks');
            if(!empty($galleryId)) {
                $c->where(array(
                    'gallery_id' => $galleryId
                ));
            } else {
                return '<p>No artworks currently available!</p>';
            }
            $total = $modx->getCount('europeanArtworks',$c);
            $modx->setPlaceholder($totalVar,$total);

            $c->limit($limit,$offset);
            $c->sortby($sort,$dir);
            $artworks = $modx->getCollection('europeanArtworks',$c);

            $output = '';
            $i = 1;
            foreach ($artworks as $artwork) {
                // set placeholder to preset votes to last modified value
                if(!$vote = $artwork->getOne('EuropeanVote', array('artwork_id'=>$artwork->get('id'), 'user_id'=>$modx->user->get('id')))) {
                    //echo 'null';
                    $modx->setPlaceholder('stored_vote', 0);
                } else {
                    //echo $vote->get('id');
                    $modx->setPlaceholder('stored_vote', $vote->get('value_judges'));
                }
                $artworkArray = $artwork->toArray();
                if ($i % 2 != 0) {
                    $output .= $sovereign->getChunk($tpl,$artworkArray);
                } else {
                    $output .= $sovereign->getChunk($tpl2,$artworkArray);
                }
                $i++;
            }
            return $output;
            break;

        // Middle-Eastern Gallery
        case 'Mid':
            $mideasternGroup = str_split($group, 24);
            $galleryId = $mideasternGroup[1]; // Gets the gallery number from the end of the group name
            // Get total number of records
            $c = $modx->newQuery('mideasternArtworks');
            if(!empty($galleryId)) {
                $c->where(array(
                    'gallery_id' => $galleryId
                ));
            } else {
                return '<p>No artworks currently available!</p>';
            }
            $total = $modx->getCount('mideasternArtworks',$c);
            $modx->setPlaceholder($totalVar,$total);

            $c->limit($limit,$offset);
            $c->sortby($sort,$dir);
            $artworks = $modx->getCollection('mideasternArtworks',$c);

            $output = '';
            $i = 1;
            foreach ($artworks as $artwork) {
                // set placeholder to preset votes to last modified value
                if(!$vote = $artwork->getOne('MideasternVote', array('artwork_id'=>$artwork->get('id'), 'user_id'=>$modx->user->get('id')))) {
                    //echo 'null';
                    $modx->setPlaceholder('stored_vote', 0);
                } else {
                    //echo $vote->get('id');
                    $modx->setPlaceholder('stored_vote', $vote->get('value_judges'));
                }
                $artworkArray = $artwork->toArray();
                if ($i % 2 != 0) {
                    $output .= $sovereign->getChunk($tpl,$artworkArray);
                } else {
                    $output .= $sovereign->getChunk($tpl2,$artworkArray);
                }
                $i++;
            }
            return $output;
            break;
    }
}