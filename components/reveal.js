import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Transition } from 'react-transition-group'

export default function Reveal({ children, in: inProp, pathname }) {

  const enterHandle = (node) => {
    console.log(node)
    gsap.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 1 })
  }

  const exitHandle = (node) => {
    console.log(node)
    gsap.fromTo(node, { opacity: 1 }, { opacity: 0, duration: 1 })
  }

  return (
    <Transition timeout={0} in={inProp} onEnter={enterHandle} onExit={exitHandle}>
      <div className={`pageContainer ${pathname === '/' ? 'home' : ''}`}>
        <div>
          <div className="band">
          </div>
          {children}
        </div>
        <svg>
          <defs>
            <clipPath id="clip">
              <rect />
            </clipPath>
          </defs>
        </svg>
        <style jsx>
          {`
          .container {
            border: 2px solid red;
          }
          svg {
            display: none;
          }
          .band {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            background-color: #ccc;
            opacity: 0.8;
            clip-path: url(#clip);
          }
        `}
        </style>
      </div>
    </Transition>
  )

}