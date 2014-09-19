App.S3UploadComponent = Ember.FileField.extend({
  url: ''

  filesDidChange: (function() {
    var uploadUrl = this.get('url');
    var files = this.get('files');

    var uploader = Ember.S3Uploader.create({
      url: uploadUrl
    });

    uploader.on('didUpload', function(response) {
      // S3 will return XML with url
      var uploadedUrl = $(response).find('Location')[0].textContent;
      uploadedUrl = unescape(uploadedUrl); // => http://yourbucket.s3.amazonaws.com/file.png
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]); // Uploader will send a sign request then upload to S3
    }
  }).observes('files')
});