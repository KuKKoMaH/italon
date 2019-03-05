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
  if(window.ON_PRODUCT_BUY) window.ON_PRODUCT_BUY(getFilters());
});