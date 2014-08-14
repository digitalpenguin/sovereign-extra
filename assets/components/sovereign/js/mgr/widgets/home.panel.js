Sovereign.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,id: 'home-panel'
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('sovereign.management')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,id: 'main-tabs'
            ,border: true
            ,items: [{
                title: _('sovereign.tab_label_asian')
                ,tooltip: _('')
                ,defaults: { autoHeight: true }
                ,items: [{
                    xtype: 'sovereign-panel-asia'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                }]
            },{
                title: _('sovereign.tab_label_african')
                ,tooltip: _('')
                ,layout: 'form'
                ,items: [{
                    xtype: 'sovereign-panel-africa'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                }]
            }/*,{
                title: _('sovereign.tab_label_european')
                ,tooltip: _('')
                ,defaults: { autoHeight: true }
                ,items: [{
                 xtype: 'sovereign-panel-europe'
                 ,cls: 'main-wrapper'
                 ,preventRender: true
                 ,bodyStyle: 'padding: 0 10px 0 0'
                 }]
            },{
                title: _('sovereign.tab_label_mideastern')
                ,tooltip: _('')
                ,defaults: { autoHeight: true }
                ,items: [{
                    xtype: 'sovereign-panel-mideast'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                    ,bodyStyle: 'padding: 0 10px 0 0'
                }]
            }*/]
            // only to redo the grid layout after the content is rendered
            // to fix overflow components' panels, especially when scroll bar is shown up
            ,listeners: {
                'afterrender': function(tabPanel) {
                    tabPanel.doLayout();
                }
            }
        }]
    });
    Sovereign.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.Home,MODx.Panel);
Ext.reg('sovereign-panel-home',Sovereign.panel.Home);