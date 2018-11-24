require('selectize');
var styles = require('../../js/styles');

var $selects = $('.' + styles.city.select).selectize({
  onChange: function (value) {
    $selects.each(function () {
      if (this.selectize.getValue() !== value)
        this.selectize.setValue(value);
    });
    $('.' + styles.popup.city).val(value);
  }
});