import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Project Result
 */
const Result = ({ content }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.2,
      },
    }),
  };

  if (content.length > 0) {
    return (
      <>
        <LazyMotion features={domAnimation}>
          <m.h2
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            className="bg-text will-change"
          >
            Result
          </m.h2>
        </LazyMotion>

        <div className="wrapper grid">
          <LazyMotion features={domAnimation}>
            <m.div
              className="result will-change"
              ref={ref}
              initial="hidden"
              custom={2}
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
            >
              {RichText.render(content)}
            </m.div>
          </LazyMotion>
        </div>
      </>
    );
  }
  return '';
};

export default Result;
