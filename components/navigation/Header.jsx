/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable global-require */
import React, { useState } from 'react';
import NextLink from 'next/link';
import { Navigation, LanguageSwitcher } from '..';
// import Contact from '../Contact';
import Menu from './Menu';

const Header = ({ menu, altLangs, currentLang }) => {
  const [isMenuDisplayed, setMenuDisplayed] = useState(false);
  const logo = require('public/images/warp-logo-viseo.svg');

  return (
    <>
      <Menu
        isMenuDisplayed={isMenuDisplayed}
        setMenuDisplayed={setMenuDisplayed}
      />
      <Navigation
        menu={menu}
        isMenuDisplayed={isMenuDisplayed}
        setMenuDisplayed={setMenuDisplayed}
      />
      <header className="wrapper grid sp-header-wrapper" style={{ paddingRight: '3rem' }}>
        <ul className="languages">
          <LanguageSwitcher
            altLangs={altLangs}
            currentLang={currentLang}
            setMenuDisplayed={setMenuDisplayed}
          />
        </ul>
        <div className="home-menu">
          <NextLink href="/" passHref>
            <a>

              <img
                src={logo}
                alt="WarpJapan K.K."
              />
            </a>
          </NextLink>
        </div>
        <div className="start-txt">
          <p>Our services</p>
        </div>
        <div className="shopify-btn">
          <NextLink href={{ pathname: '/shopify' }} alt="">Shopify</NextLink>
        </div>
        <div className="salesforce-btn">
          <NextLink href={{ pathname: '/salesforcecommercecloud' }} alt="">Salesforce Commerce Cloud</NextLink>
        </div>
        <div className="cegid-btn">
          <NextLink href={{ pathname: '/cegid' }} alt="">Cegid</NextLink>
        </div>

      </header>
      {/* <Contact /> */}
    </>
  );
};

export default Header;
