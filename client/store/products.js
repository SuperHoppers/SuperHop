import axios from 'axios';

// ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

// ACTION CREATORS
const setProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products,
  };
};

const setSingleProducts = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

// THUNK
export const fetchAllProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (error) {
    console.log('error fetching all products', error);
  }
};

export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(setSingleProducts(data));
  } catch (error) {
    console.log('error fetching single product', error);
  }
};

// initial state
const initialState = {
  allProducts: [],
  singleProduct: {},
};

// REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.products };
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product };
    default:
      return state;
  }
};

export default productsReducer;
