// Generated by CoffeeScript 1.8.0
(function() {
  import Hafem from '../../../directives/famous';
  var Component;

  Component = Hafem.LayoutComponent.extend({
    classNames: ['famous', 'famous-dom-consumer', 'famous-gridLayout', 'famous-group', 'famous-container-group'],
    famous: {
      _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-gridLayout'])
    },
    'fa-cols': 6,
    'fa-rows': 2,
    cols: function() {
      return this.get('fa-cols');
    },
    rows: function() {
      return this.get('fa-rows');
    },
    dimensions: function() {
      return [this.cols(), this.rows()];
    },
    properties: function() {
      return {
        dimensions: this.dimensions()
      };
    },
    clazz: 'GridLayout'
  });

  export default Component;

}).call(this);

//# sourceMappingURL=grid-layout.js.map