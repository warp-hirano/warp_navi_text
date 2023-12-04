import React from 'react';
import { RichText } from 'prismic-reactjs';

const Clients = ({ brands }) => (
  <>
    {brands.map((brand) => {
      const name =
        brand && RichText.asText(brand.brand_name)
          ? RichText.asText(brand.brand_name)
          : '';

      return (
        <li key={name}>
          <img src={brand.brand_logo.url} alt={name} />
        </li>
      );
    })}
  </>
);

export default Clients;
