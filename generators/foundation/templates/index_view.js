<%= appname %>.IndexView = Ember.View.extend({
  // Navbar
  didInsertElement: function() {
    this.$().foundation('topbar');
    this.$().foundation('clearing');
  },
  willDestroyElement: function() {
    this.$().foundation('topbar', 'off');
    this.$().foundation('clearing', 'off');
  },
});