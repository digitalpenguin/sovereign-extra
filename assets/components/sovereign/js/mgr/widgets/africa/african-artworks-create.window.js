Sovereign.window.CreateAfricanArtworks = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-africanartworks-create');
    //check ? check.destroy(): '';
    if (check) {
        check.destroy();
    }

    /**
     * NAME FIELDS
     */
    this.fieldSetName = {
        xtype: 'fieldset'
        ,title: 'Artist\'s Name'
        ,flex: 1
        ,border: false
        ,labelWidth: 60
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
            fieldLabel: 'Title'
            ,name: 'title'
        },{
            fieldLabel: 'First'
            ,name: 'first_name'
        },{
            fieldLabel: 'Last'
            ,name: 'surname'
        }]
    };


    /**
     * DOB AND IMAGE FIELDS
     */
    this.fieldSetDob = Ext.apply({}, {
        flex:1
        ,title: 'Date of Birth'
        ,items: [{
            xtype: 'datefield'
            ,fieldLabel: 'Date of Birth'
            ,name: 'dob'
            ,type: 'date'
            ,format: MODx.config.manager_date_format
            ,allowBlank: true
        }]
    }, this.fieldSetName);
    this.fieldSetImage = Ext.apply({}, {
        flex:1
        ,title: 'Image'
        ,items: [{
            inputType: 'file'
            ,fieldLabel: 'Select a File to Upload'
            ,name: 'filename'
            ,allowBlank: false
        }]
    }, this.fieldSetName);
    this.dobAndImageContainer = {
        xtype:'container'
        ,layout: 'vbox'
        ,width:300
        ,layoutConfig:{
            align:'stretch'
        }
        ,items: [
            this.fieldSetDob
            ,this.fieldSetImage
        ]
    };


    /**
     * TOP FIELDS
     */
    this.topFieldSetContainer = {
        xtype: 'container'
        ,layout: 'hbox'
        ,height: 200
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.fieldSetName
            ,this.dobAndImageContainer
        ]
    };


    /**
     * ADDRESS TAB
     */
    this.addressFieldSetLeft = Ext.apply({}, {
        flex:1
        ,border:0
        ,title: ''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'Address Line 1'
            ,name:'address_1'
        },{
            fieldLabel: 'Address Line 2'
            ,name: 'address_2'
        },{
            fieldLabel: 'Address Line 3'
            ,name: 'address_3'
        }]
    }, this.fieldSetName);
    this.addressFieldSetRight = Ext.apply({}, {
        flex:1
        ,border:0
        ,title:''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'City'
            ,name: 'city'
        },{
            xtype: 'container'
            ,border: false
            ,layout: 'column'
            ,anchor: '100%'
            ,items: [{
                xtype: 'container'
                ,layout: 'form'
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: 'State'
                    ,name: 'state'
                    ,width:200
                }]
            },{
                xtype: 'container'
                ,layout: 'form'
                ,columnWidth: 1
                ,labelWidth: 30
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: 'Post Code'
                    ,anchor: '-0.01'
                    ,name: 'postal_code'
                }]
            }]
        },{
            fieldLabel: 'Country'
            ,name: 'country'
            ,xtype: 'modx-combo-country'
            ,value: ''
            ,allowBlank: true
        }]
    }, this.fieldSetName);
    this.addressTab = {
        title: 'Address'
        ,xtype: 'container'
        ,layout: 'hbox'
        ,layoutConfig: {
            align:'stretch'
        }
        ,items: [
            this.addressFieldSetLeft
            ,this.addressFieldSetRight
        ]
    };



    /**
     * ART DETAILS TAB
     */
    this.artDetailsLeft = Ext.apply({}, {
        flex:1
        ,border:0
        ,title:''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'Artwork Title'
            ,name: 'art_title'
        },{
            fieldLabel: 'Nominator\'s Name'
            ,name: 'nom_name'
        }, {
            fieldLabel: 'Edition'
            ,name: 'edition'
        }]
    }, this.fieldSetName);
    this.artDetailsRight = Ext.apply({}, {
        flex:1
        ,border:0
        ,title:''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'Estimated Value'
            ,name: 'value'
        },{
            fieldLabel: 'Materials Used'
            ,name: 'art_materials'
        },{
            xtype: 'container'
            ,border: false
            ,layout: 'column'
            ,anchor: '100%'
            ,items: [{
                xtype: 'container'
                ,layout: 'form'
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: 'Height'
                    ,name: 'height'
                    ,width: 73
                }]
            },{
                xtype: 'container'
                ,layout: 'form'
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: 'Width'
                    ,name: 'width'
                    ,width: 73
                }]
            },{
                xtype: 'container'
                ,layout: 'form'
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: 'Depth'
                    ,name: 'depth'
                    ,width: 73
                }]
            },{
                html: 'CM'
                ,width: 30
                ,style: 'margin-top:30px;'
            }]
        }]
    }, this.fieldSetName);
    this.artDetailsTab = {
        title: 'Art Details'
        ,xtype: 'container'
        ,layout: 'hbox'
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.artDetailsLeft
            ,this.artDetailsRight
        ]
    };


    /**
     * CONTACT TAB
     */
    this.contactLeft = Ext.apply({}, {
        flex:1
        ,border:0
        ,title:''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'Home Number'
            ,name: 'tel_no'
        },{
            fieldLabel: 'Mobile Number'
            ,name: 'mob_no'
        }, {
            fieldLabel: 'Fax Number'
            ,name: 'fax_no'
        }]
    },this.fieldSetName);
    this.contactRight = Ext.apply({}, {
        flex:1
        ,border:0
        ,title:''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'Email Address'
            ,name: 'email_address'
        }]
    },this.fieldSetName);

    this.contactTab = {
        title: 'Contact'
        ,xtype: 'container'
        ,layout: 'hbox'
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.contactLeft
            ,this.contactRight
        ]
    };


    this.captionTab = {
        title: 'Caption'
        ,flex: 1
        ,xtype: 'container'
        ,layout: 'form'
        ,style: 'padding:10px 0 0 10px; border-width:0px;'
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [{
            fieldLabel: 'Enter the artwork caption here'
            ,xtype: 'textarea'
            ,name: 'caption'
            ,width: '97%'
            ,height: 150
        }]
    };


    /**
     * WORK BRIEF TAB
     */
    this.workBriefTab = {
        title: 'Work Brief'
        ,flex: 1
        ,xtype: 'container'
        ,layout: 'form'
        ,style: 'padding:10px 0 0 10px; border-width:0px;'
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [{
            fieldLabel: 'Enter the WORK BRIEF here'
            ,xtype: 'textarea'
            ,name: 'work_brief'
            ,width: '97%'
            ,height: 150
        }]
    };


    /**
     * ART BRIEF TAB
     */
    this.artBriefTab = {
        title: 'Art Brief'
        ,flex: 1
        ,xtype: 'container'
        ,layout: 'form'
        ,style: 'padding:10px 0 0 10px; border-width:0px;'
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [{
            fieldLabel: 'Enter the ART BRIEF here'
            ,xtype: 'textarea'
            ,name: 'art_brief'
            ,width: '97%'
            ,height: 150
        }]
    };

    /**
     * BOTTOM TABS GROUPING
     */
    this.tabs = [
        this.artDetailsTab
        ,this.addressTab
        ,this.contactTab
        ,this.captionTab
        ,this.workBriefTab
        ,this.artBriefTab
    ];



    /**
     * PANEL FOR TABS
     */
    this.tabPanel = {
        xtype: 'tabpanel'
        ,activeTab: 0
        ,deferredRender: false
        ,layoutOnTabChange: true
        ,border: true
        ,flex: 1
        ,height:230
        ,style: 'margin:6px 0;'
        ,plain: true
        ,items: this.tabs
    };




    /**
     * MAIN FORM CONTAINER
     */
    this.ident = config.ident || 'sovcreateart'+Ext.id();
    Ext.applyIf(config,{
        title: _('sovereign.add_artwork')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/artworks/create'
        }
        ,id: this.ident
        ,fileUpload : true
        ,allowBlank: false
        ,height: 600
        ,width: 750
        ,resizable: false
        ,fields: [{
            xtype: 'hidden'
            ,name: 'gallery_id'
        },{
            minWidth: 600
            ,height: 460
            ,frame: true
            ,layout: 'vbox'
            ,layoutConfig: {
                align: 'stretch'
            }
            ,items: [
                this.topFieldSetContainer
                ,this.tabPanel
            ]
        }]
    });
    Sovereign.window.CreateAfricanArtworks.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAfricanArtworks,MODx.Window);
Ext.reg('sovereign-window-africanartworks-create',Sovereign.window.CreateAfricanArtworks);