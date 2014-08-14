<?php
class Sovereign {
    public $modx;
    public $config = array();
    function __construct(modX &$modx,array $config = array()) {
        $this->modx =& $modx;

        $modxBasePath = MODX_BASE_PATH;
        $basePath = $this->modx->getOption('sovereign.core_path',$config,$this->modx->getOption('core_path').'components/sovereign/');
        $assetsUrl = $this->modx->getOption('sovereign.assets_url',$config,$this->modx->getOption('assets_url').'components/sovereign/');
        $csvUrl = $this->modx->getOption('sovereign.csv_upload_url',MODX_ASSETS_PATH.'components/sovereign/temp/');
        $africanGalleryUrl = $this->modx->getOption('sovereign.african_gallery_url',$config,MODX_ASSETS_PATH.'components/sovereign/galleries/african/');
        $asianGalleryUrl = $this->modx->getOption('sovereign.asian_gallery_url',$config,$this->modx->getOption('assets_url').'components/sovereign/galleries/asian/');
        $europeanGalleryUrl = $this->modx->getOption('sovereign.european_gallery_url',$config,$this->modx->getOption('assets_url').'components/sovereign/galleries/european/');
        $mideasternGalleryUrl = $this->modx->getOption('sovereign.mideastern_gallery_url',$config,$this->modx->getOption('assets_url').'components/sovereign/galleries/mideastern/');
        $this->config = array_merge(array(
            'modxBasePath' => $modxBasePath,
            'basePath' => $basePath,
            'corePath' => $basePath,
            'modelPath' => $basePath.'model/',
            'processorsPath' => $basePath.'processors/',
            'templatesPath' => $basePath.'templates/',
            'chunksPath' => $basePath.'elements/chunks/',
            'jsUrl' => $assetsUrl.'js/',
            'cssUrl' => $assetsUrl.'css/',
            'assetsUrl' => $assetsUrl,
            'connectorUrl' => $assetsUrl.'connector.php',
            'africanGalleryUrl' => $africanGalleryUrl,
            'asianGalleryUrl' => $asianGalleryUrl,
            'europeanGalleryUrl' => $europeanGalleryUrl,
            'mideasternGalleryUrl' => $mideasternGalleryUrl,
            'csvUrl' => $csvUrl,
        ),$config);
        $this->modx->addPackage('sovereign',$this->config['modelPath']);
    }
    
    // Retrieves a chunk
    public function getChunk($name,$properties = array()) {
        $chunk = null;
        if (!isset($this->chunks[$name])) {
            $chunk = $this->_getTplChunk($name);
            if (empty($chunk)) {
                $chunk = $this->modx->getObject('modChunk',array('name' => $name));
                if ($chunk == false) return false;
            }
            $this->chunks[$name] = $chunk->getContent();
        } else {
            $o = $this->chunks[$name];
            $chunk = $this->modx->newObject('modChunk');
            $chunk->setContent($o);
        }
        $chunk->setCacheable(false);
        return $chunk->process($properties);
    }
    
    // Retrieves a template
    private function _getTplChunk($name,$postfix = '.chunk.tpl') {
        $chunk = false;
        $f = $this->config['chunksPath'].strtolower($name).$postfix;
        if (file_exists($f)) {
            $o = file_get_contents($f);
            $chunk = $this->modx->newObject('modChunk');
            $chunk->set('name',$name);
            $chunk->setContent($o);
        }
        return $chunk;
    }
    
}
