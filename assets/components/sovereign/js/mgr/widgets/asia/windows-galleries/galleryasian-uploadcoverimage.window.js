Sovereign.window.UploadCoverImageGalleryAsian = function(config) {
    config = config || {};

    this.mainFieldSet = {
        xtype: 'container'
        ,layout: 'form'
        ,items: [{
            xtype: 'field'
            ,fieldLabel: 'Select New Cover Image'
            ,inputType: 'file'
            ,style: 'margin:10px 0 0 10px; width:360px;'
        }]
    };
    this.galleryUrl = Sovereign.config.asianGalleryUrl;
    Ext.applyIf(config,{
        title: 'Upload Gallery Cover Image'
        ,fileUpload: true
        ,modal: true
        ,width: 434
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/asia/galleries/uploadCoverImage'
            ,galleryUrl: this.galleryUrl
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },this.mainFieldSet]
    });
    Sovereign.window.UploadCoverImageGalleryAsian.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UploadCoverImageGalleryAsian,MODx.Window);
Ext.reg('sovereign-window-galleryasian-upload-cover',Sovereign.window.UploadCoverImageGalleryAsian);