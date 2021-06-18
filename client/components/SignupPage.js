import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../store";

const SignupPage = (props) => {
    const { name, displayName, handleSubmit, error } = props;
    return (
        <div className="form">
            <form onSubmit={handleSubmit} name={name}>
                <ul className="form__container">
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>{error && <div>{error.response.data}</div>}</li>
                    <li>
                        <label htmlFor="username">Name:</label>
                        <input name="username" type="text" />
                    </li>
                    <li>
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="email" />
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" />
                    </li>
                    <li>
                        <button type="submit" className="primary__btn">
                            Register
                        </button>
                    </li>
                    <li>Already have an Account?</li>
                    <li>
                        <Link to="/login">
                            <button className="secondary__btn">Log In</button>
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
};

const mapSignup = (state) => {
    return {
        name: "signup",
        displayName: "Sign Up",
        error: state.auth.error
    };
};

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(evt) {
            console.log(evt);
            evt.preventDefault();
            // const formName = evt.target.name;
            const username = evt.target.username.value;
            const password = evt.target.password.value;
            const email = evt.target.email.value;
            dispatch(authenticate(username, password, "signup"));
        }
    };
};

export const Signup = connect(mapSignup, mapDispatch)(SignupPage);
