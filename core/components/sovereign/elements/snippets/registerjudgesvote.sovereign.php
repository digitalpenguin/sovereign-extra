<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

if(!$vote = $modx->getObject('africanVotes', array('artwork_id'=>$artworkId, 'user_id'=>$modx->user->get('id')))) {
    $vote = $modx->newObject('africanVotes');
    $vote->set('artwork_id', $artworkId);
    $vote->set('user_id', $modx->user->get('id'));
    $vote->set('gallery_id', $galleryId);
    $vote->set('value_judges', $value);
    $vote->set('ip', $_SERVER['REMOTE_ADDR']);
    $vote->set('date', time());
    $vote->save();
    return "Vote of {$value} (out of 5) successful.";
} else {
    $vote->set('value_judges', $value);
    $vote->set('ip', $_SERVER['REMOTE_ADDR']);
    $vote->set('date', time());
    $vote->save();
    if($value == null) {
        return 'Your vote has been reset to 0 for this artwork.';
    }
    return 'Your vote has been updated to '.$value.' (out of 5).';
}