import { connect } from 'react-redux';
// import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login, Signup } from "./components/AuthForm";
import Home from './components/Home';
import { me } from './store';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AdminHome from './components/Admin/AdminHome';
import Header from './components/Header';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import { Login } from './components/LoginPage';
import { Signup } from './components/SignupPage';
import CheckoutPage from './components/CheckoutPage';
import AdminProductForm from './components/Admin/AdminCreateProductForm';
import AdminUpdateProductForm from './components/Admin/AdminUpdateProductForm';
import AdminProductList from './components/Admin/AdminProductList';
import AllUsers from "./components/AllUsers";
import SingleUser from "./components/SingleUser";
import AdminOrderList from './components/Admin/AdminOrderList';

const Routes = () => {
  return (
    <Router>
      <div className="overall-view">
        <Header />
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/admin/products" component={AdminProductList} />
        <Route exact path="/admin/orders" component={AdminOrderList} />
        <Route
          exact
          path="/admin/products/:productId"
          component={AdminUpdateProductForm}
        />
        <Route
          exact
          path="/create"
          component={AdminProductForm}
        />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route exact path='/admin/users' component={AllUsers} />
        <Route path='/admin/users/:userId' component={SingleUser} />
      </Switch>
    </Router>
  );
};

export default Routes;

// /**
//  * COMPONENT
//  */
// class Routes extends Component {
//   componentDidMount() {
//     this.props.loadInitialData()
//   }

//   render() {
//     const {isLoggedIn} = this.props

//     return (
//       <div>
//         {isLoggedIn ? (
//           <Switch>
//             <Route path="/home" component={Home} />
//             <Redirect to="/home" />
//           </Switch>
//         ) : (
//           <Switch>
//             <Route path='/' exact component={ Login } />
//             <Route path="/login" component={Login} />
//             <Route path="/signup" component={Signup} />
//           </Switch>
//         )}
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))
