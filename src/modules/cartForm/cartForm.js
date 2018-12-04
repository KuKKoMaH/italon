$('.cartForm__select').selectize({});

const $fileName = $('.cartForm__file-name');
const origText = $fileName.html();
$('.cartForm__file-input').on('change', (e) => {
  const files = e.currentTarget.files;
  $fileName.html(files.length ? files[0].name : origText);
});
