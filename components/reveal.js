import React, { useEffect } from 'react'
import gsap from 'gsap'

export default function Reveal() {

  useEffect(() => {
    const tl = gsap.timeline()
    // tl.to('rect', { width: '100vw', height: '100vh', duration: 3.5})
  }, [])

  return (
    <>
      <svg>
        <defs>
          <clipPath id="clip">
            <rect />
          </clipPath>
        </defs>
      </svg>
      <div className="band">
      </div>
      <style jsx>
        {`
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
    </>
  )

}