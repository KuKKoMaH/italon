$('.productCharacteristics__more').on('click', () => {
  $('.productCharacteristics__content').css({
    height: $('.productCharacteristics__content-inner').outerHeight(),
  })
});

const $select = $('.productCharacteristics__select');
$select.selectize({});

$select.on('change', () => {
  const size = $('#characteristics-size').val();
  const surface = $('#characteristics-surface').val();
  const $tables = $(`.productCharacteristics__item`);
  $tables.removeClass('productCharacteristics__item--active');
  const $table = $tables.filter(`[data-size="${size}"][data-surface="${surface}"]`);
  $table.addClass('productCharacteristics__item--active');
});