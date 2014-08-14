Sovereign.grid.GalleryAsianPublic = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryasianpublic'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/asia/galleries/getListPublic' }
        ,fields: ['id','galleryname','description','cover_filename','url','year','artworktotal','votes','type','enabled','public_voting','createdon','createdby','menu']
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
            ,id: 'galleryasianpublic-search-filter'
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
            ,id: 'modx-filter-clear-galleryasianpublic'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAsianPublic.superclass.constructor.call(this,config)
};

Ext.extend(Sovereign.grid.GalleryAsianPublic,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/asia/galleries/getListPublic'
            ,'parent': this.config.resource
        };
        Ext.getCmp('galleryasianpublic-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function(grid, index, rec) {
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelections()[0];
            var publicVotingEnabled = row.get('public_voting');
        }
        if(!publicVotingEnabled){
            return [{
                text: _('sovereign.gallery_startpublicvoting')
                ,handler: this.startVotingGalleryAsianPublic
            },{
                text: _('sovereign.gallery_back_to_judges')
                ,handler: this.backToJudgesPhaseGalleryAsianPublic
            },'-',{
                text: _('sovereign.gallery_upload_cover_image')
                ,handler: this.uploadCoverImage
            },{
                text: _('sovereign.gallery_update')
                ,handler: this.updateAsianGallery
            },{
                text: _('sovereign.gallery_remove')
                ,handler: this.removeGalleryAsianPublic
            }];
        } else {
            return [{
                text: _('sovereign.gallery_endpublicvoting')
                ,handler: this.endVotingGalleryAsianPublic
            },{
                text: _('sovereign.gallery_back_to_judges')
                ,handler: this.backToJudgesPhaseGalleryAsianPublic
            },'-',{
                text: _('sovereign.gallery_upload_cover_image')
                ,handler: this.uploadCoverImage
            },{
                text: _('sovereign.gallery_update')
                ,handler: this.updateAsianGallery
            },{
                text: _('sovereign.gallery_remove')
                ,handler: this.removeGalleryAsianPublic
            }];
        }
    },createAsianGallery: function(btn,e) {
        var win = MODx.load({
            xtype: 'sovereign-window-galleryasianpublic-create'
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
                xtype: 'sovereign-window-galleryasianpublic-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateAsianGalleryWindow.setValues(this.menu.record);
        this.updateAsianGalleryWindow.show(e.target);
    },uploadCoverImage: function(btn,e) {
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
    },startVotingGalleryAsianPublic: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_startpublicvoting')
            ,text: _('sovereign.gallery_startpublicvoting_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/galleries/startPublicVoting'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },endVotingGalleryAsianPublic: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_endpublicvoting')
            ,text: _('sovereign.gallery_endpublicvoting_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/galleries/endPublicVoting'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },backToJudgesPhaseGalleryAsianPublic: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_back_to_judges')
            ,text: _('sovereign.gallery_back_to_judges_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/galleries/moveGallery'
                ,id: this.menu.record.id
                ,phase: 1
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },removeGalleryAsianPublic: function() {
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
        Ext.getCmp('sovereign-panel-asia').replacePublicGrid(grid, row, galleryId);
    }
});
Ext.reg('sovereign-grid-galleryasianpublic',Sovereign.grid.GalleryAsianPublic);