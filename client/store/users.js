import axios from "axios";

// ACTION TYPES
const GET_ALL_USERS = "GET_ALL_USERS";
const GET_SINGLE_USER = "GET_SINGLE_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";
const GET_OPEN_ORDER_ID = "GET_OPEN_ORDER_ID";

// ACTION CREATORS
const setUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const setSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};

const updateSingleUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const deleteSingleUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

const setOpenOrderId = (userCart) => {
  return {
    type: GET_OPEN_ORDER_ID,
    userCart,
  };
};

// THUNK
export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users/admin");
    dispatch(setUsers(data));
  } catch (error) {
    console.log("error fetching all users", error);
  }
};

export const fetchSingleUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}/admin`);
    dispatch(setSingleUser(data));
  } catch (error) {
    console.log("error fetching single user", error);
  }
};

export const updateUser = (userId, history) => async (dispatch) => {
  try {
    const { data: updated } = await axios.put(`api/users/${userId}`);
    dispatch(updateSingleUser(updated));
    history.push("/users");
  } catch (error) {
    console.log("Error updating user");
  }
};

export const deleteUser = (userId, history) => {
  return async (dispatch) => {
    const { data: user } = await axios.delete(`/api/users/${userId}`);
    dispatch(deleteSingleUser(user));
    history.push("/users");
  };
};

export const fetchUserCart = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}/cart`);
    dispatch(setOpenOrderId(data));
  } catch (error) {
    console.log("error fetching single user", error);
  }
};

// initial state
const initialState = {
  allUsers: [],
  singleUser: {},
  cartId: "",
};

// REDUCER
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.users };
    case GET_SINGLE_USER:
      return { ...state, singleUser: action.user };
    case UPDATE_USER:
      return { ...state, user: action.user };
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => {
          return user.id !== action.user.id;
        }),
      };
    case GET_OPEN_ORDER_ID:
      return { ...state, cartId: action.userCart };
    default:
      return state;
  }
};

export default usersReducer;
