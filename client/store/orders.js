import axios from 'axios'

//action constants
const CREATE_ORDER = 'CREATE_ORDER';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHECKOUT = 'CHECKOUT';

//action creators
const newOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order
  }
}

const addProductToCart = (order) => {
  return {
    type: ADD_TO_CART,
    order
  }
}

const removeProductFromCart = (order) => {
  return {
    type: REMOVE_FROM_CART,
    order
  }
}

const closeOrder = (order) => {
  return {
    type: CHECKOUT,
    order
  }
}

//thunk creators
export const createOrder = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/orders')
      dispatch(newOrder(data))
    } catch (error) {
      console.log('error creating new order', error);
    }
  }
}

export const addToCart = (orderId,productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/orders/addToCart', {orderId: orderId,productId: productId});
      dispatch(addProductToCart(data))
    } catch (error) {
      console.log('error adding to cart', error);
    }
  }
}

export const removeFromCart = (orderId,productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/orders/removeFromCart', {orderId: orderId,productId: productId});
      dispatch(removeProductFromCart(data))
    } catch (error) {
      console.log('error removing from cart', error);
    }
  }
}

export const checkout = (orderId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put('/api/orders/checkout', {orderId: orderId})
      dispatch(closeOrder(data));
    } catch (error) {
      console.log('error checking out', error)
    }
  }
}

//initial state

const initialState = {}

//reducer

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER:
      return action.order;
    case ADD_TO_CART:
      return action.order;
    case REMOVE_FROM_CART:
      return action.order;
    default:
      return state;
  }
}

export default ordersReducer;
