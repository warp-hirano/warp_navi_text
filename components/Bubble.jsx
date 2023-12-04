/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { RichText } from 'prismic-reactjs';
import Lottie from 'react-lottie';
import animationData from 'public/anim/waves';

import { useLocomotiveScroll } from 'react-locomotive-scroll';
// import PlayReel from './PlayReel';
import dynamic from 'next/dynamic';
// import ReactPlayer from 'react-player/file';
const PlayReel = dynamic(() => import('./PlayReel'), {
  ssr: false,
});

const defaultOptions = {
  loop: false,
  isStopped: false,
  isPaused: false,
  renderer: 'svg',
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Bubble = ({
  imgUrl,
  imgMobileUrl,
  imgAlt,
  isVideoPlaying,
  setIsVideoPlaying,
  topTitle,
  bottomTitle,
  videoUrl,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [direction, setDirection] = useState(1);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { scroll } = useLocomotiveScroll();

  const buttonDimensions = { width: 110, height: 110 };

  const bubbleImage = imgUrl || './images/cbdays.png';
  const bubbleAlt = imgAlt || 'Welcome to WarpJapan';
  const bubbleMobileImage = imgMobileUrl || './images/cbdays.png';

  const playReelButtonRef = useRef(null);
  const imageRef = useRef(null);

  const topText = RichText.render(topTitle) ? RichText.render(topTitle) : '';
  const bottomText = RichText.render(bottomTitle)
    ? RichText.render(bottomTitle)
    : '';

  useEffect(() => {
    const timerFunc = setTimeout(() => {
      setIsStopped(false);
    }, 1000);

    setImageDimensions({
      width: imageRef.current.width,
      height: imageRef.current.height,
    });
    return () => clearTimeout(timerFunc);
  }, []);

  const bindMouseMove = (e) => {
    /* We use the image dimensions and button dimensions to be sure that the play reel button
     doesn't move outside of the bubble on mouse move */
    const y =
      e.clientY - e.target.getBoundingClientRect().top >
      imageDimensions.height - buttonDimensions.height
        ? imageDimensions.height - buttonDimensions.height
        : e.clientY - e.target.getBoundingClientRect().top;
    const x =
      e.clientX - e.target.getBoundingClientRect().left >
      imageDimensions.width - buttonDimensions.width
        ? imageDimensions.width - buttonDimensions.width
        : e.clientX - e.target.getBoundingClientRect().left;
    playReelButtonRef.current.style.top = `${y}px`;
    playReelButtonRef.current.style.left = `${x}px`;
  };

  return (
    <div className="bubble">
      <div className="intro-text grid" id="top-title">
        {topText}
      </div>
      <div className="intro-text grid" id="bottom-title">
        {bottomText}
      </div>
      <div className="liquid-anim">
        <Lottie
          options={defaultOptions}
          isStopped={isStopped}
          isPaused={isPaused}
          direction={direction}
        />
      </div>
      <picture
        ref={imageRef}
        className="bubble-img"
        onClick={() => {
          // Stop the scroll to avoid problems with fixed positionning
          // and matric transforms used by Locomotive library
          scroll.stop();
          setDirection(-1);
          setTimeout(() => {
            setIsVideoPlaying(true);
            setIsPaused(true);
          }, 1500);
          // We need to hide the header components when video is playing to avoid weird layout
          document
            .querySelectorAll('#menu-burger, header, #contact')
            .forEach((el) => {
              el.classList.add('fade');
            });
        }}
        onMouseMove={bindMouseMove}
      >
        <source srcSet={bubbleImage} media="(min-width:768px)" />
        <source srcSet={bubbleMobileImage} />
        <img src={bubbleMobileImage} alt={bubbleAlt} />
      </picture>
      <div className="play-reel-button" ref={playReelButtonRef} />
      <PlayReel
        videoUrl={videoUrl}
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
        setDirection={setDirection}
        setIsPaused={setIsPaused}
      />
    </div>
  );
};

export default Bubble;
