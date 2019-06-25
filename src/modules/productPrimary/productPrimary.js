const $colors = $('.productPrimary__color');

function getFilters() {
  const result = {};
  const $items = $('.productPrimary__variant--active, .productPrimary__color--active');
  $items.each((i, item) => {
    const { type, id } = item.dataset;
    if (!type || !id) return;
    result[type] = id;
  });
  return result;
}

function updatePrice() {
  if (window.RECALC_PRICE) {
    const newPrice = window.RECALC_PRICE(getFilters());
    $('.productPrimary__price').html(newPrice);
  }
}

$colors.on('click', (e) => {
  const $el = $(e.currentTarget);
  $colors.removeClass('productPrimary__color--active');
  $el.addClass('productPrimary__color--active');
  $(window).trigger('changeSlider', $el.data('id'));
  updatePrice();
});

$('.productPrimary__variant').on('click', (e) => {
  const $el = $(e.currentTarget);
  const $parent = $el.parents('.productPrimary__variants');
  const $variants = $parent.find('.productPrimary__variant');
  $variants.removeClass('productPrimary__variant--active');
  $el.addClass('productPrimary__variant--active');
  updatePrice();
});

$('.productPrimary__buy').on('click', (e) => {
  if (window.ON_PRODUCT_BUY) window.ON_PRODUCT_BUY(getFilters());
});

if ($colors.length) {
  const $preview = $("<div class='preview'><img src='' alt='Image preview' /></div>");
  $("body").append($preview);
  let previewActive = false;
  let x = 0;
  let y = 0;
  let width = 0;
  let height = 0;
  const positionatePreview = () => {
    let transform = '';
    if (x + width + 12 > window.innerWidth) {
      transform = `translate3d(${x - width}px, ${y}px, 0)`
    } else {
      transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    $preview.css('transform', transform);
  };

  $(window).mousemove((e) => {
    x = e.pageX;
    y = e.pageY;
    if (previewActive) positionatePreview();
  });

  $colors.hover(
    function (e) {
      const $el = $(this);
      width = $el.data('width');
      height = $el.data('height');
      $preview.find('img')
        .attr('src', $el.data('preview'))
        .css({ width, height, });
      $preview.addClass('preview--active');
      previewActive = true;
      positionatePreview();
    },
    function () {
      $preview.removeClass('preview--active');
      previewActive = false;
    });
}