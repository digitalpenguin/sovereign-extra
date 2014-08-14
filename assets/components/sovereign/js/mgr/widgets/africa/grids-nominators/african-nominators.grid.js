Sovereign.grid.AfricanNominators = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'sovereign-grid-african-nominators'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/nominators/getList'
        }
        ,fields: ['id','fullname','filename','email','position','organisation','biography','menu']
        ,paging: true
        ,pageSize: 10
        ,remoteSort: true
        ,border:false
        ,autoExpandColumn: 'biography'
        ,save_action: 'mgr/africa/nominators/updateFromGrid'
        ,autosave: true
        ,columns: [{
            header: 'Portrait'
            ,dataIndex: 'filename'
            ,sortable: false
            ,width:.011
            ,renderer: function(value, metaData, record){
                return '<img src="' + MODx.config.site_url + 'assets/components/sovereign/galleries/african/nominators/'+ record.id + '/' + value + '_small.jpeg" >';
            }
        },{
            header: 'Full Name'
            ,dataIndex: 'fullname'
            ,sortable: false
            ,width:.03
        },{
            header: 'Email'
            ,dataIndex: 'email'
            ,sortable: false
            ,width:.03
        },{
            header: 'Position'
            ,dataIndex: 'position'
            ,sortable: false
            ,width:.03
        },{
            header: 'Organisation'
            ,dataIndex: 'organisation'
            ,sortable: true
            ,width:.03
        },{
            header: 'Biography'
            ,dataIndex: 'biography'
            ,sortable: false
            ,width:.07
        }]
        ,tbar: [{
            text: 'Add Nominator'
            ,handler: { xtype: 'sovereign-window-africannominators-create' ,blankValues: true }
        }]
    });
    Sovereign.grid.AfricanNominators.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.grid.AfricanNominators,MODx.grid.Grid, {
    getMenu: function() {
        return [{
            text: 'Update Nominator Details'
            ,handler: this.updateNominator
        },'-',{
            text: 'Remove Nominator'
            ,handler: this.removeNominator
        }];
    },updateNominator: function(btn,e) {
        if (!this.updateNominatorWindow) {
            this.updateNominatorWindow = MODx.load({
                xtype: 'sovereign-window-africannominators-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateNominatorWindow.setValues(this.menu.record);
        this.updateNominatorWindow.show(e.target);
    },removeNominator: function() {
        MODx.msg.confirm({
            title: 'Remove Nominator'
            ,text: 'Are you sure you want to remove this nominator?'
            ,url: this.config.url
            ,params: {
                action: 'mgr/africa/nominators/remove'
                ,id: this.menu.record.id
                ,dir: Sovereign.config.modxBasePath + Sovereign.config.africanGalleryUrl +'nominators/'+ this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
});
Ext.reg('sovereign-grid-african-nominators',Sovereign.grid.AfricanNominators);