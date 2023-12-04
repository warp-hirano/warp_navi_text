import React from 'react';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import ReactPlayer from 'react-player/file';

const Video = ({ videoSource, thumbnail, isBreakpoint }) => {
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

  return videoSource !== undefined && 'url' in videoSource ? (
    <LazyMotion features={domAnimation}>
      <m.div
        className="video-holder will-change"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
      >
        <ReactPlayer
          url={videoSource.url}
          className="react-player"
          width="100%"
          height="100%"
          light={isBreakpoint ? thumbnail : false}
          playing={!isBreakpoint}
          controls
          volume={0}
          muted
        />
      </m.div>
    </LazyMotion>
  ) : (
    ''
  );
};

export default Video;
