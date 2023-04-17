import { useState, useEffect } from 'react';

interface IUseWindowWidth {
  windowWidth: number | undefined;
}

export function useWindowWidth(): IUseWindowWidth {
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowWidth };
}
