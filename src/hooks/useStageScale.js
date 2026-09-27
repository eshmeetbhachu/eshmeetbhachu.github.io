import { useEffect, useState } from 'react';
import { STAGE } from '../constants/layout';

const getScale = () => Math.min(window.innerWidth / STAGE.width, window.innerHeight / STAGE.height);

export default function useStageScale() {
  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const onResize = () => setScale(getScale());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return scale;
}
