$('.productCharacteristics__more').on('click', () => {
  $('.productCharacteristics__content').css({
    height: $('.productCharacteristics__content-inner').outerHeight(),
  })
});

$('.productCharacteristics__select').selectize({});