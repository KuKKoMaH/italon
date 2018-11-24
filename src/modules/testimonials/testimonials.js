require('flickity/dist/flickity.pkgd.js');
require('magnific-popup');
var styles = require('../../js/styles');

var $container = $('.' + styles.testimonials.items);

$container.flickity({
  prevNextButtons: false,
  wrapAround:      true,
  contain:         true,
});

$container.magnificPopup({
  delegate:  '.' + styles.testimonials.popup,
  callbacks: {
    elementParse: function (item) {
      item.type = item.el.data('type') || 'image';
    }
  },
  iframe: {
    patterns: {
      youtube: {
        index: 'youtube.com',
        id:    'v=',
        src:   '//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0'
      },
    }
  }
});