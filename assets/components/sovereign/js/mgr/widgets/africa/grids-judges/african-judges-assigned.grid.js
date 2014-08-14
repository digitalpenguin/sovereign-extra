Sovereign.window.AfricanShowJudgesList = function(config) {
    config = config || {};
    this.galleryId = config.galleryId;
    this.ident = config.ident || 'sovshowjudges'+Ext.id();
    Ext.apply(config, {
        title: 'Assigned Judges'
        ,fileUpload: true
        ,width: 1000
        ,bodyStyle: 'min-height:500px;'
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
        ,fields: ['id','website','fullname','username','email','password','address','city','comment','menu']
        ,paging: true
        ,pageSize: 6
        ,remoteSort: true
        ,border:false
        ,autoExpandColumn: 'title'
        ,save_action: 'mgr/africa/judges/updateFromGrid'
        ,autosave: true
        ,columns: [{
            header: 'Portrait'
            ,dataIndex: 'website'
            ,sortable: false
            ,width:.02
            ,renderer: function(value, metaData, record){
                return '<img src="' + MODx.config.site_url + 'assets/components/sovereign/galleries/african/'+ Ext.getCmp('sovereign-grid-africanartworkjudges').config.galleryId + '/judges/' + value + '_small.jpeg" >';
            }
        },{
            header: 'Full Name'
            ,dataIndex: 'fullname'
            ,sortable: true
            ,width:.03
        },{
            header: 'Email Address'
            ,dataIndex: 'email'
            ,sortable: true
            ,width:.03
        },{
            header: 'Position'
            ,dataIndex: 'address'
            ,sortable: false
            ,width:.03
        },{
            header: 'Organisation'
            ,dataIndex: 'city'
            ,sortable: false
            ,width:.03
        },{
            header: 'Biography'
            ,dataIndex: 'comment'
            ,sortable: false
            ,width:.07
        }]
        ,tbar: [{
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



