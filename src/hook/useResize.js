import {useState, useEffect} from 'react';
import {
  screenSM, screenMD
} from '../utils/constants';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width <= screenSM,
    isScreenMd: width <= screenMD,
    isScreenLg: width > screenMD,
  };
};
