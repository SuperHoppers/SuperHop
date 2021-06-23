import axios from 'axios';

const TOKEN = 'token';

// ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

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

const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

// THUNK
export const fetchAllProducts = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.get('/api/products', {
      headers: {
        authorization: token,
      },
    });
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

export const createNewProduct = (newProduct, history) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/products', newProduct);
    dispatch(addNewProduct(data));
    history.push('/admin/products');
  } catch (error) {
    console.log('error creating new product thunk', error);
  }
};

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/products/${product.id}`,
        product
      );
      dispatch(_updateProduct(updated));
      history.push('/admin/products');
    } catch (error) {
      console.log('error updating product', error);
    }
  };
};

export const deleteProductThunk = (id, history) => async (dispatch) => {
  try {
    const { data: product } = await axios.delete(`/api/products/${id}`);
    dispatch(deleteProduct(product));
    history.push('/admin/products');
  } catch (error) {
    console.log('error deleting product', error);
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
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.product
        ),
      };
    default:
      return state;
  }
};

export default productsReducer;
