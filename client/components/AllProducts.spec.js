import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
//import sinon from 'sinon';
//import configureMockStore from 'redux-mock-store';
//import thunkMiddleware from 'redux-thunk';
//import waitForExpect from 'wait-for-expect';
//import { Provider } from 'react-redux';
//import * as rrd from 'react-router-dom';
//import store from '../store';

//const { MemoryRouter } = rrd;

//const middlewares = [thunkMiddleware];
//const mockStore = configureMockStore(middlewares);
//const initialState = {
//  products: [],
//};

import { fetchAllProducts } from '../store/products';

import AllProducts from './AllProducts';

const supernose = {
  id: 1,
  name: 'SuperNose',
  description: 'Worst superpower ever',
  price: '.10',
  imageURL:
    'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c2/OoT_Bombchu_Render.png',
};

const powers = [
  {
    id: '1',
    name: 'SuperNose',
    description: 'Worst superpower ever',
    price: '.10',
    imageURL:
      'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c2/OoT_Bombchu_Render.png',
  },
  {
    id: '2',
    name: 'SuperGreasy',
    description: 'Second worst superpower ever',
    price: '.20',
    imageURL:
      'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c2/OoT_Bombchu_Render.png',
  },
  {
    id: '3',
    name: 'Forever Young',
    description:
      'Would be better if young did not mean specifically 3 years old, but it is still pretty nice',
    price: '700',
    imageURL:
      'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c2/OoT_Bombchu_Render.png',
  },
];

it('renders the campuses passed in as props', () => {
  const wrapper = mount(
    <AllProducts
      products={powers}
      // getCampuses={getCampusesSpy}
    />
  );
  expect(wrapper.text()).to.include('SuperGreasy');
  expect(wrapper.text()).to.include('SuperNose');
  const images = wrapper.find('img').map((node) => node.get(0).props.src);
  expect(images).to.include.members([
    'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c2/OoT_Bombchu_Render.png',
  ]);
});

it('renders DIFFERENT products passed in as props', () => {
  const wrapper = mount(
    <AllProducts
      products={[supernose]}
      // getCampuses={getCampusesSpy}
    />
  );
  expect(wrapper.text()).to.not.include('Forever Young');
});

describe('AllProducts view', () => {
  it('renders a superpower name, image, and price passed in as state', () => {
    const wrapper = mount(<AllProducts />);
    expect(wrapper).to.include.text('Supernose');
    expect(wrapper).to.include.text('.20');
  });

  it('renders a list of products', () => {
    const wrapper = mount(<AllProducts />);
    expect(wrapper).to.include.text('Forever Young');
    expect(wrapper).to.include.text('700');
    expect(wrapper).to.include.text('SuperNose');
    expect(wrapper).to.include.text('SuperGrease');
  });
});

// describe('Connect: react-redux', () => {

//   it('initializes products from the server when the application loads the /products route', async () => {
//     const reduxStateBeforeMount = store.getState();
//     expect(reduxStateBeforeMount.allProducts).to.deep.equal([]);
//     mount(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/allProducts']}>
//           <AllProducts />
//         </MemoryRouter>
//       </Provider>
//     );
//     await waitForExpect(() => {
//       const reduxStateAfterMount = store.getState();
//       expect(reduxStateAfterMount.allProducts).to.deep.equal(powers);
//     });
//   });

//   it('<AllProducts /> renders campuses from the Redux store', async () => {
//     const wrapper = mount(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/campuses']}>
//           <AllProducts />
//         </MemoryRouter>
//       </Provider>
//     );
//     await waitForExpect(() => {
//       wrapper.update();

//       const { campuses: reduxCampuses } = store.getState();
//       reduxCampuses.forEach((reduxCampus) => {
//         expect(wrapper.text()).to.include(reduxCampus.name);
//       });
//     });
//   });
// });
