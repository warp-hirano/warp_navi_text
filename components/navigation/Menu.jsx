/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from 'public/anim/burger-menu';

const defaultOptions = {
  loop: false,
  isStopped: true,
  renderer: 'svg',
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Menu = ({ isMenuDisplayed, setMenuDisplayed }) => {
  const [isStopped, setIsStopped] = useState(true);
  const [direction, setDirection] = useState(1);
  const [isBeingHovered, setIsBeingHovered] = useState(false);

  const handleMenu = () => {
    setMenuDisplayed(!isMenuDisplayed);
  };

  useEffect(() => {
    if (!isMenuDisplayed && !isBeingHovered) {
      setDirection(-1);
      setIsStopped(false);
    }
  }, [isMenuDisplayed]);

  const handleBurgerHover = () => {
    setIsBeingHovered(true);
    if (!isMenuDisplayed) {
      setDirection(1);
      setIsStopped(false);
    }
  };

  const handleBurgerOut = () => {
    setIsBeingHovered(false);
    if (!isMenuDisplayed) {
      setIsStopped(false);
      setDirection(-1);
    }
  };

  return (
    <div
      onClick={handleMenu}
      onMouseEnter={handleBurgerHover}
      onMouseLeave={handleBurgerOut}
      id="menu-burger"
    >
      <Lottie
        options={defaultOptions}
        height={16}
        isStopped={isStopped}
        direction={direction}
      />
    </div>
  );
};

export default Menu;
