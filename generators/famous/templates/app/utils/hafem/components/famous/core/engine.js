// Generated by CoffeeScript 1.8.0
(function() {
  import Hafem from '../../../directives/famous';
  var Component;

  Component = Hafem.Component.extend({
    classNames: ['famous', 'famous-dom-consumer', 'famous-engine'],
    famous: {
      _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-engine'])
    },
    didInsertElement: function() {
      var fa;
      fa = Hafem.Famous.Core.Engine.createContext(this.$()[0]);
      return this.set('fa', fa);
    }
  });

  export default Component;

}).call(this);

//# sourceMappingURL=engine.js.map
