import noUiSlider from 'nouislider';

$('.catalogSidebar__filters-button').on('click', () => {
  $('.catalogSidebar__filters').addClass('catalogSidebar__filters--active');
});

$('.catalogSidebar__filters-close').on('click', () => {
  $('.catalogSidebar__filters').removeClass('catalogSidebar__filters--active');
});

$('.catalogSidebar__filter-toggle').on('click', (e) => {
  const $title = $(e.currentTarget);
  const $filter = $title.parents('.catalogSidebar__filter');
  const $container = $filter.find('.catalogSidebar__filter-container');
  const $items = $filter.find('.catalogSidebar__filter-items');
  if ($filter.hasClass('catalogSidebar__filter--active')) {
    $container.css({ height: 0 });
    $filter.removeClass('catalogSidebar__filter--active');
  } else {
    $container.css({ height: $items.outerHeight() });
    $filter.addClass('catalogSidebar__filter--active');
  }
});

function initSlider($slider) {
  const { dataset } = $slider;
  const from = +dataset.from;
  const to = +dataset.to;
  const min = +dataset.min;
  const max = +dataset.max;

  if (Number.isNaN(from) || Number.isNaN(to) || Number.isNaN(min) || Number.isNaN(max)) return;

  const $value = $('.catalogSidebar__slider-value');
  const slider = noUiSlider.create($slider, {
    start:   [from, to],
    connect: true,
    step:    1,
    range:   {
      'min': min,
      'max': max
    }
  });
  slider.on('update', (value) => {
    $value.html(`от ${Math.round(value[0])} — ${Math.round(value[1])}`)
  });
  slider.on('change', (value) => {
    if (window.ON_CHANGE_PRICE) window.ON_CHANGE_PRICE(value);
  });
}

const slider = document.getElementsByClassName('catalogSidebar__slider')[0];
if (slider) initSlider(slider);