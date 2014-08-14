<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';



/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'splitGallery');


// Get most recent gallery that is in public phase
$record = $modx->query("SELECT MAX(id) FROM {$modx->getTableName('asianGalleries')} WHERE phase=0");
$highestId = (integer) $record->fetch(PDO::FETCH_COLUMN);
$record->closeCursor();
$galleryId = $highestId;


// Get total number of records
$c = $modx->newQuery('asianArtworks');
if(!empty($galleryId)) {
    $c->where(array(
        'gallery_id' => $galleryId
    ));
}
$total = $modx->getCount('asianArtworks', $c);

//Divide total by 6 and round up to get the number of slides required
if($total < 7) {
    $numOfSlides = 1;
} else {
    $numOfSlides = ceil($total/6);
}

$modx->setPlaceholder('count', $total);


// Output the specified number of slides via the getchunk() function.
$output = '';
for ($i = 0; $i < $numOfSlides; $i++) {
    $output .= $sovereign->getChunk($tpl,'');
}

return $output;