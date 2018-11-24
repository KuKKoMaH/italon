require('jquery-smooth-scroll');
var styles = require('../../js/styles');
var menu = $('.' + styles.header['menu-wrapper']);

var activeClass = styles.header['menu-wrapper-active'];

$('.' + styles.header.hamburger + ', .' + styles.header.close).on('click', function(e){
  e.preventDefault();
  menu.toggleClass(activeClass);
});

$('.' + styles.header.header + ' a').smoothScroll({
  // offset: -60,
  beforeScroll: function() {
    menu.removeClass(activeClass);
  },
  afterScroll: function(options) {
    window.location.hash = options.scrollTarget;
  }
});