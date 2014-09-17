// views/toolbar.js

var slider = this.$('.range-slider');

// send new value when slider is done changing
slider.on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider', function(e) {
  $(e.target.parentElement).children('input[type=hidden]').trigger("change");
});

export default = Ember.View.extend({
  didInsertElement: function() {
    // making sure the slider reflows after its dropdown is made visible the first time
    var dropdown = this.$('div .f-dropdown.content');

    // make all sliders reflow when their dropdowns are first opened
    dropdown.one('opened.fndtn.dropdown', function(e) {
      $(e.target).find('.range-slider').foundation('slider', 'reflow');
    });

    // make sure the slider stays updated when a new record loads in
    // only necessary when the dropdown opens again
    dropdown.on('opened.fndtn.dropdown', function(e) {
      var target_slider = $(e.target).find('.range-slider');
      var new_value = target_slider.attr('data-slider');

      target_slider.foundation('slider', 'set_value', new_value);
    });

    return this._super();
  }
});