const $more = $('.productCharacteristics__more');
$more.on('click', () => {
  if ($more.hasClass('active')) {
    $('.productCharacteristics__content').css({ height: 0, });
    $more.removeClass('active');
  } else {
    $('.productCharacteristics__content').css({
      height: $('.productCharacteristics__content-inner').outerHeight(),
    });
    $more.addClass('active');
  }
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