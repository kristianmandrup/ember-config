export default Ember.LinkView.reopen({
  hammerOptions: {
    tap: true
  },
  eventName: 'tap',
  click: function(event) {
    event.preventDefault();
  } 
});