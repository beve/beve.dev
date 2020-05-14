import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap'

export default (options, callback) => {

  const tl = useRef(null)
  const opts = useRef(options)
  const memoCallback = useCallback(callback, []);

  useEffect(() => {

    const { current: o } = opts;

    if (typeof memoCallback !== 'function') {
      console.warn('useTimeline: No callback function defined');
      return;
    }

    tl.current = gsap.timeline(o)
    memoCallback(tl.current);

    return () => {
      tl.current.kill()
    }

  }, [opts, memoCallback])

  return tl;

}