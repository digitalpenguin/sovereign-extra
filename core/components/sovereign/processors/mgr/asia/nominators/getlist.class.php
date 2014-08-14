<?php
class AsianNominatorsGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'asianNominators';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';
}
return 'AsianNominatorsGetListProcessor';