/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import ReactPlayer from 'react-player/file';

import { useLocomotiveScroll } from 'react-locomotive-scroll';

const PlayReel = ({
  videoUrl,
  isVideoPlaying,
  setIsVideoPlaying,
  setDirection,
  setIsPaused,
}) => {
  const playerRef = useRef(null);

  const { scroll } = useLocomotiveScroll();

  function closeOverlay() {
    setIsVideoPlaying(false);
    setDirection(1);
    setIsPaused(false);
    playerRef.current.seekTo(0);
    scroll.start();
    document
      .querySelectorAll('#menu-burger, header, #contact')
      .forEach((el) => {
        el.classList.remove('fade');
      });
  }

  return (
    <div
      className={`top-video-overlay ${isVideoPlaying && 'on'}`}
      // data-scroll-sticky
      // data-scroll-target="#__next"
    >
      <div className="top-video-close" onClick={closeOverlay} />
      <div className="top-video-holder">
        <ReactPlayer
          url={videoUrl}
          ref={playerRef}
          className="react-player"
          width="100%"
          height="100%"
          playing={isVideoPlaying}
        />
      </div>
    </div>
  );
};

export default PlayReel;
