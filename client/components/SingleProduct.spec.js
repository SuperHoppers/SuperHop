/* global describe beforeEach it */

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
    price: 10000,
    description: 'Gain the ability to talk to people from all over the world!',
  };
});
