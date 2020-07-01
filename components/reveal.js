import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Transition } from 'react-transition-group'

export default function Reveal({ children, in: inProp, pathname }) {

  const enterHandle = (node) => {
    const rects = node.getElementsByTagName('rect');
    gsap.set(rects, { y: '100vh' })
    gsap.to(rects, { stagger: 0.2, duration: 0.8, y: 0, ease: 'sine.out' })
  }

  const exitHandle = (node) => {
    // const rects = node.gjetElementsByTagName('rect');
    // gsap.to(rects, { stagger: 0.1, height: 0, duration: 1, ease: 'none' })
    // gsap.set(rects, { scaleY: 0})
    // gsap.to(rects, { scaleY: 0, duratioon: 1 })
    // gsap.to(node, {opacity: 0, duration: 1})
  }

  const rects = new Array(7).fill();
  let pix = 0;

  return (
    <>
      <Transition timeout={{ enter: 0, exit: 3000 }} in={inProp} onEnter={enterHandle} onExit={exitHandle} unmountOnExit={false}>
        <div className={`pageContainer ${pathname === '/' ? 'home' : ''}`}>
          <div className="mask">
            {children}
          </div>
          <svg viewBox="0 0 100 100" width="0" height="0">
            <defs>
              <clipPath id="clip" clipPathUnits="objectBoundingBox" transform="scale(0.01)">
                {rects.map((_, i) => {
                  pix += i % 2;
                  return (
                    <rect key={`rect_${pathname}_${i}`} x={(i * 14.25)} y="0" width={14.25} height="100" />
                  )
                })}
              </clipPath>
            </defs>
          </svg>
          <style jsx>
            {`
              .pageContainer:not(.home) {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 1;
                .mask {
                  height: 100vh;
                  pointer-events: none;
                  clip-path: url(#clip);
                }
              }
            `}
          </style>
        </div>
      </Transition>
    </>
  )

}