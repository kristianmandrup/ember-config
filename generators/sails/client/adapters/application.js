var App = App || {};

App.SailsSocketAdapter = DS.SailsSocketAdapter.extend({ 
	namespace: '/api', 
	log: true,

	// Used to map lowercase model names that sails uses to model names that ember can understand.
	useCSRF: true
});

App.SailsRESTAdapter = DS.SailsRESTAdapter.example({
  pathForType: function(type) {
    var camelized = Ember.String.camelize(type);
    return Ember.String.pluralize(camelized);
  }
});

export default App.SailsRESTAdapter;
