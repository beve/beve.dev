import { useCallback, useEffect, useRef } from 'react';

export default (callback, options = { root: null, rootMargin: '0px', threshold: 0 }) => {

  const observer = useRef(null)
  const ref = useRef(null)
  const memoCallback = useCallback(callback, [])
  const opts = useRef(options)

  useEffect(() => {

    if (typeof (memoCallback) !== 'function') {
      console.warn('useIntersection, callback not defined')
      return
    }

    if (typeof IntersectionObserver === 'function') {

      const handler = (entries) => {
        if (entries[0].isIntersecting) {
          memoCallback()
        }
      };

      const { current: o } = opts;

      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(handler, o);

      const { current: currentObserver } = observer;
      currentObserver.observe(ref.current);

      return () => {
        currentObserver.disconnect();
      };
    }

    return () => { };
  }, [memoCallback, opts]);

  return [ref, observer];
};