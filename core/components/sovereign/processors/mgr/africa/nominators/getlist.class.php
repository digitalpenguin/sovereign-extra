<?php
class AfricanNominatorsGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'africanNominators';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';
}
return 'AfricanNominatorsGetListProcessor';