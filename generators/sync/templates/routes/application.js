// app/routes/application.js
export default Ember.Route.extend({
  init: function() {
    this._super();

    this.emberSync.set('offlineStore', this.store);
    this.emberSync.set('onlineStore',  this.onlineStore);
    this.emberSync.synchronizeOnline();
  }
});