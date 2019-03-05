import { tns } from "tiny-slider";

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
}

$('.productDecors__buy').on('click', (e) => {
  const $item = $(e.currentTarget);
  const id = $item.data('id');
  if(window.ON_DECOR_BUY) window.ON_DECOR_BUY(id);
});