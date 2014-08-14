<?php
require_once dirname(__FILE__).'/build.config.php';
include_once MODX_CORE_PATH . 'model/modx/modx.class.php';
$modx= new modX();
$modx->initialize('mgr');
$modx->loadClass('transport.modPackageBuilder','',false, true);
$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');
$sources = array(
    'model' => $modx->getOption('sovereign.core_path').'model/',
    'schema_file' => $modx->getOption('sovereign.core_path').'model/schema/sovereign.mysql.schema.xml'
);
$manager= $modx->getManager();
$generator= $manager->getGenerator();

if (!is_dir($sources['model'])) { $modx->log(modX::LOG_LEVEL_ERROR,'Model directory not found!'); die(); }
if (!file_exists($sources['schema_file'])) { $modx->log(modX::LOG_LEVEL_ERROR,'Schema file not found!'); die(); }
$generator->parseSchema($sources['schema_file'],$sources['model']);
$modx->addPackage('sovereign', $sources['model']); // add package to make all models available
$manager->createObjectContainer('africanGalleries'); // create the database tables
$manager->createObjectContainer('africanArtworks');
$manager->createObjectContainer('africanJudges');
$manager->createObjectContainer('africanVotes');
$manager->createObjectContainer('africanNominators');

$manager->createObjectContainer('asianGalleries'); // create the database tables
$manager->createObjectContainer('asianArtworks');
$manager->createObjectContainer('asianJudges');
$manager->createObjectContainer('asianVotes');
$manager->createObjectContainer('asianNominators');

$manager->createObjectContainer('europeanGalleries'); // create the database tables
$manager->createObjectContainer('europeanArtworks');
$manager->createObjectContainer('europeanJudges');
$manager->createObjectContainer('europeanVotes');
$manager->createObjectContainer('europeanNominators');

$manager->createObjectContainer('mideasternGalleries'); // create the database tables
$manager->createObjectContainer('mideasternArtworks');
$manager->createObjectContainer('mideasternJudges');
$manager->createObjectContainer('mideasternVotes');
$manager->createObjectContainer('mideasternNominators');

$manager->createObjectContainer('newsletterSubscriptions');
$modx->log(modX::LOG_LEVEL_INFO, 'Done!');
