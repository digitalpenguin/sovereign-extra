Sovereign.window.CreateAsianNominator = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-asiannominators-create');
    if (check) check.destroy();

    this.fieldSetPersonalDetails = {
        xtype: 'fieldset'
        ,flex: 1
        ,border: false
        ,labelWidth: 60
        ,width: 300
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
            fieldLabel: 'Full Name'
            ,name: 'fullname'
            ,allowBlank: false
        },{
            fieldLabel: 'Position'
            ,name: 'position' // rather than create extra fields in the db, uses unneeded fields already present.
            ,allowBlank: false
        },{
            fieldLabel: 'Organisation'
            ,name: 'organisation' // here too
            ,allowBlank: false
        }]
    };
    this.fieldsetImageAndAccount = Ext.apply({},{
        xtype: 'fieldset'
        ,flex:1
        ,width: 300
        ,defaultType: 'field'
        ,items: [{
            fieldLabel : 'Email'
            ,name: 'email'
            ,allowBlank: false
        },{
            xtype: 'field'
            ,inputType: 'file'
            ,fieldLabel: 'Select Nominator\'s Portrait'
            ,name: 'filename'
            ,style: 'width:220px; height:32px;'
            ,allowBlank: false
        }]
    }, this.fieldSetPersonalDetails);
    this.topFieldSetContainer = {
        xtype: 'container'
        ,layout: 'hbox'
        ,height: 200
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.fieldSetPersonalDetails
            ,this.fieldsetImageAndAccount
        ]
    };
    this.bottomFieldSet = {
        xtype: 'fieldset'
        ,flex:1

        ,items: [{
            xtype: 'textarea'
            ,fieldLabel: 'Biography'
            ,name: 'biography'
            ,height:160
            ,width: 576
            ,allowBlank: false
        }]
    };

    this.mainContainer = {
        xtype: 'container'
        ,layout: 'vbox'
        ,height: 400
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.topFieldSetContainer
            ,this.bottomFieldSet
        ]
    };

    this.ident = config.ident || 'sovcrgal'+Ext.id();
    this.parent = Sovereign.config.asianGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.nominator_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,resizable: false
        ,width:630
        ,baseParams: {
            action: 'mgr/asia/nominators/create'
            ,parent: this.parent
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainContainer]
    });
    Sovereign.window.CreateAsianNominator.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAsianNominator,MODx.Window);
Ext.reg('sovereign-window-asiannominators-create',Sovereign.window.CreateAsianNominator);


Sovereign.window.UpdateAsianNominator = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-asiannominators-update');
    if (check) check.destroy();

    this.fieldSetPersonalDetails = {
        xtype: 'fieldset'
        ,flex: 1
        ,border: false
        ,labelWidth: 60
        ,width: 300
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
            fieldLabel: 'Full Name'
            ,name: 'fullname'
            ,allowBlank: false
        },{
            fieldLabel: 'Position'
            ,name: 'position' // rather than create extra fields in the db, uses unneeded fields already present.
            ,allowBlank: false
        },{
            fieldLabel: 'Organisation'
            ,name: 'organisation' // here too
            ,allowBlank: false
        }]
    };
    this.fieldsetImageAndAccount = Ext.apply({},{
        xtype: 'fieldset'
        ,flex:1
        ,width: 300
        ,defaultType: 'field'
        ,items: [{
            fieldLabel : 'Email'
            ,name: 'email'
            ,allowBlank: false
        }]
    }, this.fieldSetPersonalDetails);
    this.topFieldSetContainer = {
        xtype: 'container'
        ,layout: 'hbox'
        ,height: 200
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.fieldSetPersonalDetails
            ,this.fieldsetImageAndAccount
        ]
    };
    this.bottomFieldSet = {
        xtype: 'fieldset'
        ,flex:1

        ,items: [{
            xtype: 'textarea'
            ,fieldLabel: 'Biography'
            ,name: 'biography'
            ,height:160
            ,width: 576
            ,allowBlank: false
        }]
    };

    this.mainContainer = {
        xtype: 'container'
        ,layout: 'vbox'
        ,height: 400
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.topFieldSetContainer
            ,this.bottomFieldSet
        ]
    };

    this.ident = config.ident || 'sovcrgal'+Ext.id();
    this.parent = Sovereign.config.asianGalleryUrl;
    Ext.applyIf(config,{
        title: _('sovereign.nominator_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,resizable: false
        ,width:630
        ,baseParams: {
            action: 'mgr/asia/nominators/update'
            ,parent: this.parent
            ,galleryphase: 2
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },this.mainContainer]
    });
    Sovereign.window.UpdateAsianNominator.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateAsianNominator,MODx.Window);
Ext.reg('sovereign-window-asiannominators-update',Sovereign.window.UpdateAsianNominator);

