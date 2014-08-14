<?php
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';

$corePath = $modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/');
require_once $corePath.'model/sovereign/sovereign.class.php';
$modx->sovereign = new Sovereign($modx);

$modx->lexicon->load('sovereign:default');

/* handle request */
$path = $modx->getOption('processorsPath',$modx->sovereign->config,$corePath.'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));
