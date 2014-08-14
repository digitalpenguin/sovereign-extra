<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'currentGallery');
$sort = $modx->getOption('sort',$scriptProperties,'name');
$dir = $modx->getOption('dir',$scriptProperties,'ASC');


$c = $modx->newQuery('africanArtworks');
$c->sortby($sort,$dir);
$artworks = $modx->getCollection('africanArtworks',$c);

/* iterate */
$output = '';
foreach ($artworks as $artwork) {
    $artworkArray = $artwork->toArray();
    $output .= $sovereign->getChunk($tpl,$artworkArray);
}

return $output;