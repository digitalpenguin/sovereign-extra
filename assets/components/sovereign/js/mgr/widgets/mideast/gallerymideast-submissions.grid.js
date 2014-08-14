Sovereign.grid.GalleryMideastSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-gallerymideastsubmissions'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/gallerymideast/getList' }
        ,fields: ['id','galleryname','year','menu']
        ,paging: true
        ,remoteSort: true
        ,listeners : {
            'rowclick': function(grid, index, rec){
                console.log('yup');
                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelections()[0];
                    var id = row.get('id');
                }
                //location.href = '?a='+MODx.request.a+'&action=competitionview&competition='+id;
                this.loadNewGrid(grid, row, id);
            }
        }
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
        },{
            header: _('sovereign.year')
            ,dataIndex: 'year'
            ,sortable: true
            ,width: 100
        }]
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: { xtype: 'sovereign-window-gallerymideastsubmissions-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'gallerymideastsubmissions-search-filter'
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
            ,id: 'modx-filter-clear-gallerymideastsubmissions'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryMideastSubmissions.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.GalleryMideastSubmissions,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/gallerymideast/getList'
            ,'parent': this.config.resource
        };
        Ext.getCmp('gallerymideastsubmissions-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.gallery_update')
            ,handler: this.updateGalleryMideastSubmissions
        },'-',{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryMideastSubmissions
        }];
    },updateGalleryMideastSubmissions: function(btn,e) {
        if (!this.updateGalleryWindow) {
            this.updateGalleryWindow = MODx.load({
                xtype: 'sovereign-window-galleryMideastsubmissions-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateGalleryWindow.setValues(this.menu.record);
        this.updateGalleryWindow.show(e.target);
    },removeGalleryMideastSubmissions: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/gallerymideast/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },loadNewGrid: function(grid, row, id) {
        Ext.getCmp('sovereign-panel-mideast').replaceSubmissionsGrid(grid, row, id);
    }
});
Ext.reg('sovereign-grid-gallerymideastsubmissions',Sovereign.grid.GalleryMideastSubmissions);

Sovereign.window.UpdateGalleryMideastSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/gallerymideast/update'
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
    Sovereign.window.UpdateGalleryMideastSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryMideastSubmissions,MODx.Window);
Ext.reg('sovereign-window-gallerymideastsubmissions-update',Sovereign.window.UpdateGalleryMideastSubmissions);


Sovereign.window.CreateGalleryMideastSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/gallerymideast/create'
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
    Sovereign.window.CreateGalleryMideastSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryMideastSubmissions,MODx.Window);
Ext.reg('sovereign-window-gallerymideastsubmissions-create',Sovereign.window.CreateGalleryMideastSubmissions);