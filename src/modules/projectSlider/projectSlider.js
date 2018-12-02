import { tns } from "tiny-slider";
import Breakpoints from 'breakpoints-js';

const $projectSliderMain = $('.projectSlider__main--slider');
if ($projectSliderMain.length) {
  let thumbs;

  const initThumbs = (isBig) => {
    if (thumbs) thumbs.destroy();
    thumbs = tns({
      container:  ".projectSlider__thumbs--slider",
      items:      isBig ? 6 : undefined,
      autoWidth:  !isBig,
      axis:       isBig ? 'vertical' : 'horizontal',
      mouseDrag:  true,
      gutter:     isBig ? 14 : 9,
      nav:        false,
      controls:   false,
      swipeAngle: false,
    });
    thumbs.events.on('indexChanged', (info) => {
      const { displayIndex } = info;
      const sliderInfo = slider.getInfo();
      if (sliderInfo.displayIndex !== displayIndex) slider.goTo(displayIndex - 1);
    });

    $('.projectSlider__thumbs-slide').on('click', (e) => {
      thumbs.goTo(+e.currentTarget.dataset.index);
    });
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
    container:    $projectSliderMain[0],
    items:        1,
    mouseDrag:    true,
    // lazyload:         true,
    // lazyloadSelector: '.projectSlider__image',
    nextButton:   '.projectSlider__arrow--next',
    prevButton:   '.projectSlider__arrow--prev',
    navContainer: '.projectSlider__dots',
    onInit:       loadImage,
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

