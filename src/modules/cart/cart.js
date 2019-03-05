window.INIT_CART = () => {
  $('.cart__quantity').on('blur', (e) => {
    const $el = $(e.currentTarget);
    if (window.ON_CHANGE_CART_QUANTITY) window.ON_CHANGE_CART_QUANTITY($el.parents('.cart__item'), $el.val());
  });

  $('.cart__delete').on('click', (e) => {
    const $el = $(e.currentTarget);
    if (window.ON_REMOVE_CART) window.ON_REMOVE_CART($el.parents('.cart__item'));
  });

  $('.cart__clear').on('click', (e) => {
    if (window.ON_CLEAR_CART) window.ON_CLEAR_CART();
  });
};

window.INIT_CART();