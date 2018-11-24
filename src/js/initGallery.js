var PhotoSwipe = require('photoswipe');
var PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.js');

module.exports = function initGalley( config ) {
  var slides = [];
  config.$items.each(function ( i, el ) {
    var $el = $(el);
    slides.push({
      src:     $el.attr('href'),
      w:       $el.data('width'),
      h:       $el.data('height'),
      title:   $el.data('caption'),
    });
    $el.on('click', function ( e ) {
      e.preventDefault();
      openGallery(i);
    })
  });

  function openGallery( i ) {
    var gallery = new PhotoSwipe(
      $('.pswp')[0],
      PhotoSwipeUI_Default,
      slides,
      {
        index:            i,
        history:          false,
        closeOnScroll:    false,
        maxSpreadZoom:    1,
        getDoubleTapZoom: function ( isMouseClick, item ) {
          return item.initialZoomLevel;
        },
        pinchToClose:     false
      }
    );

    gallery.init();

    var isDown = false;
    var $container = $('.pswp__item');
    $container.on('mousedown.gallery', function ( e ) {
      isDown = true;
      $container.on('mousemove.gallery', function () {
        isDown = false;
      });

      $container.on('mouseup.gallery', function ( e ) {
        $container.off('mouseup.gallery mousemove.gallery');
        if (isDown) {
          gallery.next();
          isDown = false;
        }
      });
    });

    gallery.listen('destroy', function () {
      $container.off('mousedown.gallery');
    });
  }
};
