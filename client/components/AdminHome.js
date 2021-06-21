import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AdminHome = (props) => {
  return (
    <>
      <div className='home-design'>
        <img
          src='https://www.flintasbury.org/wp-content/uploads/2019/08/superpower.jpg'
          id='homeImg'
        />
        <div id='home-header'>
          <h1>
            Welcome to the Store
            {props.username
              ? `, Admin ${props.username}`
              : `, sneaky supervillain`}
            !
          </h1>
          <p>
            {props.username
              ? "What are your goals for today?"
              : `You can do no harm here, for this area is troll-, villain-, and Ben-resistant. \nHave fun and enjoy the aesthetics.`}
          </p>
        </div>
      </div>

      <div id='home-products'>
        <Link to='/products'>All Products</Link>
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(AdminHome);
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

/**
 * CONTAINER
 */
