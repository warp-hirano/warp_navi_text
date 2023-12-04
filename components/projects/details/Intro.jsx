import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Project Top Image
 */
const Intro = ({ title, category, client }) => {
  const clientName = RichText.asText(client) ? RichText.asText(client) : '';
  const categoryName = RichText.asText(category)
    ? RichText.asText(category)
    : '';

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
        delay: i * 1,
      },
    }),
  };

  return (
    <>
      {title && (
        <LazyMotion features={domAnimation}>
          <m.h1
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            className="will-change"
          >
            {title}
          </m.h1>
        </LazyMotion>
      )}
      {clientName && (
        <div className="client">
          <LazyMotion features={domAnimation}>
            <m.h3
              custom={1.2}
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
              className="will-change"
            >
              Client
            </m.h3>
          </LazyMotion>
          <LazyMotion features={domAnimation}>
            <m.div
              className="client-name will-change"
              custom={1.4}
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
            >
              {clientName}
            </m.div>
          </LazyMotion>
        </div>
      )}
      {categoryName && (
        <div className="category">
          <LazyMotion features={domAnimation}>
            <m.h3
              custom={1.5}
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
              className="will-change"
            >
              Category
            </m.h3>
          </LazyMotion>
          <LazyMotion features={domAnimation}>
            <m.div
              className="category-name will-change"
              custom={1.6}
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
            >
              {categoryName}
            </m.div>
          </LazyMotion>
        </div>
      )}
    </>
  );
};

export default Intro;
