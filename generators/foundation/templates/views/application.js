<%= appname %>.ApplicationView = Ember.View.extend({
  initFoundation: function () {
      Ember.$(document).foundation();  
  }.on('didInsertElement')
});      
