/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { RichText } from 'prismic-reactjs';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

/**
 * Project Top Image
 */
const IntroImage = ({ image, client }) => {
  const title = RichText.asText(client) ? RichText.asText(client) : '';
  return (
    <>
      <AnimatePresence>
        <LazyMotion features={domAnimation}>
          <m.div
            className="img will-change"
            style={{ backgroundImage: `url(${image})` }}
            transition={{ duration: 0.7 }}
            initial={{ opacity: 0, visibility: 'hidden' }}
            animate={{ opacity: 1, visibility: 'visible' }}
            exit={{ opacity: 0, visibility: 'hidden' }}
            layoutId={title}
          ></m.div>
        </LazyMotion>
      </AnimatePresence>
    </>
  );
};

export default IntroImage;
