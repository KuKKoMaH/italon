import { tns } from "tiny-slider";
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';

function showPopup(selectedEl) {
  let items = [];
  $('.productDecors__item').each((index, el) => {
    const $el = $(el);
    items.push({ src: $el.attr('href'), w: $el.data('width'), h: $el.data('height') });
  })

  // const items = slider.map(s => ({ src: s[2], w: s[3] || 570, h: s[4] || 500 }));
  const gallery = new PhotoSwipe(
    $('.pswp')[0],
    PhotoSwipeUI_Default,
    items,
    {
      index:         +$(selectedEl).data('index'),
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
}

const $decors = $('.productDecors__items');
if ($decors.length) {
  const slider = tns({
    container:    $decors[0],
    items:        1,
    slideBy:      1,
    mouseDrag:    true,
    gutter:       18,
    loop:         false,
    prevButton:   '.pagination__prev',
    nextButton:   '.pagination__next',
    navContainer: '.pagination__items',
    responsive:   {
      700: {
        items:   2,
        slideBy: 2,
      },
      991: {
        items:   5,
        slideBy: 5,
      }
    }
    // onInit:     loadImage,
  });

  $('.productDecors__item').on('click', function (e) {
    e.preventDefault();
    showPopup(this);
  })
}

$('.productDecors__buy').on('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const $item = $(e.currentTarget);
  const id = $item.data('id');
  if (window.ON_DECOR_BUY) window.ON_DECOR_BUY(id);
});