import axios from 'axios';

// ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

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

const addNewProduct = (newProduct) => {
  return {
    type: ADD_NEW_PRODUCT,
    newProduct,
  };
};

const _updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
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

export const createNewProduct = (newProduct) => async (dispatch) => {
  try {
    console.log('NEWPROD IN STORE>>>', newProduct);
    const { data } = await axios.post('/api/products', newProduct);
    console.log('DATA>>>>>', data);
    dispatch(addNewProduct(data));
  } catch (error) {
    console.log('error creating new product thunk', error);
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    console.log('PROD IN STORE>>>', product);
    const { data } = axios.put(`/admin/products/${product.id}`, product);
    console.log('DATA UPDATE>>>>>', data);
    dispatch(_updateProduct(data));
    // history.push(`/admin/products`);
  } catch (error) {
    console.log('error updating a product');
  }
};

// initial state
const initialState = {
  allProducts: [],
  singleProduct: {},
  newProduct: '',
};

// REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.products };
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product };
    case ADD_NEW_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.newProduct],
        newProduct: action.newProduct,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        singleProduct: action.product,
      };
    //   return state.map((product) => {
    //     return product.id === action.product.id ? action.product : product;
    //   });
    default:
      return state;
  }
};

export default productsReducer;
