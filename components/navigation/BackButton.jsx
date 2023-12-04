import React from 'react';
import { useRouter } from 'next/router';

const BackButton = ({ label = 'Back' }) => {
  const router = useRouter();
  return (
    <div className="back-button underlined-links">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        {label}
      </button>
    </div>
  );
};

export default BackButton;
