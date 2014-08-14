<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'galleryHeader');

if (is_int((int)$_GET['galleryId'])) { // make sure value is integer
    $galleryId = $_GET['galleryId'];
}
$c = $modx->newQuery('africanGalleries');
if(!empty($galleryId)) {
    $c->where(array(
        'id' => $galleryId
    ));
} else {
    echo 'Cannot access specified gallery.';
}

$gallery = $modx->getObject('africanGalleries',$c);



$galleryArray = $gallery->toArray();
return $sovereign->getChunk($tpl,$galleryArray);