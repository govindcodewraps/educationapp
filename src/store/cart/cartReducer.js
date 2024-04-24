import {STORE_CART, EMPTY_CART} from './cartActionType';

const initialState = {
  cart: [],
  cartId: [],
  cartVariants: [],
  cartCount: 0,
  subTotal: 0,
  // tax: 0,
  shipping: 0,
  grandTotal: 0,
  cartQuantity: 0,
};

const cartReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case STORE_CART:
      return {
        ...state,
        cart: payload.cart.cart,
        cartId: payload.cart.cartId,
        cartVariants: payload.cart.cartVariants,
        cartCount: payload.cart.cartCount,
        subTotal: payload.cart.subTotal,
        shipping: payload.cart.shipping,
        grandTotal: payload.cart.grandTotal,
        cartQuantity: payload.cart.cartQuantity,
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
        cartId: [],
        cartVariants: [],
        cartCount: 0,
        subTotal: 0,
        shipping: 0,
        grandTotal: 0,
        cartQuantity: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
