// https://gist.github.com/ppcano/7a5f0e551cd9b2db42b0
Em.View.reopen({
 
  hammerOptions: null,
  enableHammer: function() {
    var gestures = ['drag', 'hold', 'release', 'swipe', 'tap', 'touch', 'transform'];
    var options = this.get('hammerOptions');
 
    if ( options ) {
      gestures.forEach(function(gesture) {
        if ( !options[gesture] ) {
          options[gesture] = false;
        }
      });
 
      this.hammer = new Hammer(this.get('element'), options);
    }
 
  }.on('didInsertElement'),
 
 
  destroyHammer: function() {
    if (this.hammer) {
      this.hammer.dispose();
      this.hammer = null;
    }
 
 
  }.on('willDestroyElement')
 
});
 
 
Ember.EventDispatcher.reopen({
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
 
Ember.LinkView.reopen({
 
  hammerOptions: {
    tap: true
  },
  eventName: 'tap',
  click: function(event) {
    event.preventDefault();
  }
 
});