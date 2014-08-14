Sovereign.grid.AsianArtworkPublic = function(config) {
    config = config || {};

    this.exp = new Ext.grid.RowExpander({
        enableCaching: false
        ,tpl : new Ext.Template(
            '<div class="expanded-container">' +
                '<div class="expanded">' +
                '<h4>Filename</h4>' +
                '<p>{filename}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Height</h4>' +
                '<p>{height}</p>' +
                '</div>' +

                '<div class="expanded">' +
                '<h4>Width</h4>' +
                '<p>{width}</p>' +
                '</div>' +

                '<div class="expanded">' +
                '<h4>Depth</h4>' +
                '<p>{depth}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Edition</h4>' +
                '<p>{edition}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Can info be shared?</h4>' +
                '<p>{share}</p>' +
                '</div>'+

                '<div class="newline"></div>' +

                '<div class="expanded">' +
                '<h4>Telephone Number</h4>' +
                '<p>{tel_no}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Mobile Number</h4>' +
                '<p>{mob_no}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Fax Number</h4>' +
                '<p>{fax_no}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Date of Birth</h4>' +
                '<p>{dob}</p>' +
                '</div>'+

                '<div class="expanded expanded-email">' +
                '<h4>Email Address</h4>' +
                '<p>{email_address}</p>' +
                '</div>'+

                '<div class="newline"></div>' +

                '<div class="expanded">' +
                '<h4>Address: Part 1</h4>' +
                '<p>{address_1}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Address: Part 2</h4>' +
                '<p>{address_2}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Address: Part 3</h4>' +
                '<p>{address_3}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>City</h4>' +
                '<p>{city}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>State</h4>' +
                '<p>{state}</p>' +
                '</div>'+

                '<div class="expanded">' +
                '<h4>Postal Code</h4>' +
                '<p>{postal_code}</p>' +
                '</div>'+

                '<div class="expanded-wide newline">' +
                '<h4>Caption</h4>' +
                '<p>{caption}</p>' +
                '</div>' +

                '<div class="expanded-wide newline">' +
                '<h4>Statement</h4>' +
                '<p>{statement}</p>' +
                '</div>' +

                '<div class="expanded-wide newline">' +
                '<h4>Work Brief</h4>' +
                '<p>{work_brief}</p>' +
                '</div>' +

                '<div class="expanded-wide newline">' +
                '<h4>Art Brief</h4>' +
                '<p>{art_brief}</p><br><br>' +
                '</div>' +

                '</div>'
        )
    });

    this.currentGalleryId = Ext.getCmp('sovereign-panel-asia').config.currentPublicGallery;
    Ext.applyIf(config,{
        id: 'sovereign-grid-asianartworkpublic'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/asia/artworks/getListArtworksPublic'
            ,galleryId: this.currentGalleryId
        }
        ,fields: ['id','gallery_id','title','first_name','surname','address_1','address_2','address_3'
            ,'city','state','postal_code','country','tel_no','mob_no','fax_no','email_address','dob','nom_name','statement'
            ,'art_title','art_materials','height','width','depth','value','work_brief','art_brief','donate','share'
            ,'filename','gallery_type','caption','edition','img_height','img_width','confirmed','votes','winner'
            ,'createdon','createdby','menu']
        ,paging: true
        ,pageSize: 10
        ,remoteSort: false
        ,autoExpandColumn: 'art_title'
        ,listeners: {
            'beforerender': function() {
                this.getStore().setDefaultSort( 'votes', 'DESC' );
                this.refresh();
            }
            ,'cellclick': function(grid, rowIndex, columnIndex, e) {
                var record = grid.getStore().getAt(rowIndex); // Get the Record
                var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
                config.currentFileName = record.get(fieldName);
                if (columnIndex == 2)
                    this.displayArtwork(e);
            }
        }
        ,plugins: [this.exp]
        ,columns: [this.exp,{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width:.01
        },{
            header: _('sovereign.artwork_thumb')
            ,dataIndex: 'filename'
            ,align: 'center'
            ,sortable: true
            ,width:.04
            ,renderer: function(value){
                return '<img src="' + MODx.config.site_url + '/assets/components/sovereign/galleries/asian/'+ config.galleryId + '/thumbnails/' + value + '_small.jpeg" >';
            }
        },{
            header: _('sovereign.artist_title')
            ,dataIndex: 'title'
            ,sortable: true
            ,width:.02
        },{
            header: _('sovereign.first_name')
            ,dataIndex: 'first_name'
            ,sortable: false
            ,width:.05
        },{
            header: _('sovereign.surname')
            ,dataIndex: 'surname'
            ,sortable: false
            ,width:.05
        },{
            header: _('sovereign.country')
            ,dataIndex: 'country'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_title')
            ,dataIndex: 'art_title'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_art_materials')
            ,dataIndex: 'art_materials'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_estimated_value')
            ,dataIndex: 'value'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_nominator')
            ,dataIndex: 'nom_name'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_votes_total')
            ,dataIndex: 'votes'
            ,sortable: true
            ,width:.03
        },{
            header: _('sovereign.artwork_winner')
            ,dataIndex: 'winner'
            ,sortable: true
            ,width:.05
        }]
        ,tbar:[{
            text: _('sovereign.back_to_galleries')
            ,listeners: {
                'click': {fn: this.backToGallery, scope:this}
            }
        },'-',{
            text: _('sovereign.add_artwork')
            ,iconCls: 'icon-add'
            ,handler: this.createAsianArtwork
            ,scope: this
        },'->',{
            xtype: 'button'
            ,text: _('sovereign.export_csv')
            ,listeners: {
                'click': {fn: this.exportCsv, scope: this}
            }
        },{
            xtype: 'button'
            ,text: _('sovereign.export_images')
            ,listeners: {
                'click': {fn: this.exportImages, scope: this}
            }
        },'-','-',{
            xtype: 'textfield'
            ,id: 'asianartworkspublic-search-filter'
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
            ,id: 'modx-filter-clear-asianartworkspublic'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]

    });
    Sovereign.grid.AsianArtworkPublic.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.AsianArtworkPublic,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/asia/artworks/getListArtworksPublic'
            //,'parent': this.config.resource
            ,'galleryId': this.config.galleryId
        };
        Ext.getCmp('asianartworkspublic-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.artwork_tag_winner')
            ,handler: this.tagWinnerAsianArtworks
        },{
            text: _('sovereign.artwork_untag_winner')
            ,handler: this.unTagWinnerAsianArtworks
        },'-',{
            text: _('sovereign.artworks_update')
            ,handler: this.updateAsianArtworks
        },{
            text: _('sovereign.artworks_remove')
            ,handler: this.removeAsianArtworks
        }];
    },displayArtwork: function(e) {
        this.displayArtworkWindow = new Sovereign.window.DisplayAsianArtworkPublic;
        this.displayArtworkWindow.setValues(this.menu.record);
        this.displayArtworkWindow.show(e.target);

    },createAsianArtwork: function(btn,e) {
        var win = MODx.load({
            galleryId: this.config.galleryId
            ,xtype: 'sovereign-window-asianartworks-create'
            ,listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this},
                scope: this
            }
        });
        win.baseParams.galleryUrl = 'assets/components/sovereign/galleries/asian/' + win.galleryId + '/';
        win.baseParams.galleryId = win.galleryId;
        win.baseParams.confirmed = 1;
        win.show(e.target);
    },tagWinnerAsianArtworks: function(btn,e) {
        var win = MODx.load({
            galleryId: this.config.galleryId
            ,xtype: 'sovereign-window-asianartworks-tag-winner'
            ,record: this.menu.record
            ,listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this},
                scope: this
            }
        });
        win.baseParams.galleryId = win.galleryId;
        win.setValues(this.menu.record);
        win.show(e.target);
    },unTagWinnerAsianArtworks: function() {
        MODx.msg.confirm({
            title: _('sovereign.artwork_untag_winner')
            ,text: _('sovereign.artwork_untag_winner_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/artworks/unTagWinner'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },updateAsianArtworks: function(btn,e) {
        if (!this.updateArtworksWindow) {
            this.updateArtworksWindow = MODx.load({
                galleryId: this.config.galleryId
                ,xtype: 'sovereign-window-asianartworks-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateArtworksWindow.baseParams.galleryUrl = 'assets/components/sovereign/galleries/asian/' + this.updateArtworksWindow.galleryId + '/';
        this.updateArtworksWindow.baseParams.galleryId = this.updateArtworksWindow.galleryId;
        this.updateArtworksWindow.setValues(this.menu.record);
        this.updateArtworksWindow.show(e.target);
    },removeAsianArtworks: function() {
        MODx.msg.confirm({
            title: _('sovereign.artworks_remove')
            ,text: _('sovereign.artworks_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/asia/artworks/remove'
                ,id: this.menu.record.id
                ,file: '/assets/components/sovereign/galleries/asian/'+ this.menu.record.gallery_id + '/' + this.menu.record.filename
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },passGalleryId: function(galleryId) {
        this.config.galleryId = galleryId;
        //this.config.userGroupId = userGroupId;
    },backToGallery: function() {
        Ext.getCmp('sovereign-panel-asia').backToPublicGrid();
    }
});
Ext.reg('sovereign-grid-asianartworkpublic',Sovereign.grid.AsianArtworkPublic);


Sovereign.window.DisplayAsianArtworkPublic = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-asianartworkpublic-display');
    if (check) {
        check.destroy();
    }
    this.currentFileName = Ext.getCmp('sovereign-grid-asianartworkpublic').config.currentFileName;
    this.galleryId = Ext.getCmp('sovereign-grid-asianartworkpublic').config.galleryId;
    this.ident = config.ident || 'sovdisart'+Ext.id();
    Ext.apply(config,{
        title: this.currentFileName
        ,cls: 'container'
        ,id: this.id
        ,modal: true
        ,bodyStyle: 'min-height:300px;'
        ,layout: 'form'
        ,width: 850
        ,listeners: {
            'show': function(){this.center();}
        }
        ,fields: [{
            html: '<a target="_blank" href="'+ MODx.config.site_url + 'assets/components/sovereign/galleries/asian/'+ this.galleryId +'/'+ this.currentFileName + '">' +
                '<img src="' + MODx.config.site_url + 'assets/components/sovereign/galleries/asian/'+ this.galleryId + '/thumbnails/' + this.currentFileName + '_large.jpeg" >'
        }]
        ,tbar: ['Click the image to view the full version in a new window.']
        ,buttons:[{
            text: 'Close'
            ,scope: this
            ,handler: function() { this.hide(); }
        }]
    });

    Sovereign.window.DisplayAsianArtworkPublic.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.DisplayAsianArtworkPublic,MODx.Window);
Ext.reg('sovereign-window-asianartworkpublic-display',Sovereign.window.DisplayAsianArtworkPublic);



Sovereign.window.AsianArtworkTagWinner = function(config) {
    config = config || {};
    this.ident = config.ident || 'sovwinart'+Ext.id();
    Ext.apply(config,{
        title: 'Enter the Prize Title'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/asia/artworks/tagWinner'
        }
        ,cls: 'container'
        ,id: this.id
        ,width: 340
        ,modal: true
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'field'
            ,width: 300
            ,fieldLabel: 'Enter the name of the prize:'
            ,name: 'winner'
        }]
    });
    Sovereign.window.AsianArtworkTagWinner.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.AsianArtworkTagWinner,MODx.Window);
Ext.reg('sovereign-window-asianartworks-tag-winner',Sovereign.window.AsianArtworkTagWinner);