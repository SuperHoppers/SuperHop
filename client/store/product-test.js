/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { mount } from "enzyme";
import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import waitForExpect from "wait-for-expect";
import { Provider } from "react-redux";
import * as rrd from "react-router-dom";

const { MemoryRouter } = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
    products: []
};

import mockAxios from "../mock-axios";
import { setProducts, fetchAllProducts } from "../store/products";

import store from "../store/index";

import reducer from "../store/index";
import { createStore } from "redux";

const app = require("../../server/app");
// const agent = require("supertest")(app);

const { db, Product } = require("../../server/db");

const seed = require("../../script/seed");

// NOTE: Make sure you pay attention to the path below. This is where your React components should live!
// AllProducts is the default export from that module, and it is connected to Redux.
// UnconnectedAllProducts is a named export from that module, and it is NOT connected
// to Redux. We're testing BOTH of these components in here.
import AllProducts, {
    AllProducts as UnconnectedAllProducts
} from "../components/AllProducts";

import Routes from "../components/Routes";

describe("Redux", () => {
    let fakeStore;
    beforeEach(() => {
        fakeStore = mockStore(initialState);
    });

    // Check out app/redux/products.js for these two tests
    describe("set/fetch products", () => {
        xit("setProducts action creator returns a valid action", () => {
            expect(setProducts(products)).to.deep.equal({
                type: "GET_ALL_PRODUCTS",
                products
            });
        });

        xit("fetchAllProducts thunk creator returns a thunk that GETs /api/products", async () => {
            await fakeStore.dispatch(fetchAllProducts());
            const [getRequest] = mockAxios.history.get;
            expect(getRequest).to.not.equal(undefined);
            expect(getRequest.url).to.equal("/api/products");
            const actions = fakeStore.getActions();
            expect(actions[0].type).to.equal("GET_ALL_PRODUCTS");
            expect(actions[0].products).to.deep.equal(products);
        });
    });

    describe("reducer", () => {
        let testStore;
        beforeEach(() => {
            testStore = createStore(reducer);
        });

        xit("reduces on GET_ALL_PRODUCTS action", () => {
            const action = { type: "GET_ALL_PRODUCTS", products };

            const prevState = testStore.getState();
            testStore.dispatch(action);
            const newState = testStore.getState();

            expect(newState.products).to.be.deep.equal(products);
            expect(newState.products).to.not.be.equal(prevState.products);
        });
    });
});

describe("Connect: react-redux", () => {
    // This test is expecting your component to dispatch a thunk after it mounts
    // Remember that getCampuses prop from an earlier test? Now's a good time
    // for a mapDispatch.
    xit("initializes products from the server when the application loads the /products route", async () => {
        const reduxStateBeforeMount = store.getState();
        expect(reduxStateBeforeMount.products).to.deep.equal([]);
        mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/products"]}>
                    <AllProducts />
                </MemoryRouter>
            </Provider>
        );
        await waitForExpect(() => {
            const reduxStateAfterMount = store.getState();
            expect(reduxStateAfterMount.products).to.deep.equal(products);
        });
    });

    // This test is expecting your component to render the products from the
    // Redux store.  Now's a good time for a mapState.
    xit("<AllProducts /> renders products from the Redux store", async () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/products"]}>
                    <AllProducts />
                </MemoryRouter>
            </Provider>
        );
        await waitForExpect(() => {
            wrapper.update();

            const { products: reduxProducts } = store.getState();
            reduxProducts.forEach((reduxProduct) => {
                expect(wrapper.text()).to.include(reduxProducts.name);
            });
        });
    });
});
