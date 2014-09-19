// app/initializers/online-store.js
var CustomOnlineSerializer = DS.ActiveModelSerializer.extend();
var CustomOnlineAdapter = DS.ActiveModelAdapter.extend({
  serializer: CustomOnlineSerializer.create(),
  namespace: '/api/v1' // your server namespace
});

var OnlineStore = DS.Store.extend({
  adapterFor: function(type) {
    return this.container.lookup('adapter:<%= store %>');
  },

  serializerFor: function(type) {
    return this.container.lookup('serializer:<%= store %>');
  }
});

export default {
  name: "onlineStore",

  initialize: function(container, application) {
    CustomOnlineSerializer.reopen({ container: container });

    container.register('store:online', OnlineStore);
    container.register('adapter:<%= store %>', CustomOnlineAdapter);
    container.register('serializer:<%= store %>', CustomOnlineSerializer);

    application.inject('route',      'onlineStore', 'store:online');
    application.inject('controller', 'onlineStore', 'store:online');
  }
};