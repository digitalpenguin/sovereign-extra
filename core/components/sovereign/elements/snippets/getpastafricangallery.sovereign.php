<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'pastGalleryThumbs');
$sort = $modx->getOption('sort',$scriptProperties,'id');
$dir = $modx->getOption('dir',$scriptProperties,'DESC');

if (is_int((int)$_GET['galleryId'])) { // make sure value is integer
    $galleryId = $_GET['galleryId'];
}
$c = $modx->newQuery('africanArtworks');
if(!empty($galleryId)) {
    $c->where(array(
        'gallery_id' => $galleryId
    ));
} else {
    return '<p>No artworks currently available!</p>';
}
$c->sortby($sort,$dir);
$artworks = $modx->getCollection('africanArtworks',$c);


$output = '';
foreach ($artworks as $artwork) {
    $artworkArray = $artwork->toArray();
    $output .= $sovereign->getChunk($tpl,$artworkArray);
}
return $output;