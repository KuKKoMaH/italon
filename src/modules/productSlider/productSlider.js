import { tns } from "tiny-slider";
import Breakpoints from 'breakpoints-js';

const $productSliderMain = $('.productSlider__main--slider');
if ($productSliderMain.length) {
  let thumbs;

  const initThumbs = (isBig) => {
    if (thumbs) thumbs.destroy();
    thumbs = tns({
      container:  ".productSlider__thumbs--slider",
      items:      isBig ? 4 : undefined,
      autoWidth:  !isBig,
      axis:       isBig ? 'vertical' : 'horizontal',
      mouseDrag:  true,
      gutter:     isBig ? 12 : 0,
      nav:        false,
      controls:   false,
      swipeAngle: false,
      center:     true,
      onInit:     (info) => activateThumb(info.displayIndex - 1)
    });
    thumbs.events.on('indexChanged', (info) => {
      const { displayIndex } = info;
      const sliderInfo = slider.getInfo();
      const index = displayIndex - 1;
      activateThumb(index);
      if (sliderInfo.displayIndex !== displayIndex) slider.goTo(index);
    });

    $('.productSlider__thumbs-slide').on('click', (e) => {
      thumbs.goTo(+e.currentTarget.dataset.index);
    });
  };

  const activateThumb = (index) => {
    const slides = $('.productSlider__thumbs-slide');
    slides.removeClass('productSlider__thumbs-slide--active');
    slides.filter(`[data-index="${index}"]`).addClass('productSlider__thumbs-slide--active');
  };

  const loadItem = (item) => {
    if (!item.dataset.src) return;
    item.style.backgroundImage = `url(${item.dataset.src})`;
    delete item.dataset.src;
  };

  const loadImage = (info) => {
    const { index, displayIndex, slideCount, slideItems } = info;

    let prevIndex = index - 1;
    if (prevIndex < 0) prevIndex = slideCount - 1;
    let nextIndex = index + 1;
    if (nextIndex > slideCount - 1) nextIndex = 0;

    loadItem(slideItems[index]);
    loadItem(slideItems[prevIndex]);
    loadItem(slideItems[nextIndex]);

    if (thumbs) {
      const thumbsInfo = thumbs.getInfo();
      if (thumbsInfo.displayIndex !== displayIndex) thumbs.goTo(displayIndex - 1);
    }
  };

  const slider = tns({
    container:  $productSliderMain[0],
    items:      1,
    mouseDrag:  true,
    nav:        false,
    nextButton: '.productSlider__arrow--next',
    prevButton: '.productSlider__arrow--prev',
    onInit:     loadImage,
  });
  slider.events.on('indexChanged', loadImage);

  Breakpoints({
    small: {
      min: 0,
      max: 991
    },
    // Small devices (tablets)
    big:   {
      min: 992,
      max: Infinity
    },
  });
  Breakpoints.on('small', 'enter', () => initThumbs(false));
  Breakpoints.on('big', 'enter', () => initThumbs(true));
}

