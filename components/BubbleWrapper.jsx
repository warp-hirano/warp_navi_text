/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Bubble from 'components/Bubble';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BubbleWrapper = ({
  imgAlt,
  imgUrl,
  topTitle,
  bottomTitle,
  videoUrl,
  imgMobileUrl,
  isVideoPlaying,
  setIsVideoPlaying,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.5,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation} data-scroll-section>
      <m.div
        className={`will-change wrapper grid ${isVideoPlaying ? 'on' : ''}`}
        id="top-project"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
        data-scroll-section
      >
        <Bubble
          imgUrl={imgUrl}
          imgAlt={imgAlt}
          imgMobileUrl={imgMobileUrl}
          isVideoPlaying={isVideoPlaying}
          setIsVideoPlaying={setIsVideoPlaying}
          topTitle={topTitle}
          bottomTitle={bottomTitle}
          videoUrl={videoUrl}
        />
      </m.div>
    </LazyMotion>
  );
};

export default BubbleWrapper;
