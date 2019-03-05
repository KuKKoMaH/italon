import { tns } from "tiny-slider";
import Breakpoints from 'breakpoints-js';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';

const $productSliderMain = $('.productSlider__main--slider');
let currentSlider = window.CURRENT_SLIDER || 'default';
let thumbs;
let slider;

function showPopup() {
  const slider = window.PRODUCT_SLIDERS[currentSlider];
  if (!slider || !slider.length) return;
  const items = slider.map(s => ({ src: s[2], w: s[3] || 570, h: s[4] || 500 }));
  const gallery = new PhotoSwipe(
    $('.pswp')[0],
    PhotoSwipeUI_Default,
    items,
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
}

function initThumbs(isBig) {
  const $slides = $('.productSlider__thumbs-slide');
  if (!$slides.length) return;

  if (thumbs && thumbs.destroy) {
    thumbs.destroy();
    thumbs = thumbs.rebuild();
  } else {
    thumbs = tns({
      container:  $('.productSlider__thumbs--slider')[0],
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
  }
  thumbs.events.on('indexChanged', (info) => {
    const { displayIndex } = info;
    const sliderInfo = slider.getInfo();
    const index = displayIndex - 1;
    if (sliderInfo.displayIndex !== displayIndex) slider.goTo(index);
  });

  $('.productSlider__thumbs-slide').on('click', (e) => {
    slider.goTo(+e.delegateTarget.dataset.index)
    // thumbs.goTo(+e.delegateTarget.dataset.index)
  });

}

function activateThumb(index) {
  const slides = $('.productSlider__thumbs-slide');
  slides.removeClass('productSlider__thumbs-slide--active');
  slides.filter(`[data-index="${index}"]`).addClass('productSlider__thumbs-slide--active');
}

function initSlider() {

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

    if (thumbs && thumbs.getInfo) {
      const thumbsInfo = thumbs.getInfo();
      if (thumbsInfo.displayIndex !== displayIndex) thumbs.goTo(displayIndex - 1);
    }
    activateThumb(displayIndex - 1);
  };

  if (slider) {
    slider = slider.rebuild();
  } else {
    slider = tns({
      container:  $productSliderMain[0],
      items:      1,
      mouseDrag:  true,
      nav:        false,
      nextButton: '.productSlider__arrow--next',
      prevButton: '.productSlider__arrow--prev',
      onInit:     loadImage,
    });
  }

  // $('.productSlider__main-slide').on('click', (e)=> {
  //   console.log(e);
  // })

  slider.events.on('indexChanged', loadImage);
}

function destroySlider() {
  if (slider && slider.destroy) slider.destroy();
  if (thumbs && thumbs.destroy) thumbs.destroy();
}

function constructSlider(slides) {
  const $sliderContainer = $('.productSlider__main--slider');
  const $thumbsContainer = $('.productSlider__thumbs--slider');
  $sliderContainer.html('');
  $thumbsContainer.html('');
  const hasThumbs = slides.length > 1;
  if (hasThumbs) {
    $('.productSlider__thumbs').show();
  } else {
    $('.productSlider__thumbs').hide();
  }
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const template = i === 0
      ? `<div class="productSlider__main-slide" style="background-image: url(${slide[0]})"></div>`
      : `<div class="productSlider__main-slide" data-src="${slide[0]}"></div>`;
    $sliderContainer.append(template);
    if (hasThumbs) {
      $thumbsContainer.append(`<div class="productSlider__thumbs-slide" data-index="${i}"><img src="${slide[1]}" width="81" height="81"></div>`);
    }
  }
}

if ($productSliderMain.length) {
  initSlider();

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
  Breakpoints.on('small', 'enter', () => {
    if (thumbs && thumbs.destroy) thumbs.destroy();
    initThumbs(false)
  });
  Breakpoints.on('big', 'enter', () => {
    if (thumbs && thumbs.destroy) thumbs.destroy();
    initThumbs(true)
  });

  let startPosition;
  $('.productSlider__main')
    .on('mousedown', (e) => {
      startPosition = [e.clientX, e.clientY];
    })
    .on('mouseup', (e) => {
      const endPosition = [e.clientX, e.clientY];
      const distance = Math.sqrt(Math.pow(endPosition[0] - startPosition[0], 2) + Math.pow(endPosition[1] - startPosition[1], 2));
      if (distance < 5) showPopup();
    })
}

if (window.PRODUCT_SLIDERS) {
  $(window).on('changeSlider', (e, color) => {
    const name = window.PRODUCT_SLIDERS[color] ? color : 'default';
    if (name !== currentSlider) {
      const slider = window.PRODUCT_SLIDERS[name];
      currentSlider = name;
      destroySlider();
      constructSlider(slider);
      initThumbs(Breakpoints.is('big'));
      initSlider();
    }
  });
}
