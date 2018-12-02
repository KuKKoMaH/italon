import noUiSlider from 'nouislider';

const slider = document.getElementsByClassName('catalogSidebar__slider')[0];
if (slider) {
  const $value = $('.catalogSidebar__slider-value');
  noUiSlider.create(slider, {
    start:   [2000, 4000],
    connect: true,
    step:    1,
    range:   {
      'min': 1000,
      'max': 6000
    }
  }).on('update', (value) => {
    $value.html(`от ${Math.round(value[0])} — ${Math.round(value[1])}`)
  });
}

$('.catalogSidebar__filters-button').on('click', () => {
  $('.catalogSidebar__filters').addClass('catalogSidebar__filters--active');
});

$('.catalogSidebar__filters-close').on('click', () => {
  $('.catalogSidebar__filters').removeClass('catalogSidebar__filters--active');
});
