import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';

$('.productInfo__link--video').magnificPopup({ type: 'iframe' });

$('.productInfo__link--solutions').on('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  const gallery = new PhotoSwipe(
    $('.pswp')[0],
    PhotoSwipeUI_Default,
    window.PRODUCT_SOLUTIONS,
    {
      index:         0,
      history:       false,
      closeOnScroll: false,
      // maxSpreadZoom:    1,
      // getDoubleTapZoom: function (isMouseClick, item) {
      //   return item.initialZoomLevel;
      // },
      pinchToClose:  false,
      loop:          true,
      tapToClose:    false,
    }
  );

  gallery.init();
  // var isDown = false;
  // var $container = $('.pswp__item');
  // $container.on('mousedown.gallery', function (e) {
  //   isDown = true;
  //   $container.on('mousemove.gallery', function () {
  //     isDown = false;
  //   });
  //
  //   $container.on('mouseup.gallery', function (e) {
  //     $container.off('mouseup.gallery mousemove.gallery');
  //     if (isDown) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       gallery.next();
  //       isDown = false;
  //     }
  //   });
  // });
  //
  // gallery.listen('destroy', function () {
  //   $container.off('mousedown.gallery');
  // });
});