Sovereign.grid.GalleryAfricanSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryafricansubmissions'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/africa/galleries/getListSubmissions' }
        ,fields: ['id','galleryname','description','url','year','artworktotal','enabled','createdon','createdby','menu']
        ,paging: true
        ,pageSize: 10
        ,remoteSort: true
        ,listeners : {
            'rowclick': function(grid, index, rec){
                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelections()[0];
                    var galleryId = row.get('id');
                }
                this.loadNewGrid(grid, row, galleryId);
            }
        }
        ,autoExpandColumn: 'year'
        ,columns: [{
            header: 'ID#'
            ,dataIndex: 'id'
            ,sortable: true
            ,width:.03
        },{
            header: _('sovereign.galleryname')
            ,dataIndex: 'galleryname'
            ,sortable: true
            ,width:.15
        },{
            header: _('sovereign.gallery_desc')
            ,dataIndex: 'description'
            ,sortable: true
            ,width:.3
        },{
            header: _('sovereign.gallery_artwork_total')
            ,align: 'center'
            ,dataIndex: 'artworktotal'
            ,sortable: false
            ,width:.055
        },{
            header: _('sovereign.active_gallery')
            ,align: 'center'
            ,dataIndex: 'enabled'
            ,sortable: true
            ,width:.05
            ,renderer: function(value){
                var active = value ? 'greentick.png' : 'redcross.png';
                return '<img src="' + Sovereign.config.cssUrl + '/img/' + active + '" >';
            }
        },{
            header: _('sovereign.created_on')
            ,dataIndex: 'createdon'
            ,sortable: true
            ,width:.08
        },{
            header: _('sovereign.created_by')
            ,dataIndex: 'createdby'
            ,sortable: true
            ,width:.08
        }]
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: { xtype: 'sovereign-window-galleryafricansubmissions-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryafricansubmissions-search-filter'
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
            ,id: 'modx-filter-clear-galleryafricansubmissions'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAfricanSubmissions.superclass.constructor.call(this,config)
};

Ext.extend(Sovereign.grid.GalleryAfricanSubmissions,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/africa/galleries/getListSubmissions'
            ,'parent': this.config.resource
        };
        Ext.getCmp('galleryafricansubmissions-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function(grid, index, rec) {
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelections()[0];
            var enabledVal = row.get('enabled');
        }
        if(!enabledVal) {
            return [{
                text: _('sovereign.gallery_activate')
                ,handler: this.activateGalleryAfricanSubmissions
            },'-',{
                text: _('sovereign.gallery_remove')
                ,handler: this.removeGalleryAfricanSubmissions
            }];
        } else {
            return [{
                text: _('sovereign.gallery_deactivate')
                ,handler: this.deactivateGalleryAfricanSubmissions
            },'-',{
                text: _('sovereign.gallery_movetojudges')
                ,handler: this.moveToJudges
            },'-',{
                text: _('sovereign.gallery_remove')
                ,handler: this.removeGalleryAfricanSubmissions
            }];
        }
    },activateGalleryAfricanSubmissions: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_activate')
            ,text: _('sovereign.gallery_activate_confirm')
            ,url: this.config.url
            //,galleryname: this.config.galleryname
            ,params: {
                action: 'mgr/africa/galleries/activate'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },deactivateGalleryAfricanSubmissions: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_deactivate')
            ,text: _('sovereign.gallery_deactivate_confirm')
            ,url: this.config.url
            //,galleryname: this.config.galleryname
            ,params: {
                action: 'mgr/africa/galleries/deactivate'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },moveToJudges: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_movetojudges')
            ,text: _('sovereign.gallery_movetojudges_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/africa/galleries/moveGallery'
                ,id: this.menu.record.id
                ,phase: 1
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },removeGalleryAfricanSubmissions: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/africa/galleries/remove'
                ,id: this.menu.record.id
                // A hack to prepend the modx install base path
                ,dir: Sovereign.config.modxBasePath + Sovereign.config.africanGalleryUrl + this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },loadNewGrid: function(grid, row, galleryId) {
        Ext.getCmp('sovereign-panel-africa').replaceSubmissionsGrid(grid, row, galleryId);
    }
});
Ext.reg('sovereign-grid-galleryafricansubmissions',Sovereign.grid.GalleryAfricanSubmissions);



Sovereign.window.CreateGalleryAfricanSubmissions = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricansubmissions-create');
    if (check) check.destroy();
    this.ident = config.ident || 'sovcrgal'+Ext.id();
    this.parent = Sovereign.config.africanGalleryUrl;//'assets/components/sovereign/galleries/african/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/galleries/create'
            ,parent: this.parent
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.galleryname')
            ,name: 'galleryname'
            ,width: 300
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.gallery_desc')
            ,name: 'description'
            ,width: 300
        }]
    });
    Sovereign.window.CreateGalleryAfricanSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAfricanSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryafricansubmissions-create',Sovereign.window.CreateGalleryAfricanSubmissions);