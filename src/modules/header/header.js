const $menu = $('.header__mobile-menu');

const $menuBtn = $('.header__menu-btn');
const $closeBtn = $('.header__menu-close');

$menuBtn.on('click', () => {
  $menu.addClass('header__mobile-menu--active');
  $menuBtn.hide();
  $closeBtn.show();
});

$closeBtn.on('click', () => {
  $menu.removeClass('header__mobile-menu--active');
  $menuBtn.show();
  $closeBtn.hide();
});

$('.header__menu > ul > li > a:not(:last-child)').on('click', (e) => {
  const $el = $(e.delegateTarget).parent();
  $el.toggleClass('header__active');
  return false;
});

const $window = $(window);
let fixed = false;
const onScroll = () => {
  const scrollTop = $window.scrollTop();
  const offset = 1;
  if (scrollTop > offset && !fixed) {
    $('header').addClass('header--fixed');
    fixed = true;
  } else if (scrollTop < offset && fixed) {
    $('header').removeClass('header--fixed');
    fixed = false;
  }
};
$window.on('scroll', onScroll);
onScroll();
