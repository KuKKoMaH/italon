import 'jquery';
// import 'owl.carousel';
import SmoothScroll from 'smooth-scroll';
import autosize from 'autosize';
import 'magnific-popup/dist/jquery.magnific-popup.js';
import 'jquery.maskedinput/src/jquery.maskedinput';
import 'selectize';

// import './js/$.debounce';
import './modules/header/header';
import './modules/frontSlider/frontSlider';
import './modules/catalogSidebar/catalogSidebar';
import './modules/projects/projects';
import './modules/projectSlider/projectSlider';
import './modules/productSlider/productSlider';
import './modules/productPrimary/productPrimary';
import './modules/productCharacteristics/productCharacteristics';
import './modules/productDecors/productDecors';
import './modules/map/map';
import './modules/cartForm/cartForm';

$('input[type="tel"]').mask("+7 (999) 999-99-99");

$('.popup__opener').on('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  $.magnificPopup.open({ type: 'inline', items: { src: $(e.delegateTarget).attr('href') } });
  return false;
});

autosize(document.querySelectorAll('textarea'));

new SmoothScroll('a[href*="#"]', {
  offset: () => $('header').outerHeight(),
});

window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload()
  }
};
