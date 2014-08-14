Sovereign.window.AfricanShowJudgesList = function(config) {
    config = config || {};
    this.galleryId = config.galleryId;
    this.ident = config.ident || 'sovshowjudges'+Ext.id();
    Ext.apply(config, {
        title: 'Assigned Judges'
        ,fileUpload: true
        ,width: 600
        ,height:600
        ,modal: true
        ,listeners: {
            'show': function(){this.center();}
        }
        ,fields: [{
            xtype: 'sovereign-grid-african-assignedjudges'
        }]
        ,buttons: [{
            text: 'Close'
            ,scope:this
            ,handler: this.hide
        }]
    });
    Sovereign.window.AfricanShowJudgesList.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.AfricanShowJudgesList,MODx.Window);
Ext.reg('sovereign-window-african-showjudges', Sovereign.window.AfricanShowJudgesList);


Sovereign.grid.AfricanAssignedJudges = function(config) {
    config = config || {};
    this.galleryId = Ext.getCmp('sovereign-grid-africanartworkjudges').config.galleryId; // this may cause a bug!
    Ext.applyIf(config, {
        id: 'sovereign-grid-african-assignedjudges'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/judges/getList'
            ,galleryId: this.galleryId
            ,usergroupname: 'AfricanJudgesGallery#'+this.galleryId
        }
        ,fields: ['id','fullname','username','email','password','menu']
        ,paging: true
        ,pageSize: 6
        ,remoteSort: true
        ,border:false
        ,autoExpandColumn: 'title'
        ,save_action: 'mgr/africa/judges/updateFromGrid'
        ,autosave: true
        ,columns: [{
            header: 'Full Name'
            ,dataIndex: 'fullname'
            ,sortable: true
            ,width:.04
        },{
            header: 'Email Address'
            ,dataIndex: 'email'
            ,sortable: true
            ,width:.06
        },{
            header: 'Username'
            ,dataIndex: 'username'
            ,sortable: false
            ,width:.05
        }]
        ,tbar: [{
            xtype: 'button'
            ,text: 'Upload CSV File'
            ,scope: this
            ,handler: this.uploadCsv
        },'-',{
            xtype: 'button'
            ,text: 'Add Single Judge'
            ,scope: this
            ,handler: this.addSingleJudge
        }]
    });
    Sovereign.grid.AfricanAssignedJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.grid.AfricanAssignedJudges,MODx.grid.Grid, {
    getMenu: function() {
    return [{
        text: 'Update Judges\' Details'
        ,handler: this.updateJudge
        },'-',{
            text: 'Reset Password'
            ,handler: this.resetPassword
        },'-',{
            text: 'Remove Judge'
            ,handler: this.removeJudge
        }];
    },addSingleJudge: function(e) {
        var win = MODx.load({
            galleryId: this.galleryId
            ,xtype: 'sovereign-window-africanjudges-create'
            ,listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this},
                scope: this
            }
        });
        win.baseParams.galleryId = win.galleryId;
        win.show(e.target);
    },updateJudge: function(btn,e) {
        if (!this.updateJudgeWindow) {
            this.updateJudgeWindow = MODx.load({
                xtype: 'sovereign-window-africanjudges-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateJudgeWindow.setValues(this.menu.record);
        this.updateJudgeWindow.show(e.target);
    },resetPassword: function() {

    },uploadCsv: function(e) {
        var win = MODx.load({
            galleryId: this.galleryId
            ,xtype: 'sovereign-window-africanjudges-uploadcsv'
            ,listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this},
                scope: this
            }
        });
        win.baseParams.galleryId = win.galleryId;
        win.show(e.target);
    },removeJudge: function() {
        MODx.msg.confirm({
            title: 'Remove Assigned Judge'
            ,text: 'Are you sure you want to remove this judge from the gallery?'
            ,url: this.config.url
            ,params: {
                action: 'mgr/africa/judges/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
});
Ext.reg('sovereign-grid-african-assignedjudges',Sovereign.grid.AfricanAssignedJudges);


Sovereign.window.UpdateAfricanJudges = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: 'Update Judges\' Details'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/judges/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Full Name'
            ,name: 'fullname'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Email Address'
            ,name: 'email'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Username'
            ,name: 'username'
            ,anchor: '100%'
        }]
    });
    Sovereign.window.UpdateAfricanJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateAfricanJudges,MODx.Window);
Ext.reg('sovereign-window-africanjudges-update',Sovereign.window.UpdateAfricanJudges);



Sovereign.window.CreateAfricanJudges = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: 'Add Single Judge To Gallery'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/judges/create'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Full Name'
            ,name: 'fullname'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Email Address'
            ,name: 'email'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Username'
            ,name: 'username'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Password'
            ,name: 'password'
            ,anchor: '100%'
        }]
    });
    Sovereign.window.CreateAfricanJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAfricanJudges,MODx.Window);
Ext.reg('sovereign-window-africanjudges-create',Sovereign.window.CreateAfricanJudges);


Sovereign.window.AfricanJudgesUploadCsv = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: 'Upload CSV File'
        ,fileUpload: true
        ,modal: true
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/judges/uploadCsv'
            ,path: Sovereign.config.csvUrl
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'field'
            ,fieldLabel: 'Upload CSV Files'
            ,inputType: 'file'
            ,anchor: '100%'
        }]
    });
    Sovereign.window.AfricanJudgesUploadCsv.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.AfricanJudgesUploadCsv,MODx.Window);
Ext.reg('sovereign-window-africanjudges-uploadcsv',Sovereign.window.AfricanJudgesUploadCsv);