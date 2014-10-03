// Generated by CoffeeScript 1.8.0
(function() {
  import Hafem from '../../../directives/famous';
  var Component;

  Component = Hafem.Component.extend({
    classNames: ['famous', 'famous-animation'],
    tagName: '',
    famous: {
      _type: Ember.A(['famous', 'famous-animation'])
    },
    willInsertFamous: function() {
      var self;
      self = this;
      return this.hafem.isolate.get(this).get('transform').setTransform(Hafem.Famous.Core.Transform.translate(this.get('fa-translate-x'), this.get('fa-translate-y'), this.get('fa-translate-z')), {
        duration: this.get('fa-duration'),
        curve: eval(this.get('fa-curve'))
      });
    }
  });

  export default Component;

}).call(this);

//# sourceMappingURL=animation.js.map
