<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'judgesGalleryPopUp');
$region = $modx->getOption('region',$scriptProperties,'asia');
$imageId = $modx->getOption('imageId',$scriptProperties);

$output = '';
if (is_int((int)$imageId)) { // to prevent hacking make sure incoming value is an integer
    $c = $modx->newQuery('africanArtworks');

    $c->where(array(
        'id' => $imageId
    ));


    $artworks = $modx->getCollection('africanArtworks', $c);

    foreach($artworks as $artwork) {
        $artworkArray = $artwork->toArray();
        $output .= $sovereign->getChunk($tpl,$artworkArray);
    }
}
return $output;