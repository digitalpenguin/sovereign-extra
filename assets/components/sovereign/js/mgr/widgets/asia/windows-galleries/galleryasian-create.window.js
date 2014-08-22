/**
 * Create gallery window for the gallery submissions grid.
 */
Sovereign.window.CreateGalleryAsianSubmissions = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryasiansubmissions-create');
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
            ,height:100
            ,name: 'description'
        }]
    };
    this.fieldsetType = {
        xtype: 'fieldset'
        ,flex:1
        ,style:'margin-top:-70px;'
        ,defaultType: 'radio'
        ,items: [{
            checked: true,
            fieldLabel: 'Type of Gallery',
            boxLabel: 'Asian Art Prize',
            name: 'type',
            inputValue: 0
        },{
            boxLabel: 'Asian School Prize',
            name: 'type',
            inputValue: 1
        },{
            boxLabel: 'South East Asian Art Prize'
            ,name: 'type'
            ,inputValue:2
        }]
    };
    this.fieldsetImage = {
        xtype: 'fieldset'
        ,flex:1
        ,border:false
        ,height:70
        ,items: [{
            xtype: 'field'
            ,inputType: 'file'
            ,fieldLabel: 'Select a Cover Image'
            ,name: 'filename'
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
            this.fieldsetImage
            ,this.fieldsetType

        ]
    };
    this.mainFieldSetContainer = {
        xtype: 'container'
        ,layout: 'hbox'
        ,style:'padding:0 0 100px 0;'
        ,height: 500
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
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:600
        ,baseParams: {
            action: 'mgr/asia/galleries/create'
            ,parent: this.parent
            ,galleryphase: 0
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.CreateGalleryAsianSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAsianSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryasiansubmissions-create',Sovereign.window.CreateGalleryAsianSubmissions);




/**
 * Create gallery window for the gallery judges grid.
 */
Sovereign.window.CreateGalleryAsianJudges = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryasianjudges-create');
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
            boxLabel: 'Asian Art Prize',
            name: 'type',
            inputValue: 0
        },{
            fieldLabel: '',
            style: 'margin:0 0 0 10px;',
            boxLabel: 'Asian School Prize',
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
    this.parent = Sovereign.config.asianGalleryUrl;//'assets/components/sovereign/galleries/asian/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/asia/galleries/create'
            ,parent: this.parent
            ,galleryphase: 1
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.CreateGalleryAsianJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAsianJudges,MODx.Window);
Ext.reg('sovereign-window-galleryasianjudges-create',Sovereign.window.CreateGalleryAsianJudges);




/**
 * Create gallery window for the gallery public grid.
 */
Sovereign.window.CreateGalleryAsianPublic = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryasianpublic-create');
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
            boxLabel: 'Asian Art Prize',
            name: 'type',
            inputValue: 0
        },{
            fieldLabel: '',
            style: 'margin:0 0 0 10px;',
            boxLabel: 'Asian School Prize',
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
    this.parent = Sovereign.config.asianGalleryUrl;//'assets/components/sovereign/galleries/asian/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,baseParams: {
            action: 'mgr/asia/galleries/create'
            ,parent: this.parent
            ,galleryphase: 2
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainFieldSetContainer]
    });
    Sovereign.window.CreateGalleryAsianPublic.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAsianPublic,MODx.Window);
Ext.reg('sovereign-window-galleryasianpublic-create',Sovereign.window.CreateGalleryAsianPublic);