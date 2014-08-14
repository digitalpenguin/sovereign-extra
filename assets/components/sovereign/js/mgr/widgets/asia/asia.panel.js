Sovereign.panel.AsianPanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,id: 'sovereign-panel-asia'
        ,baseCls: 'modx-formpanel'
        ,cls: 'form' // changing this to container affects the margins
        ,items: [{
            xtype: 'modx-vtabs'
            ,activeTab: 0
            ,autoWidth: true
            ,resizable: true
            ,monitorResize:true
            ,deferredRender: false
            ,bodyStyle: 'padding: 0 10px 10px 10px; min-height:700px;'
            ,id: 'asianTabs'
            ,enableTabScroll : true
            ,defaults: {
                bodyCssClass: 'vertical-tabs tabs-sovereign'
                ,autoScroll: false
                ,autoHeight: true
                ,layout: 'form'
            }
            ,items: [{
                title: _('sovereign.submissionsgallery_label')
                ,id: 'asian-panel-submissions'
                ,defaults: { autoHeight: true, autoWidth: true }
                ,items: [{
                    html: '<img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/mailbox.png"><h3>'+_('sovereign.tab_heading_asian_submissions')+'</h3><p>'+ _('sovereign.submissions_galleries_desc') +'</p>'
                    ,id: 'sovereign-galleryasian-submissions-header'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,style: 'margin: 10px 0px 10px 0px'
                },{
                    xtype: 'sovereign-grid-galleryasiansubmissions'
                    ,preventRender: true
                }]
                ,listeners: {
                    'activate': function() {
                        var artworkGrid;
                        // check if the artwork grid exists and refresh appropriate grid
                        if (artworkGrid = Ext.getCmp('sovereign-grid-asianartworksubmissions')) {
                            artworkGrid.refresh();
                        } else {
                            Ext.getCmp('sovereign-grid-galleryasiansubmissions').refresh();
                        }
                    }
                }
            },{
                title: _('sovereign.judgesgallery_label')
                ,defaults: { autoHeight: true }
                ,id: 'asian-panel-judges'
                ,items: [{
                    html: '<img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/gavel.png"><h3>'+_('sovereign.tab_heading_asian_judges')+'</h3><p>'+ _('sovereign.judges_galleries_desc') +'</p>'
                    ,id: 'sovereign-galleryasian-judges-header'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                },{
                    xtype: 'sovereign-grid-galleryasianjudges'
                    ,preventRender: true
                }]
                ,listeners: {
                    'activate': function() {
                        var artworkGrid;
                        // check if the artwork grid exists and refresh appropriate grid
                        if (artworkGrid = Ext.getCmp('sovereign-grid-asianartworkjudges')) {
                            artworkGrid.refresh();
                        } else {
                            Ext.getCmp('sovereign-grid-galleryasianjudges').refresh();
                        }
                    }
                }
            },{
                title: _('sovereign.publicgallery_label')
                ,defaults: { autoHeight: true }
                ,id: 'asian-panel-public'
                ,items: [{
                    html: '<img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/world.png"><h3>'+_('sovereign.tab_heading_asian_public')+'</h3><p>'+ _('sovereign.public_galleries_desc') +'</p>'
                    ,id: 'sovereign-galleryasian-public-header'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                },{
                 xtype: 'sovereign-grid-galleryasianpublic'
                 ,preventRender: true

                 }]
                 ,listeners: {
                     'activate': function() {
                         var artworkGrid;
                         // check if the artwork grid exists and refresh appropriate grid
                         if (artworkGrid = Ext.getCmp('sovereign-grid-asianartworkpublic')) {
                           artworkGrid.refresh();
                         } else {
                           Ext.getCmp('sovereign-grid-galleryasianpublic').refresh();
                         }
                     }
                 }
            },{
                title: _('sovereign.asian_nominators_label')
                ,defaults: {autoHeight:true}
                ,id: 'asian-panel-nominators'
                ,items: [{
                    html: '<h3>'+_('sovereign.tab_heading_asian_nominators')+'</h3><p>'+ _('sovereign.nominators_desc') +'</p>'
                    ,id: 'sovereign-asian-nominators-header'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                },{
                    xtype: 'sovereign-grid-asian-nominators'
                    ,preventRender: true

                }]
            }]
        }]
    });
    Sovereign.panel.AsianPanel.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.AsianPanel,MODx.Panel,{
    replaceSubmissionsGrid: function(grid, row, galleryId) {
        if (!Ext.getCmp('sovereign-grid-asianartworksubmissions')) { // stop double clicks
            this.config.currentSubmissionsGallery = galleryId;
            var asianTabs = Ext.getCmp('asianTabs');
            var activeMainAsianTab = asianTabs.getActiveTab();
            var submissionsGrid = Ext.getCmp('sovereign-grid-galleryasiansubmissions');
            var submissionsGridHeader = Ext.getCmp('sovereign-galleryasian-submissions-header');
            submissionsGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration:.3,
                remove: true,
                useDisplay: true
            });


            var artworkGrid = new Sovereign.grid.AsianArtworkSubmissions;
            artworkGrid.passGalleryId(galleryId); // pass id of selected gallery
            var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
                submissionsGridHeader.update('<img style="float:right;" src="'+Sovereign.config.cssUrl + '/img/mailbox.png">' +
                    '<img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/painting-icon.png">' +
                    '<h3>'+ row.get('galleryname')+' - Pending Artworks</h3>' +
                    '<p>'+ _('sovereign.submissions_artworks_desc') +'</p>');
                activeMainAsianTab.add(artworkGrid);
                activeMainAsianTab.doLayout();
                artworkGrid.getEl().slideIn('r', {
                    easing: 'easeIn',
                    duration:.3,
                    useDisplay: false
                });
            });
            slideGridIn.delay(350); // keep delay slightly longer than effect
        } else {
            //do nothing here (to stop more than one grid loading)
        }
    },backToSubmissionsGrid: function() {
        var tabs = Ext.getCmp('asianTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-asianartworksubmissions');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var submissionsGrid = Ext.getCmp('sovereign-grid-galleryasiansubmissions');
        var submissionsGridHeader = Ext.getCmp('sovereign-galleryasian-submissions-header');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            submissionsGridHeader.update('<img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/mailbox.png"><h3>'+_('sovereign.tab_heading_asian_submissions')+'</h3><p>'+ _('sovereign.submissions_galleries_desc') +'</p>'
            );
            tab.remove(artworkGrid);
            tab.add(submissionsGrid);
            tab.doLayout();
            submissionsGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                scope: this
            });
            artworkGrid.destroy();
            submissionsGrid.refresh();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect
    },replaceJudgesGrid: function(grid, row, galleryId) {
        if (!Ext.getCmp('sovereign-grid-asianartworkjudges')) { // stop double clicks
            this.config.currentJudgesGallery = galleryId;
            var asianTabs = Ext.getCmp('asianTabs');
            var activeMainAsianTab = asianTabs.getActiveTab();
            var judgesGrid = Ext.getCmp('sovereign-grid-galleryasianjudges');
            var judgesGridHeader = Ext.getCmp('sovereign-galleryasian-judges-header');
            judgesGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration:.3,
                remove: true,
                useDisplay: true
            });


            var artworkGrid = new Sovereign.grid.AsianArtworkJudges;
            artworkGrid.passGalleryId(galleryId); // pass id of selected gallery
            var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
                judgesGridHeader.update('<img style="float:right;" src="'+Sovereign.config.cssUrl + '/img/gavel.png"><img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/painting-icon.png"><h3>'+ row.get('galleryname')+' - Judges\' Gallery Artworks</h3><p>'+ _('sovereign.judges_artworks_desc') +'</p>');
                activeMainAsianTab.add(artworkGrid);
                activeMainAsianTab.doLayout();
                artworkGrid.getEl().slideIn('r', {
                 easing: 'easeIn',
                 duration:.3,
                 useDisplay: false
                 });
            });
            slideGridIn.delay(350); // keep delay slightly longer than effect
        } else {
            //do nothing here (to stop more than one grid loading)
        }
    },backToJudgesGrid: function() {
        var tabs = Ext.getCmp('asianTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-asianartworkjudges');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var judgesGrid = Ext.getCmp('sovereign-grid-galleryasianjudges');
        var judgesGridHeader = Ext.getCmp('sovereign-galleryasian-judges-header');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            judgesGridHeader.update('<img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/gavel.png"><h3>'+_('sovereign.tab_heading_asian_judges')+'</h3><p>'+ _('sovereign.judges_galleries_desc') +'</p>');
            tab.remove(artworkGrid);
            tab.add(judgesGrid);
            tab.doLayout();
            judgesGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                scope: this
            });
            artworkGrid.destroy();
            judgesGrid.refresh();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect

    },replacePublicGrid: function(grid, row, galleryId) {
        if (!Ext.getCmp('sovereign-grid-asianartworkpublic')) { // stop double clicks
            this.config.currentPublicGallery = galleryId;
            var asianTabs = Ext.getCmp('asianTabs');
            var activeMainAsianTab = asianTabs.getActiveTab();
            var publicGrid = Ext.getCmp('sovereign-grid-galleryasianpublic');
            var publicGridHeader = Ext.getCmp('sovereign-galleryasian-public-header');
            publicGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration:.3,
                remove: true,
                useDisplay: true
            });


            var artworkGrid = new Sovereign.grid.AsianArtworkPublic;
            artworkGrid.passGalleryId(galleryId); // pass id of selected gallery
            var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
                publicGridHeader.update('<img style="float:right;" src="'+Sovereign.config.cssUrl + '/img/world.png"><img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/painting-icon.png"><h3>'+ row.get('galleryname')+' - Public Live Artworks</h3><p>'+ _('sovereign.submissions_artworks_desc') +'</p>');
                activeMainAsianTab.add(artworkGrid);
                activeMainAsianTab.doLayout();
                artworkGrid.getEl().slideIn('r', {
                    easing: 'easeIn',
                    duration:.3,
                    useDisplay: false
                });
            });
            slideGridIn.delay(350); // keep delay slightly longer than effect
        } else {
            //do nothing here (to stop more than one grid loading)
        }
    },backToPublicGrid: function() {
        var tabs = Ext.getCmp('asianTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-asianartworkpublic');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var publicGrid = Ext.getCmp('sovereign-grid-galleryasianpublic');
        var publicGridHeader = Ext.getCmp('sovereign-galleryasian-public-header');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            publicGridHeader.update('<img style="float:left; margin-right:20px;" src="'+Sovereign.config.cssUrl + '/img/world.png"><h3>'+_('sovereign.tab_heading_asian_public')+'</h3><p>'+ _('sovereign.public_galleries_desc') +'</p>');
            tab.remove(artworkGrid);
            tab.add(publicGrid);
            tab.doLayout();
            publicGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                scope: this
            });
            artworkGrid.destroy();
            publicGrid.refresh();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect

    }
});
Ext.reg('sovereign-panel-asia',Sovereign.panel.AsianPanel);