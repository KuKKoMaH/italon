const $contents = $('.frontSlider__content');
const $images = $('.frontSlider__image');
const $dots = $('.frontSlider__dot');

let currentSlide = 0;
const totalSlides = $contents.length;

const gotoSlider = (index) => {
  currentSlide = index;

  const $image = $images.eq(index);
  $contents.removeClass('frontSlider__content--active');
  $images.removeClass('frontSlider__image--active');
  $dots.removeClass('frontSlider__dot--active');

  $contents.eq(index).addClass('frontSlider__content--active');
  $image.addClass('frontSlider__image--active');
  $dots.eq(index).addClass('frontSlider__dot--active');

  preloadImage($image);
  let prevSlide = index - 1;
  if (prevSlide < 0) prevSlide = totalSlides - 1;
  let nextSlide = index + 1;
  if (nextSlide > totalSlides - 1) nextSlide = 0;
  preloadImage($images.eq(prevSlide));
  preloadImage($images.eq(nextSlide));
};

const preloadImage = ($image) => {
  const src = $image.data('src');
  if (src) {
    $image.css('background-image', `url(${src})`);
    $image.data('src', null);
  }
};

$('.frontSlider__prev').on('click', () => {
  let nextSlide = currentSlide - 1;
  if (nextSlide < 0) nextSlide = totalSlides - 1;
  gotoSlider(nextSlide);
});

$('.frontSlider__next').on('click', () => {
  let nextSlide = currentSlide + 1;
  if (nextSlide > totalSlides - 1) nextSlide = 0;
  gotoSlider(nextSlide);
});

$dots.on('click', (e) => gotoSlider($(e.delegateTarget).index()));

preloadImage($images.eq(0));
preloadImage($images.eq(totalSlides - 1));
preloadImage($images.eq(1));
