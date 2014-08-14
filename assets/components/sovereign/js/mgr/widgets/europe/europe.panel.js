Sovereign.panel.EuropePanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,id: 'sovereign-panel-europe'
        ,cls: 'form'
        ,items: [{
            xtype: 'modx-vtabs'
            ,activeTab: 0
            ,autoWidth: true
            ,resizable: true
            ,monitorResize:true
            ,deferredRender: false
            ,bodyStyle: 'padding: 0 0 10px 10px; min-height:360px;'
            ,id: 'europeTabs'
            ,enableTabScroll : true
            ,defaults: {
                bodyCssClass: 'vertical-tabs tabs-sovereign'
                ,autoScroll: false
                ,autoHeight: true
                ,layout: 'form'
            }
            ,items: [{
                title: _('sovereign.submissionsgallery_label')
                ,id: 'europegalleries-home'
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<h3>'+_('sovereign.tab_heading_european_submissions')+'</h3><p>'+ _('sovereign.submissions_galleries_desc') +'</p>'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                },{
                    xtype: 'sovereign-grid-galleryeuropesubmissions'
                    ,preventRender: true
                }]
            },{
                title: _('sovereign.judgesgallery_label')
                ,defaults: { autoHeight: true }
                ,id: 'europegalleries-judges'
                ,items: [{
                    html: '<h3>'+_('sovereign.tab_heading_european_judges')+'</h3><p>'+ _('sovereign.judges_galleries_desc') +'</p>'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                },{
                    /*xtype: 'sovereign-grid-gallerymideastjudges'
                     ,preventRender: true*/
                }]
            },{
                title: _('sovereign.publicgallery_label')
                ,defaults: { autoHeight: true }
                ,id: 'europegalleries-public'
                ,items: [{
                    html: '<h3>'+_('sovereign.tab_heading_european_public')+'</h3><p>'+ _('sovereign.public_galleries_desc') +'</p>'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                }/*,{
                 xtype: 'sovereign-grid-judgesgallery_mideastern'
                 ,preventRender: true
                 }*/]
            }]
        }]
    });
    Sovereign.panel.EuropePanel.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.EuropePanel,MODx.Panel,{
    replaceSubmissionsGrid: function(grid, row, id) {
        var europeTabs = Ext.getCmp('EuropeTabs');
        var activeMainEuropeTab = mideastTabs.getActiveTab();
        var submissionsGrid = Ext.getCmp('sovereign-grid-galleryeuropesubmissions');
        submissionsGrid.getEl().ghost('l', {
            easing: 'easeOut',
            duration:.3,
            remove: false,
            useDisplay: true
        });

        var artworkGrid = new Sovereign.grid.EuropeArtworks;
        var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
            activeMainEuropeTab.add(artworkGrid);
            artworkGrid.filterByGalleryId(id);
            activeMainEuropeTab.doLayout();
            artworkGrid.getEl().slideIn('r', {
                easing: 'easeIn',
                duration:.3,
                useDisplay: true
            });
        });
        slideGridIn.delay(350); // keep delay slightly longer than effect

    },backToSubmissionsGrid: function() {
        var tabs = Ext.getCmp('mideastTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-europeartworks');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var submissionsGrid = Ext.getCmp('sovereign-grid-galleryeuropesubmissions');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            tab.add(submissionsGrid);
            submissionsGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                useDisplay: true
            });
            tab.doLayout();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect

    }
});
Ext.reg('sovereign-panel-europe',Sovereign.panel.EuropePanel);