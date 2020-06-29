import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Transition } from 'react-transition-group'

export default function Reveal({ children, in: inProp, pathname }) {

  const enterHandle = (node) => {
    const rects = node.getElementsByTagName('rect');
    gsap.set(rects, { height: 0 })
    gsap.to(rects, { stagger: 0.2, height: 100, duration: 1, ease: 'none' })
  }

  const exitHandle = (node) => {
    // const rects = node.gjetElementsByTagName('rect');
    // gsap.to(rects, { stagger: 0.1, height: 0, duration: 1, ease: 'none' })
    // gsap.set(rects, { scaleY: 0})
    // gsap.to(rects, { scaleY: 0, duration: 1 })
  }

  const rects = new Array(14).fill();
  let pix = 0;

  return (
    <>
      <Transition timeout={{ enter: 0, exit: 1400 }} in={inProp} onEnter={enterHandle} appear onExit={exitHandle} unmountOnExit={true}>
        <div className={`pageContainer ${pathname === '/' ? 'home' : ''}`}>
          <div className="mask">
            {children}
          </div>
          <svg viewBox="0 0 100 100">
            <defs>
              <clipPath id="clip" clipPathUnits="objectBoundingBox" transform="scale(0.01)">
                {rects.map((_, i) => {
                  pix += i % 2;
                  console.log(pix);
                  return (
                    <rect x={(i * 7.124) } y="0" width={7.124} height="100" />
                  )
                })}
              </clipPath>
            </defs>
          </svg>
          <style jsx>
            {`
              .mask {
                height: 100vh;
                pointer-events: none;
                clip-path: url(#clip);
                background: #ccc;
              }
            `}
          </style>
        </div>
      </Transition>
    </>
  )

}