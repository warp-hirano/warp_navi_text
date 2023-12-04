import React, { useEffect, useState } from 'react';
import { DistortionText } from 'react-text-fun';
import Head from 'next/head';

const Distortion = () => {
  const [isBlotterLoaded, setIsBlotterLoaded] = useState(false);
  useEffect(() => {
    const timerFunc = setInterval(() => {
      if (window.Blotter !== undefined) {
        setIsBlotterLoaded(true);
        clearInterval(timerFunc);
      }
    }, 1000);

    return () => clearInterval(timerFunc);
  }, []);

  return (
    <>
      <Head>
        <script src="/js/blotter.min.js" id="blotter-js" defer />
      </Head>

      {isBlotterLoaded && (
        <>
          <DistortionText
            text="Borderless"
            fontSize={180}
            fontFamilly="roc-grotesk"
            fontWeight={300}
            noiseAmplitude={0.07}
            // noiseVolatility={1.2}
          />
          <DistortionText
            text="Digital"
            fontSize={180}
            fontFamilly="roc-grotesk"
            fontWeight={300}
            noiseAmplitude={0.07}
          />
          <DistortionText
            text="Experience"
            fontSize={180}
            fontFamilly="roc-grotesk"
            fontWeight={300}
            noiseAmplitude={0.07}
          />
        </>
      )}
    </>
  );
};
export default Distortion;
