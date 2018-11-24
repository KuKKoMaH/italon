var styles = require('../../js/styles');
var initGallery = require('../../js/initGallery');

initGallery({
  $items: $('.' + styles.process.item),
  getTitle: function($el) {
    return $el.find('.' + styles.process.name).text();
  }
});


// var styles = require('../../js/styles');
// var PhotoSwipe = require('photoswipe');
// var PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.js');
//
// var items = $('.' + styles.process.item);
// var slides = [];
// items.each(function (i, el) {
//   var $el = $(el);
//   slides.push({
//     src:   $el.attr('href'),
//     w:     $el.data('width'),
//     h:     $el.data('height'),
//     title: $el.find('.' + styles.process.name).text(),
//   });
//   $el.on('click', function (e) {
//     e.preventDefault();
//     openGallery(i);
//   })
// });
//
// function openGallery(i) {
//
//   var gallery = new PhotoSwipe(
//     $('.pswp')[0],
//     PhotoSwipeUI_Default,
//     slides,
//     {
//       index:   i,
//       history: false
//     }
//   );
//   gallery.init();
// }