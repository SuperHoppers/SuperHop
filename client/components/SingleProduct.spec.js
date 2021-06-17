import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SingleProduct from './SingleProduct';

describe('SingleProduct component', () => {
  const zoolingual = {
    id: 1,
    name: 'Animal Translator',
    imageURL:
      'https://static.onecms.io/wp-content/uploads/sites/20/2017/04/talking-to-pet.jpg',
    price: 10000,
    description: 'Ever wanted to know what your pet was trying to tell you?',
  };

  const multilingual = {
    id: 2,
    name: 'Multilingual',
    imageURL:
      'https://civicreinventions.com/wp-content/uploads/2019/06/Multilingual-Image.jpeg',
    price: 15000,
    description: 'Gain the ability to talk to people from all over the world!',
  };

  it("renders a product's name, imageURL, price, and description passed in as props", () => {
    const wrapper = mount(<SingleProduct product={zoolingual} />);
    expect(wrapper).to.include.text('Animal Translator');
    expect(wrapper).to.include.text(
      'https://static.onecms.io/wp-content/uploads/sites/20/2017/04/talking-to-pet.jpg'
    );
    expect(wrapper).to.include.text(
      'Gain the ability to talk to people from all over the world!'
    );
  });

  it('renders a different name, imageURL, price, and description if passed different props', () => {
    const wrapper = mount(<SingleProduct product={multilingual} />);
    expect(wrapper).to.include.text('Multilingual');
    expect(wrapper).to.include.text(
      'https://civicreinventions.com/wp-content/uploads/2019/06/Multilingual-Image.jpeg'
    );
    expect(wrapper).to.include.text(
      'Ever wanted to know what your pet was trying to tell you?'
    );
  });
});
