<?php
require_once dirname(__FILE__) . '/model/sovereign/sovereign.class.php';
abstract class SovereignManagerController extends modExtraManagerController {
    /** @var Sovereign $sovereign */
    public $sovereign;
    public function initialize() {
        $this->sovereign = new Sovereign($this->modx);

        $this->addCss($this->sovereign->config['cssUrl'].'mgr.css');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/sovereign.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            Sovereign.config = '.$this->modx->toJSON($this->sovereign->config).';
        });
        </script>');
        return parent::initialize();
    }
    public function getLanguageTopics() {
        return array('sovereign:default');
    }
    public function checkPermissions() { return true;}
}

class IndexManagerController extends SovereignManagerController {
    public static function getDefaultController() { return 'home'; }
}
