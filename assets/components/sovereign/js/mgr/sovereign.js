var Sovereign = function(config) {
    config = config || {};
    Sovereign.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
});
Ext.reg('sovereign',Sovereign);
Sovereign = new Sovereign();
