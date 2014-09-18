// https://gist.github.com/ppcano/7a5f0e551cd9b2db42b0

export default Ember.Mixin.extend({
	setupTap: function() {
		this._super();

		var self = this;
		this.hammer = new Hammer(this.get('element'), {recognizers: []});

		var tap = new Hammer.Tap();

		tap.set('enable', function() {
		  return self.canRecognizeTap();
		});
		this.hammer.add(tap);

		this.hammer.on('tap', function() {
		  self.tap();
		});
	}.on('didInsertElement')
});