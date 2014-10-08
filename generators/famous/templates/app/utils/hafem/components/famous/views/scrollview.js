// Generated by CoffeeScript 1.8.0
(function() {
  import Hafem from '../../../directives/famous';
  var Component;

  Component = Hafem.LayoutComponent.extend({
    classNames: ['famous-context', 'famous-views-scrollview'],
    addTo: function(source) {
      source.pipe(this.get('fa'));
      return this.get('surfaces').push(source);
    },
    properties: function() {
      return {
        target: this.$()[0]
      };
    },
    clazz: 'ScrollView',
    willInsertFamous: function() {},
    didInsertElement: function() {
      return this.insert();
    }
  });

  export default Component;

}).call(this);

//# sourceMappingURL=scrollview.js.map