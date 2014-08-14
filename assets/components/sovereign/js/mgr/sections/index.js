Ext.onReady(function() {
    MODx.load({ xtype: 'sovereign-page-home'});
});
 
Sovereign.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'sovereign-panel-home'
            ,renderTo: 'sovereign-panel-home-div'
        }]
    });
    Sovereign.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.page.Home,MODx.Component);
Ext.reg('sovereign-page-home',Sovereign.page.Home);
