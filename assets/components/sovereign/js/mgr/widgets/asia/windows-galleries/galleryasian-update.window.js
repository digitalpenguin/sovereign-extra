/**
 * Update gallery window for the gallery submissions grid.
 */
Sovereign.window.UpdateGalleryAsianSubmissions = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryasiansubmissions-update');
    if (check) check.destroy();

    this.fieldsetNameAndDesc = {
        xtype: 'container'
        ,layout:'form'
        ,flex: 1
        ,border: false
        ,labelWidth: 60
        ,width:300
        ,defaultType: 'field'
        ,defaults: {
            anchor: '-10'
            ,allowBlank: false
            ,listeners: {
                afterrender: function(cmp) {
                    cmp.getEl().set({
                        "autocomplete": 'off'
                    });
                }
            }
        }
        ,items: [{
            fieldLabel: 'Gallery Name'
            ,name: 'galleryname'
        },{
            xtype: 'textarea'
            ,allowBlank: true
            ,fieldLabel: 'Description / Notes'
            ,style: 'height:90px;'
            ,name: 'description'
        }]
    };
    this.fieldsetType = {
        xtype: 'container'
        ,layout:'form'
        ,flex:1
        ,defaultType: 'radio'
        ,items: [{
            fieldLabel: 'Type of Gallery',
            style: 'margin:14px 0 0 10px;',
            boxLabel: 'Asian Art Prize',
            name: 'type',
            inputValue: 0
        },{
            fieldLabel: '',
            style: 'margin:0 0 0 10px;',
            boxLabel: 'Hong Kong School Prize',
            name: 'type',
            inputValue: 1
        },{
            fieldLabel: '',
            style: 'margin:0 0 0 10px;',
            boxLabel: 'South East Asian Art Prize',
            name: 'type',
            inputValue: 2
        }]
    };
    this.typeAndImageContainer = {
        xtype:'container'
        ,layout: 'vbox'
        ,width:250
        ,layoutConfig:{
            align:'stretch'
        }
        ,items: [
            this.fieldsetType
        ]
    };
    this.mainFieldSetContainer = {
        xtype: 'container'
        ,layout: 'hbox'
        ,height: 200
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.fieldsetNameAndDesc
            ,this.typeAndImageContainer
        ]
    };

    this.ident = config.ident || 'sovcrgal'+Ext.id();
    this.parent = Sovereign.config.asianGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/asia/galleries/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.UpdateGalleryAsianSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAsianSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryasiansubmissions-update',Sovereign.window.UpdateGalleryAsianSubmissions);


/**
 * Update gallery window for the gallery judges grid.
 */
Sovereign.window.UpdateGalleryAsianJudges = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryasianjudges-update');
    if (check) check.destroy();

    this.ident = config.ident || 'sovupgalj'+Ext.id();
    this.parent = Sovereign.config.asianGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/asia/galleries/update'
        }

    });
    Sovereign.window.UpdateGalleryAsianJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAsianJudges,Sovereign.window.UpdateGalleryAsianSubmissions);
Ext.reg('sovereign-window-galleryasianjudges-update',Sovereign.window.UpdateGalleryAsianJudges);


/**
 * Update gallery window for the gallery public grid.
 */
Sovereign.window.UpdateGalleryAsianPublic = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryasianpublic-update');
    if (check) check.destroy();

    this.ident = config.ident || 'sovcrgal'+Ext.id();
    this.parent = Sovereign.config.asianGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/asia/galleries/update'
        }
    });
    Sovereign.window.UpdateGalleryAsianPublic.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAsianPublic,Sovereign.window.UpdateGalleryAsianSubmissions);
Ext.reg('sovereign-window-galleryasianpublic-update',Sovereign.window.UpdateGalleryAsianPublic);