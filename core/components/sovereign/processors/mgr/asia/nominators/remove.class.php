<?php
class AsianNominatorRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'asianNominators';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    /** @var modMediaSource|modFileMediaSource $source */
    public $source;

    public function process() {
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of dir : ' . $this->getProperty('dir'));

        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('remove')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        $success = $this->source->removeContainer($this->getProperty('dir'));
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of dir : ' . $this->getProperty('dir'));

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }
        return parent::process();
    }

    /**
     * Get the active Source
     * @return modMediaSource|boolean
     */
    public function getSource() {
        $this->modx->loadClass('sources.modMediaSource');
        $this->source = modMediaSource::getDefaultSource($this->modx,$this->getProperty('source'));
        if (empty($this->source) || !$this->source->getWorkingContext()) {
            return false;
        }
        return $this->source;
    }

}
return 'AsianNominatorRemoveProcessor';