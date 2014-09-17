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
            anchor: '-30'
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
            ,height:120
            ,name: 'description'
        }]
    };
    this.fieldsetType = {
        xtype: 'container'
        ,layout: 'form'
        ,flex:1
        ,defaultType: 'radio'
        ,items: [{
            checked: true,
            fieldLabel: 'Type of Gallery',
            boxLabel: 'Asian Art Prize',
            name: 'type',
            inputValue: 0
        },{
            boxLabel: 'Hong Kong School Prize',
            name: 'type',
            inputValue: 1
        },{
            boxLabel: 'South East Asian Art Prize'
            ,name: 'type'
            ,inputValue:2
        }]
    };
    this.fieldsetImage = {
        xtype: 'container'
        ,layout: 'form'
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
        ,height: 220
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.fieldsetNameAndDesc
            ,this.typeAndImageContainer
        ]
    };

    this.ident = config.ident || 'sovcrgals'+Ext.id();
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

    this.ident = config.ident || 'sovcrgalj'+Ext.id();
    this.parent = Sovereign.config.asianGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,width:580
        ,height:'auto'
        ,baseParams: {
            action: 'mgr/asia/galleries/create'
            ,parent: this.parent
            ,galleryphase: 1
        }
    });
    Sovereign.window.CreateGalleryAsianJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAsianJudges,Sovereign.window.CreateGalleryAsianSubmissions);
Ext.reg('sovereign-window-galleryasianjudges-create',Sovereign.window.CreateGalleryAsianJudges);




/**
 * Create gallery window for the gallery public grid.
 */
Sovereign.window.CreateGalleryAsianPublic = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryasianpublic-create');
    if (check) check.destroy();

    this.ident = config.ident || 'sovcrgalp'+Ext.id();
    this.parent = Sovereign.config.asianGalleryUrl;
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
    });
    Sovereign.window.CreateGalleryAsianPublic.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAsianPublic,Sovereign.window.CreateGalleryAsianSubmissions);
Ext.reg('sovereign-window-galleryasianpublic-create',Sovereign.window.CreateGalleryAsianPublic);