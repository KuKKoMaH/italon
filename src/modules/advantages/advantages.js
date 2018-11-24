require('jquery-smooth-scroll');
var styles = require('../../js/styles');

$('.' + styles.advantages.link).smoothScroll({
  afterScroll: function(options) {
    window.location.hash = options.scrollTarget;
  }
});