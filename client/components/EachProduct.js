//check routes and filenames

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const EachProduct = (props) => {
  //const thisProduct = props.product;
  const thisProduct = {
    name: 'Explody Bugs',
    price: 900,
    id: 7,
    imageURL:
      'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c2/OoT_Bombchu_Render.png',
  };

  return (
    <div className='listViewDiv'>
      <img src={thisProduct.imageURL} className='picListView' />
      <div className='listViewDiv namePrice'>
        <div>
          <Link to={`/products/${thisProduct.id}`}>
            <h3>{thisProduct.name}</h3>
          </Link>
        </div>
        <div>
          <h4>{thisProduct.price}</h4>
        </div>
      </div>
    </div>
  );
};
