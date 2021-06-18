import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from '../store';

const LoginPage = (props) => {
  const { name, handleSubmit, error } = props;
  console.log(props);
  return (
    <div className='form'>
      <form onSubmit={handleSubmit} name={name}>
        <ul className='form__container'>
          <li>
            <h2>Sign In</h2>
          </li>
          <li>{error && <div>{error.response.data}</div>}</li>
          <li>
            <label htmlFor='username'>Username:</label>
            <input name='username' type='text' />
          </li>
          <li>
            <label htmlFor='password'>Password:</label>
            <input name='password' type='password' />
          </li>
          <li>
            <button type='submit' className='primary__btn'>
              Login
            </button>
          </li>
          <li>New to SuperHop?</li>
          <li>
            <Link to='/signup'>
              <button className='secondary__btn'>Create New Account</button>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      console.log(evt);
      evt.preventDefault();
      // const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      // const email = evt.target.email.value;
      dispatch(authenticate(username, password, 'login'));
      history.push('/');
    },
  };
};

// export default LoginPage;
export const Login = connect(mapLogin, mapDispatch)(LoginPage);
