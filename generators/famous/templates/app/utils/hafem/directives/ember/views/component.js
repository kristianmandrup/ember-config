// Generated by CoffeeScript 1.8.0
(function() {
  var Component;

  Component = Ember.Component.extend({
    famous: {
      _type: ''
    },
    'fa-width': undefined,
    'fa-height': undefined,
    'fa-color': undefined,
    'fa-curve': 'HafemTransitionsEasing.inOutBack',
    'fa-duration': 1000,
    'fa-translate-x': null,
    'fa-translate-y': null,
    'fa-translate-z': null,
    addTo: function(source) {
      return this.get('fa').add(source);
    },
    init: function() {
      return this._super();
    },
    _afterRender: function() {
      return this.willInsertFamous();
    },
    willInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, this._afterRender);
      return this._super();
    },
    didInsertElement: function() {
      return this._super();
    },
    willInsertFamous: function() {},
    didInsertFamous: function() {}
  });

  export default Component;

}).call(this);

//# sourceMappingURL=component.js.map