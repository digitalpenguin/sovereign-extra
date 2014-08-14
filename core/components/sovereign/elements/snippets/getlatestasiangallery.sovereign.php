<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'currentGalleryFirstPage');
$sort = $modx->getOption('sort',$scriptProperties,'id');
$dir = $modx->getOption('dir',$scriptProperties,'ASC');
$limit = $modx->getOption('limit',$scriptProperties,6);
$offset = $modx->getOption('offset',$scriptProperties,0);
$totalVar = $modx->getOption('totalVar', $scriptProperties, 'total');


$record = $modx->query("SELECT MAX(id) FROM {$modx->getTableName('asianGalleries')} WHERE phase=2");
$highestId = (integer) $record->fetch(PDO::FETCH_COLUMN);
$record->closeCursor();


$galleryId = $highestId;
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
$modx->setPlaceholder('current_offset', $offset+6);

$c->limit($limit,$offset);
$c->sortby($sort,$dir);
$artworks = $modx->getCollection('asianArtworks',$c);


$output = '';
foreach ($artworks as $artwork) {
    $artworkArray = $artwork->toArray();
    $output .= $sovereign->getChunk($tpl,$artworkArray);
    //$modx->log(modX::LOG_LEVEL_DEBUG, $sovereign->getChunk($tpl,$artworkArray));
}
return $output;