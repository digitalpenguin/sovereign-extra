<?php
$xpdo_meta_map['mideasternJudges']= array (
  'package' => 'sovereign',
  'version' => '1.1',
  'table' => 'sovereign_mideastern_judges',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'gallery_id' => 0,
    'fullname' => '',
    'email' => '',
    'country' => '',
    'position' => '',
    'organisation' => '',
    'biography' => NULL,
    'filename' => '',
  ),
  'fieldMeta' => 
  array (
    'gallery_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'attributes' => 'unsigned',
      'null' => false,
      'default' => 0,
    ),
    'fullname' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'email' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'country' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'position' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'organisation' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'biography' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
    ),
    'filename' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
  ),
  'aggregates' => 
  array (
    'MideasternGallery' => 
    array (
      'class' => 'mideasternGalleries',
      'local' => 'gallery_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
