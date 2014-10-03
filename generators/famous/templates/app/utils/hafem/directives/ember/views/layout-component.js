// Generated by CoffeeScript 1.8.0
(function() {
  import BaseComponent from './component';
  import Hafem from '../../famous';
  var Component;

  Component = BaseComponent.extend({
    surfaces: [],
    init: function() {
      this._super();
      return this.set('surfaces', []);
    },
    pushSurface: function(source) {
      return this.get('surfaces').push(source);
    },
    addTo: function(source) {
      console.log('addTo', source);
      return this.pushSurface(source);
    },
    properties: function() {
      return {};
    },
    viewClass: function(name) {
      return Hafem.Famous.Views[name];
    },
    layoutClass: function() {
      return this._layoutClassByName() || this._layoutClassByRef() || this._noClazz();
    },
    _noClazz: function() {
      throw Error("Missing clazz: to indicate layout/view class to be used");
    },
    _layoutClassByName: function() {
      if (typeof this.clazz === 'string') {
        return viewClass(this.clazz);
      }
    },
    _layoutClassByRef: function() {
      if (typeof this.clazz === 'object') {
        return this.clazz;
      }
    },
    create: function() {
      return new this.layoutClass()(this.properties());
    },
    insertIt: function() {
      console.log('insert');
      return this.register(this.create());
    },
    willInsertFamous: function() {
      console.log('willInsertFamous');
      return this.insert();
    },
    register: function(fa) {
      console.log('register', fa);
      fa.sequenceFrom(this.get('surfaces'));
      this.set('fa', fa);
      return this.hafem.isolate.get(this).addTo(fa);
    }
  });

  export default Component;

}).call(this);

//# sourceMappingURL=layout-component.js.map
