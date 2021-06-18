import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
const Home = () => {
  return (
    <>
      <div className="home-design">
        <h1 className="Home-header">Welcome to the Store!</h1>
        <p>What is your Superpower?</p>
        <img
          src="https://www.flintasbury.org/wp-content/uploads/2019/08/superpower.jpg"
          className="homeImg"
        />
      </div>

      <div className="home-products">
        <Link to="/products">All Products</Link>
      </div>
    </>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}
export default connect(mapState)(Home);

// /**
//  * COMPONENT
//  */
// export const Home = props => {
//   const {username} = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)
