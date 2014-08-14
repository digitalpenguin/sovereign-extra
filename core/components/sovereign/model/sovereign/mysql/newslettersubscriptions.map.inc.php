<?php
$xpdo_meta_map['newsletterSubscriptions']= array (
  'package' => 'sovereign',
  'version' => '1.1',
  'table' => 'sovereign_newsletter_subscriptions',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'name' => NULL,
    'email_address' => NULL,
  ),
  'fieldMeta' => 
  array (
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
    ),
    'email_address' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
    ),
  ),
);
