Sovereign.grid.GalleryAsiaSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryasiaSubmissions'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/galleryasia/getList' }
        ,fields: ['id','galleryname','year','menu']
        ,paging: true
        ,remoteSort: true
        ,autoExpandColumn: 'galleryname'
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,editable: false
            ,sortable: true
            ,width: 60
        },{
            header: _('sovereign.galleryname')
            ,dataIndex: 'galleryname'
            ,sortable: true
            ,editable: false
            ,width: 100
            ,editor: { xtype: 'textfield' }
        },{
            header: _('sovereign.year')
            ,dataIndex: 'year'
            ,sortable: true
            ,editable: false
            ,width: 100
            ,editor: { xtype: 'textfield' }
        }]
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: { xtype: 'sovereign-window-galleryasiasubmissions-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryasiasubmissions-search-filter'
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
            ,id: 'modx-filter-clear-galleryasiasubmissions'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAsiaSubmissions.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.GalleryAsiaSubmissions,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/galleryasia/getList'
            ,'parent': this.config.resource
        };
        Ext.getCmp('galleryasiasubmissions-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.gallery_update')
            ,handler: this.updateGalleryAsiaSubmissions
        },'-',{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryAsiaSubmissions
        }];
    },updateGalleryAsiaSubmissions: function(btn,e) {
        if (!this.updateGalleryAsiaSubmissionsWindow) {
            this.updateGalleryAsiaSubmissionsWindow = MODx.load({
                xtype: 'sovereign-window-galleryasiasubmissions-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateGalleryAsiaSubmissionsWindow.setValues(this.menu.record);
        this.updateGalleryAsiaSubmissionsWindow.show(e.target);
    },removeGalleryAsiaSubmissions: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/galleryasia/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
});
Ext.reg('sovereign-grid-galleryasiasubmissions',Sovereign.grid.GalleryAsiaSubmissions);

Sovereign.window.UpdateGalleryAsiaSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryasia/update'
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
            ,fieldLabel: _('sovereign.description')
            ,name: 'year'
            ,anchor: '100%'
        }]
    });
    Sovereign.window.UpdateGalleryAsiaSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAsiaSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryasiasubmissions-update',Sovereign.window.UpdateGalleryAsiaSubmissions);


Sovereign.window.CreateGalleryAsiaSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryasia/create'
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
    Sovereign.window.CreateGalleryAsiaSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAsiaSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryasiasubmissions-create',Sovereign.window.CreateGalleryAsiaSubmissions);