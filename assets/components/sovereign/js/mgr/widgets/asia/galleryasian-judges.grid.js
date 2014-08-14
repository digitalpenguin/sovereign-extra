Sovereign.grid.GalleryAsiaJudges = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryasiajudges'
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
            ,handler: { xtype: 'sovereign-window-galleryasiajudges-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryasiajudges-search-filter'
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
            ,id: 'modx-filter-clear-galleryasiajudges'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAsiaJudges.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.GalleryAsiaJudges,MODx.grid.Grid,{
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
        Ext.getCmp('galleryasiajudges-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.gallery_update')
            ,handler: this.updateGalleryAsiaJudges
        },'-',{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryAsiaJudges
        }];
    },updateGalleryAsiaJudges: function(btn,e) {
        if (!this.updateGalleryWindow) {
            this.updateGalleryWindow = MODx.load({
                xtype: 'sovereign-window-galleryasiajudges-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateGalleryWindow.setValues(this.menu.record);
        this.updateGalleryWindow.show(e.target);
    },removeGalleryAsiaJudges: function() {
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
Ext.reg('sovereign-grid-galleryasiajudges',Sovereign.grid.GalleryAsiaJudges);

Sovereign.window.UpdateGalleryAsiaJudges = function(config) {
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
    Sovereign.window.UpdateGalleryAsiaJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAsiaJudges,MODx.Window);
Ext.reg('sovereign-window-galleryasiajudges-update',Sovereign.window.UpdateGalleryAsiaJudges);


Sovereign.window.CreateGalleryAsiaJudges = function(config) {
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
    Sovereign.window.CreateGalleryAsiaJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAsiaJudges,MODx.Window);
Ext.reg('sovereign-window-galleryasiajudges-create',Sovereign.window.CreateGalleryAsiaJudges);