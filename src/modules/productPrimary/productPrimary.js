const $colors = $('.productPrimary__color');

$colors.on('click', (e) => {
  $colors.removeClass('productPrimary__color--active');
  $(e.currentTarget).addClass('productPrimary__color--active');
});

$('.productPrimary__variant').on('click', (e) => {
  const $el = $(e.currentTarget);
  const $parent = $el.parents('.productPrimary__variants');
  const $variants = $parent.find('.productPrimary__variant');
  $variants.removeClass('productPrimary__variant--active');
  $el.addClass('productPrimary__variant--active');
});