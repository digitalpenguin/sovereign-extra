Sovereign.grid.GalleryAsianJudges = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryasianjudges'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/asia/galleries/getListJudges' }
        ,fields: ['id','galleryname','description','cover_filename','url','year','artworktotal','votes','enabled','type','createdon','createdby','menu']
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
            header: _('sovereign.gallery_type')
            ,dataIndex: 'type'
            ,sortable: true
            ,width:.06
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
            ,width:.06
        },{
            header: _('sovereign.gallery_vote_total')
            ,align: 'center'
            ,dataIndex: 'votes'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.created_on')
            ,dataIndex: 'createdon'
            ,sortable: true
            ,width:.08
        },{
            header: _('sovereign.gallery_cover')
            ,dataIndex: 'cover_filename'
            ,sortable: false
            ,width:.1
            ,renderer: function(value, metaData, record){
                return '<img src="' + MODx.config.site_url + 'assets/components/sovereign/galleries/asian/'+ record.get('id') + '/cover/' + value + '_small.jpeg" >';
            }
        }]
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: this.createAsianGallery
            ,scope: this
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryasianjudges-search-filter'
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
            ,id: 'modx-filter-clear-galleryasianjudges'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAsianJudges.superclass.constructor.call(this,config)
};

Ext.extend(Sovereign.grid.GalleryAsianJudges,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/asia/galleries/getListJudges'
            ,'parent': this.config.resource
        };
        Ext.getCmp('galleryasianjudges-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function(grid, index, rec) {
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelections()[0];
            var enabledVal = row.get('enabled');
        }
        return [{
            text: _('sovereign.gallery_back_to_submissions')
            ,handler: this.backToSubmissionPhaseGalleryAsianJudges
        },{
            text: _('sovereign.gallery_movetopublic')
            ,handler: this.moveToPublicPhaseGalleryAsianJudges
        },'-',{
            text: _('sovereign.gallery_upload_cover_image')
            ,handler: this.uploadCoverImage
        },{
            text: _('sovereign.gallery_update')
            ,handler: this.updateAsianGallery
        },{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryAsianJudges
        }];

    },createAsianGallery: function(btn,e) {
        var win = MODx.load({
            xtype: 'sovereign-window-galleryasianjudges-create'
            ,listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this},
                scope: this
            }
        });
        win.baseParams.galleryUrl = 'assets/components/sovereign/galleries/asian/';
        win.show(e.target);

    },updateAsianGallery: function(btn,e) {
        if (!this.updateAsianGalleryWindow) {
            this.updateAsianGalleryWindow = MODx.load({
                xtype: 'sovereign-window-galleryasianjudges-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateAsianGalleryWindow.setValues(this.menu.record);
        this.updateAsianGalleryWindow.show(e.target);
    },uploadCoverImage: function(e) {
        if (!this.uploadCoverImageWindow) {
            this.uploadCoverImageWindow = MODx.load({
                xtype: 'sovereign-window-galleryasian-upload-cover'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.uploadCoverImageWindow.setValues(this.menu.record);
        this.uploadCoverImageWindow.show(e.target);
    },backToSubmissionPhaseGalleryAsianJudges: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_back_to_submissions')
            ,text: _('sovereign.gallery_back_to_submissions_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/galleries/moveGallery'
                ,id: this.menu.record.id
                ,phase: 0
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },moveToPublicPhaseGalleryAsianJudges: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_movetopublic')
            ,text: _('sovereign.gallery_movetopublic_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/galleries/moveGallery'
                ,id: this.menu.record.id
                ,phase: 2
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },removeGalleryAsianJudges: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/galleries/remove'
                ,id: this.menu.record.id
                // A hack to prepend the modx install base path
                ,dir: Sovereign.config.modxBasePath + Sovereign.config.asianGalleryUrl + this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },loadNewGrid: function(grid, row, galleryId) {
        Ext.getCmp('sovereign-panel-asia').replaceJudgesGrid(grid, row, galleryId);
    }
});
Ext.reg('sovereign-grid-galleryasianjudges',Sovereign.grid.GalleryAsianJudges);