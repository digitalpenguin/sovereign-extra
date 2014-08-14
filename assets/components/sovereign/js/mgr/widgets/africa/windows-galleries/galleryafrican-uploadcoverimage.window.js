Sovereign.window.UploadCoverImageGalleryAfrican = function(config) {
    config = config || {};

    this.mainFieldSet = {
        xtype: 'fieldset'
        ,items: [{
            xtype: 'field'
            ,fieldLabel: 'Select New Cover Image'
            ,inputType: 'file'
            ,style: 'margin:10px 0 0 10px; width:360px;'
        }]
    };
    this.galleryUrl = Sovereign.config.africanGalleryUrl;
    Ext.applyIf(config,{
        title: 'Upload Gallery Cover Image'
        ,fileUpload: true
        ,modal: true
        ,width: 434
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/galleries/uploadCoverImage'
            ,galleryUrl: this.galleryUrl
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },this.mainFieldSet]
    });
    Sovereign.window.UploadCoverImageGalleryAfrican.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UploadCoverImageGalleryAfrican,MODx.Window);
Ext.reg('sovereign-window-galleryafrican-upload-cover',Sovereign.window.UploadCoverImageGalleryAfrican);