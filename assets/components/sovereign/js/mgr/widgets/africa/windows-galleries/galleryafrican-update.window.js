/**
 * Update gallery window for the gallery submissions grid.
 */
Sovereign.window.UpdateGalleryAfricanSubmissions = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricansubmissions-update');
    if (check) check.destroy();

    this.fieldsetNameAndDesc = {
        xtype: 'fieldset'
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
        xtype: 'fieldset'
        ,flex:1
        ,defaultType: 'radio'
        ,items: [{
            fieldLabel: 'Type of Gallery',
            style: 'margin:14px 0 0 10px;',
            boxLabel: 'African Art Prize',
            name: 'type',
            inputValue: 0
        },{
            fieldLabel: '',
            style: 'margin:0 0 0 10px;',
            boxLabel: 'African School Prize',
            name: 'type',
            inputValue: 1
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
    this.parent = Sovereign.config.africanGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/africa/galleries/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.UpdateGalleryAfricanSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAfricanSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryafricansubmissions-update',Sovereign.window.UpdateGalleryAfricanSubmissions);


/**
 * Update gallery window for the gallery judges grid.
 */
Sovereign.window.UpdateGalleryAfricanJudges = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricanjudges-update');
    if (check) check.destroy();

    this.fieldsetNameAndDesc = {
        xtype: 'fieldset'
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
        xtype: 'fieldset'
        ,flex:1
        ,defaultType: 'radio'
        ,items: [{
            fieldLabel: 'Type of Gallery',
            style: 'margin:14px 0 0 10px;',
            boxLabel: 'African Art Prize',
            name: 'type',
            inputValue: 0
        },{
            fieldLabel: '',
            style: 'margin:0 0 0 10px;',
            boxLabel: 'African School Prize',
            name: 'type',
            inputValue: 1
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
    this.parent = Sovereign.config.africanGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/africa/galleries/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.UpdateGalleryAfricanJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAfricanJudges,MODx.Window);
Ext.reg('sovereign-window-galleryafricanjudges-update',Sovereign.window.UpdateGalleryAfricanJudges);


/**
 * Update gallery window for the gallery submissions grid.
 */
Sovereign.window.UpdateGalleryAfricanPublic = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricanpublic-update');
    if (check) check.destroy();

    this.fieldsetNameAndDesc = {
        xtype: 'fieldset'
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
        xtype: 'fieldset'
        ,flex:1
        ,defaultType: 'radio'
        ,items: [{
            fieldLabel: 'Type of Gallery',
            style: 'margin:14px 0 0 10px;',
            boxLabel: 'African Art Prize',
            name: 'type',
            inputValue: 0
        },{
            fieldLabel: '',
            style: 'margin:0 0 0 10px;',
            boxLabel: 'African School Prize',
            name: 'type',
            inputValue: 1
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
    this.parent = Sovereign.config.africanGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/africa/galleries/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.UpdateGalleryAfricanPublic.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAfricanPublic,MODx.Window);
Ext.reg('sovereign-window-galleryafricanpublic-update',Sovereign.window.UpdateGalleryAfricanPublic);