import React from 'react';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Responsive Images
 */

function ResponsiveImages({ images }) {
  if (images) {
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

    return images.map((i, index) => {
      const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });
      return (
        <LazyMotion features={domAnimation} key={i.resp_image.url}>
          <m.figure
            className="img-block will-change"
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            custom={index}
          >
            <img src={i.resp_image.url} alt={i.resp_image.alt} />
            <figcaption>{i.resp_image.alt}</figcaption>
          </m.figure>
        </LazyMotion>
      );
    });

    //
  }
}

export default ResponsiveImages;
