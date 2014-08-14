<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'pastGalleriesList');
$sort = $modx->getOption('sort',$scriptProperties,'id');
$dir = $modx->getOption('dir',$scriptProperties,'DESC');
$limit = $modx->getOption('limit',$scriptProperties,20);
$offset = $modx->getOption('offset',$scriptProperties,0);
$totalVar = $modx->getOption('totalVar', $scriptProperties, 'total');

$record = $modx->query("SELECT MAX(id) FROM {$modx->getTableName('africanGalleries')} WHERE phase=2");
$highestId = (integer) $record->fetch(PDO::FETCH_COLUMN);
$record->closeCursor();


$c = $modx->newQuery('africanGalleries');
if(!empty($highestId)) {
    $c->where(array(
        'id:!=' => $highestId,
        'AND:phase:=' => 2
    ));
} else {
    return '<p style="width:300px; margin:100px auto 100px auto;">No galleries currently available!</p>';
}
$total = $modx->getCount('africanGalleries',$c);
$modx->setPlaceholder($totalVar,$total);


$c->limit($limit,$offset);
$c->sortby($sort,$dir);
$galleries = $modx->getCollection('africanGalleries',$c);


$output = '';
foreach ($galleries as $gallery) {
    $galleryArray = $gallery->toArray();
    $output .= $sovereign->getChunk($tpl,$galleryArray);
}
return $output;