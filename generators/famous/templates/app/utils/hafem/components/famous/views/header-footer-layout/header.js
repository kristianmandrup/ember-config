// Generated by CoffeeScript 1.8.0
(function() {
  import Hafem from '../../../../directives/famous';
  var Component;

  Component = Hafem.Component.extend({
    classNames: ['famous-context', 'famous-views-header-footer-layout-header'],
    famous: {
      _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-header-footer-layout-header'])
    },
    addTo: function(source) {
      return this.getFa().header.add(source);
    },
    targetName: 'footer',
    properties: function() {
      return {
        headerSize: this.height()
      };
    }
  });

  export default Component;

}).call(this);

//# sourceMappingURL=header.js.map
