Sovereign.window.CreateAsianJudge = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-asianjudges-create');
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
            ,name: 'address' // rather than create extra fields in the db, uses unneeded fields already present.
            ,allowBlank: false
        },{
            fieldLabel: 'Organisation'
            ,name: 'city' // here too
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
            fieldLabel: 'Password'
            ,name: 'password'
            ,allowBlank: false
        },{
            xtype: 'field'
            ,inputType: 'file'
            ,fieldLabel: 'Select Judge\'s Portrait'
            ,name: 'website'
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
            ,name: 'comment'
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
        title: _('sovereign.judge_create')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,resizable: false
        ,width:630
        ,baseParams: {
            action: 'mgr/asia/judges/create'
            ,parent: this.parent
            ,galleryphase: 2
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainContainer]
    });
    Sovereign.window.CreateAsianJudge.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAsianJudge,MODx.Window);
Ext.reg('sovereign-window-asianjudges-create',Sovereign.window.CreateAsianJudge);


Sovereign.window.UpdateAsianJudge = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-asianjudges-update');
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
            ,name: 'address' // rather than create extra fields in the db, uses unneeded fields already present.
            ,allowBlank: false
        },{
            fieldLabel: 'Organisation'
            ,name: 'city' // here too
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
            fieldLabel: 'Password'
            ,name: 'password'
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
            ,name: 'comment'
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
        title: _('sovereign.judge_update')
        ,url: Sovereign.config.connectorUrl
        ,fileUpload: true
        ,modal: true
        ,resizable: false
        ,width:630
        ,baseParams: {
            action: 'mgr/asia/judges/update'
            ,parent: this.parent
            ,galleryphase: 2
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },this.mainContainer]
    });
    Sovereign.window.UpdateAsianJudge.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateAsianJudge,MODx.Window);
Ext.reg('sovereign-window-asianjudges-update',Sovereign.window.UpdateAsianJudge);