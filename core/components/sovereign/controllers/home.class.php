<?php
class SovereignHomeManagerController extends SovereignManagerController {
    public function process(array $scriptProperties = array()) {
 
    }
    public function getPageTitle() { return $this->modx->lexicon('sovereign'); }
    public function loadCustomCssJs() {
        // African Windows
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/windows-artworks/african-artworks-create.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/windows-artworks/african-artworks-update.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/windows-galleries/galleryafrican-create.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/windows-galleries/galleryafrican-update.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/windows-galleries/galleryafrican-uploadcoverimage.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/windows-judges/african-judges-create.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/windows-nominators/african-nominators-create-update.window.js');
        // African Artwork Grids
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-artworks/african-artwork-submissions.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-artworks/african-artwork-judges.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-artworks/african-artwork-public.grid.js');
        // African Judges Grids
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-judges/african-judges-assigned.grid.js');
        // African Galleries Grids
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-galleries/galleryafrican-submissions.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-galleries/galleryafrican-judges.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-galleries/galleryafrican-public.grid.js');
        // African Nominators Grid
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/grids-nominators/african-nominators.grid.js');



        // Asian Windows
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/windows-artworks/asian-artworks-create.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/windows-artworks/asian-artworks-update.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/windows-galleries/galleryasian-create.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/windows-galleries/galleryasian-update.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/windows-galleries/galleryasian-uploadcoverimage.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/windows-judges/asian-judges-create.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/windows-nominators/asian-nominators-create-update.window.js');
        // Asian Artwork Grids
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-artworks/asian-artwork-submissions.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-artworks/asian-artwork-judges.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-artworks/asian-artwork-public.grid.js');
        // Asian Judges Grids
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-judges/asian-judges-assigned.grid.js');
        // Asian Galleries Grids
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-galleries/galleryasian-submissions.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-galleries/galleryasian-judges.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-galleries/galleryasian-public.grid.js');
        // Asian Nominators Grid
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/grids-nominators/asian-nominators.grid.js');

        
        
        













/*

        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/galleryasian-submissions.grid.js');
        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/galleryasian-judges.grid.js');
        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/mideast/gallerymideast-submissions.grid.js');
        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/europe/galleryeuropean-submissions.grid.js');
*/
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/africa.panel.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/asia.panel.js');
        //$this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/mideast/mideast.panel.js');
        //$this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/europe/europe.panel.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/home.panel.js');
        $this->addLastJavascript($this->sovereign->config['jsUrl'].'mgr/sections/index.js');
    }
    public function getTemplateFile() { return $this->sovereign->config['templatesPath'].'home.tpl'; }
}
