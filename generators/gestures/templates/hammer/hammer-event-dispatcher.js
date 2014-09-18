export default Ember.EventDispatcher.reopen({
  events: {
    tap  : 'tap',
    click       : 'click', // manage to preventDefault link-to views
    focusin     : 'focusIn',
    focusout    : 'focusOut',
    submit      : 'submit',
    input       : 'input',
    change      : 'change'
  },
 
  _findNearestEventManager: function() {
    return null;
  }
 
});