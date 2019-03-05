const $select = $('.catalogContent__sort-select');
$select.selectize({});

$select.on('change', () => {
  if (window.ON_CHANGE_SORT) window.ON_CHANGE_SORT($select.val());
});

const $available = $('#available');
$available.on('change', () => {
  if (window.ON_CHANGE_AVAILABLE) window.ON_CHANGE_AVAILABLE($available.prop('checked'));
});