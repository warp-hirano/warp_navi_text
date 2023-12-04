import { useEffect, useState } from 'react';

function useShouldLoadDistortion() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const timerFunc = setInterval(() => {
      if (typeof window !== 'undefined') {
        if (window.matchMedia('(min-device-width: 768px)').matches) {
          setIsLargeScreen(true);
        }

        clearInterval(timerFunc);
      }
    }, 1000);

    return () => clearInterval(timerFunc);
  }, []);

  return isLargeScreen;
}

export default useShouldLoadDistortion;
