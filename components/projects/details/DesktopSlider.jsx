import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.css';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Desktop Slider for portfolio
 */

const sliderConfiguration = {
  type: 'carousel',
  startAt: 0,
  gap: 30,
  perView: 1.3,
  focusAt: 'center',
  // autoplay: 5000
};

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.5,
    },
  },
};

const DesktopSlider = ({ gallery }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  // Check if the first picture of the gallery has entries
  const hasPictures = Object.entries(gallery[0].desk_image).length > 0;
  const slider = new Glide('.glide', sliderConfiguration);
  useEffect(() => {
    if (hasPictures) {
      slider.mount();
    }

    return () => slider.destroy();
  }, [slider]);

  return hasPictures ? (
    <LazyMotion features={domAnimation}>
      <m.div
        className="pf-dk-slider will-change"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
      >
        <h3>Desktop</h3>
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {gallery.map((gal) => (
                <figure key={gal.desk_image.url}>
                  <img src={gal.desk_image.url} alt={gal.desk_image.alt} />
                  <figcaption>{gal.desk_image.alt}</figcaption>
                </figure>
              ))}
            </ul>
          </div>
          <div className="glide__bullets wrapper" data-glide-el="controls[nav]">
            {gallery.map((gal, i) => (
              <button
                className="glide__bullet"
                data-glide-dir={`=${i}`}
                key={`bullet-${gal.desk_image.url}`}
                aria-label="Bullet"
                type="button"
              />
            ))}
          </div>
        </div>
      </m.div>
    </LazyMotion>
  ) : (
    <></>
  );
};

export default DesktopSlider;
