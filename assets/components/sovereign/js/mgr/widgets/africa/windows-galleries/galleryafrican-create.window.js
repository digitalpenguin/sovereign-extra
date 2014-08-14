/**
 * Create gallery window for the gallery submissions grid.
 */
Sovereign.window.CreateGalleryAfricanSubmissions = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricansubmissions-create');
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
            checked: true,
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
    this.fieldsetImage = {
        xtype: 'fieldset'
        ,flex:1
        ,items: [{
            xtype: 'field'
            ,inputType: 'file'
            ,fieldLabel: 'Select a Cover Image'
            ,name: 'filename'
            ,style: 'margin:16px 0 0 10px; width:200px;'
            ,allowBlank: true
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
            ,this.fieldsetImage
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
    this.parent = Sovereign.config.africanGalleryUrl;//'assets/components/sovereign/galleries/african/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/africa/galleries/create'
            ,parent: this.parent
            ,galleryphase: 0
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.CreateGalleryAfricanSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAfricanSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryafricansubmissions-create',Sovereign.window.CreateGalleryAfricanSubmissions);




/**
 * Create gallery window for the gallery judges grid.
 */
Sovereign.window.CreateGalleryAfricanJudges = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricanjudges-create');
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
            checked: true,
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
    this.fieldsetImage = {
        xtype: 'fieldset'
        ,flex:1
        ,items: [{
            xtype: 'field'
            ,inputType: 'file'
            ,fieldLabel: 'Select a Cover Image'
            ,name: 'filename'
            ,style: 'margin:16px 0 0 10px; width:200px;'
            ,allowBlank: true
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
            ,this.fieldsetImage
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
    this.parent = Sovereign.config.africanGalleryUrl;//'assets/components/sovereign/galleries/african/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/africa/galleries/create'
            ,parent: this.parent
            ,galleryphase: 1
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.CreateGalleryAfricanJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAfricanJudges,MODx.Window);
Ext.reg('sovereign-window-galleryafricanjudges-create',Sovereign.window.CreateGalleryAfricanJudges);




/**
 * Create gallery window for the gallery public grid.
 */
Sovereign.window.CreateGalleryAfricanPublic = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricanpublic-create');
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
            checked: true,
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
    this.fieldsetImage = {
        xtype: 'fieldset'
        ,flex:1
        ,items: [{
            xtype: 'field'
            ,inputType: 'file'
            ,fieldLabel: 'Select a Cover Image'
            ,name: 'filename'
            ,style: 'margin:16px 0 0 10px; width:200px;'
            ,allowBlank: true
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
            ,this.fieldsetImage
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
    this.parent = Sovereign.config.africanGalleryUrl;//'assets/components/sovereign/galleries/african/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/africa/galleries/create'
            ,parent: this.parent
            ,galleryphase: 2
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.CreateGalleryAfricanPublic.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAfricanPublic,MODx.Window);
Ext.reg('sovereign-window-galleryafricanpublic-create',Sovereign.window.CreateGalleryAfricanPublic);