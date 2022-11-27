import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from "./../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
