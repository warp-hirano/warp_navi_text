import React, { useCallback } from 'react';

function CloseMenuButton({ setMenuDisplayed }) {
  const closeMenu = useCallback(() => {
    setMenuDisplayed(false);
  }, []);

  return (
    <div
      className="close-menu"
      onClick={() => closeMenu()}
      aria-hidden="true"
    />
  );
}

export default CloseMenuButton;
