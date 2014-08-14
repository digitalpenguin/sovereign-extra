Sovereign.grid.GalleryEuropeSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryeuropesubmissions'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/galleryeurope/getList' }
        ,fields: ['id','galleryname','year','menu']
        ,paging: true
        ,remoteSort: true
        ,autoExpandColumn: 'galleryname'
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width: 60
        },{
            header: _('sovereign.galleryname')
            ,dataIndex: 'galleryname'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'textfield' }
        },{
            header: _('sovereign.year')
            ,dataIndex: 'year'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'textfield' }
        }]
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: { xtype: 'sovereign-window-galleryeuropesubmissions-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryeuropesubmissions-search-filter'
            ,emptyText: _('sovereign.search...')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            xtype: 'button'
            ,id: 'modx-filter-clear-galleryeuropesubmissions'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryEuropeSubmissions.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.GalleryEuropeSubmissions,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/galleryeurope/getList'
            ,'parent': this.config.resource
        };
        Ext.getCmp('galleryeuropesubmissions-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.gallery_update')
            ,handler: this.updateGalleryEuropeSubmissions
        },'-',{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryEuropeSubmissions
        }];
    },updateGalleryEuropeSubmissions: function(btn,e) {
        if (!this.updateGalleryEuropeSubmissionsWindow) {
            this.updateGalleryEuropeSubmissionsWindow = MODx.load({
                xtype: 'sovereign-window-galleryeuropesubmissions-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateGalleryEuropeSubmissionsWindow.setValues(this.menu.record);
        this.updateGalleryEuropeSubmissionsWindow.show(e.target);
    },removeGalleryEuropeSubmissions: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/galleryeurope/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
});
Ext.reg('sovereign-grid-galleryeuropesubmissions',Sovereign.grid.GalleryEuropeSubmissions);


Sovereign.window.UpdateGalleryEuropeSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryeurope/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.name')
            ,name: 'galleryname'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.year')
            ,name: 'year'
            ,anchor: '100%'
        }]
    });
    Sovereign.window.UpdateGalleryEuropeSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryEuropeSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryeuropesubmissions-update',Sovereign.window.UpdateGalleryEuropeSubmissions);


Sovereign.window.CreateGalleryEuropeSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryeurope/create'
        }
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.name')
            ,name: 'galleryname'
            ,width: 300
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.year')
            ,name: 'year'
            ,width: 300
        }]
    });
    Sovereign.window.CreateGalleryEuropeSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryEuropeSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryeuropesubmissions-create',Sovereign.window.CreateGalleryEuropeSubmissions);