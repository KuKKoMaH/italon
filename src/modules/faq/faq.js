var styles = require('../../js/styles');

$('.' + styles.faq.question).on('click', function(e) {
  var $item = $(e.target).parent();
  if ($item.hasClass(styles.faq.item_active)) {
    $item.find('.' + styles.faq.answer).css('max-height', 0);
  } else {
    var $text = $item.find('.' + styles.faq.text);
    $item.find('.' + styles.faq.answer).css('max-height', $text.height());
  }
  $item.toggleClass(styles.faq.item_active);
});

