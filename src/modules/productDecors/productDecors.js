import { tns } from "tiny-slider";

const slider = tns({
  container:    '.productDecors__items',
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