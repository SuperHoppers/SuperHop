import axios from 'axios'

//action constants
const CREATE_ORDER = 'CREATE_ORDER';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHECKOUT = 'CHECKOUT';
const SET_ORDER = 'SET_ORDER';
const GET_OPEN_CART = 'GET_OPEN_CART'
const GUEST_CHECKOUT = 'GUEST_CHECKOUT'

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

const increaseQuant = (order) => {
  return {
    type: INCREASE_QUANT,
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

const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order
  }
}

const getOpenCart = (items) => {
  return {
    type: GET_OPEN_CART,
    items
  }
}

const guestCheck = (order) => {
  return {
    type: GUEST_CHECKOUT,
    order
  }
}

//thunk creators
export const createOrder = (productId, userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/orders/newOrder', {productId:productId, userId: userId})
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

export const increaseQuantity = (orderId,productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/orders/increaseQuant', {orderId: orderId,productId: productId});
      dispatch(increaseQuant(data))
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

export const fetchOrder = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/orders/users/${userId}`);
      dispatch(setOrder(data));
    } catch (error) {
      console.log('error fetching order', error);
    }
  }
}

export const fetchOpenCart = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/orders/users/${userId}/openCart`);
      console.log('data inside thunk', data)
      dispatch(getOpenCart(data));
    } catch (error) {
      console.log('error fetching open order', error);
    }
  }
}
export const guestCheckout = (cart) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/orders/guestCheckout', cart)
      dispatch(guestCheck(data))
    } catch (error) {
      console.log('error in guest checkout', error)
    }
  }
}
//initial state

const initialState = { order: {}, cartItems: []}

//reducer

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER:
      return {...state, order: action.order};
    case ADD_TO_CART:
      return {...state, order: action.order};
    case REMOVE_FROM_CART:
      return {...state, order: action.order};
    case SET_ORDER:
      return {...state, order: action.order};
    case CHECKOUT:
      return {...state, order: action.order};
    case GUEST_CHECKOUT:
      return {...state, order: {}};
    case GET_OPEN_CART:
      return {...state, cartItems: [action.items]};
    default:
      return state;
  }
}

export default ordersReducer;
