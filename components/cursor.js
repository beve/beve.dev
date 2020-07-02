import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ cursorSize = 14, growRatio = 3, hideCursor = true }) => {

  const innerCursor = useRef()
  const outerCursor = useRef()
  const outerCursorCircle = useRef()
  const target = useRef()
  let animate = false;

  const derivedCursorSize = cursorSize * growRatio;
  const derivedGrowRatio = 1 / growRatio;


  // Hide main cursor
  useEffect(() => {
    if (hideCursor) {
      document.body.style.cursor = "none";
    }
  }, [])

  // Animate follower
  useEffect(() => {

    let lastMousePos = { x: 0, y: 0 };

    const mouseMoveHandle = (e) => {

      const x = e.clientX;
      const y = e.clientY;

      gsap.to(innerCursor.current, {
        x,
        y,
        duration: 0.3,
      });
      gsap.to(outerCursor.current, {
        x: x,
        y: y,
        duration: 0.6,
      });
      if (target.current && animate) {
        gsap.to(target.current, { x: `+=${x - lastMousePos.x}`, y: `+=${(y - lastMousePos.y)}`, duration: 0.3 });
      }

      lastMousePos = { x, y }
    };
    // Event listeners
    document.addEventListener("mousemove", mouseMoveHandle);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandle);
    };
  }, [cursorSize, hideCursor, target.current]);

  useEffect(() => {
    document.querySelectorAll('[data-cursor]').forEach(function (el) {
      const cursorType = el.getAttribute('data-cursor');

      if (cursorType === 'around') {
        el.addEventListener('mouseenter', () => {
        });
        el.addEventListener('mouseleave', () => {
        });
      }
      if (cursorType === 'big') {
        el.addEventListener('mouseover', (e) => {
          // Target
          animate = true;
          // Anim
          gsap.to(innerCursor.current, { scale: growRatio, strokeWidth: '2px', fillOpacity: 0, stroke: '#e73c36', transformOrigin: 'center center', duration: 0.3 })
          gsap.to(outerCursor.current, { scale: growRatio, transformOrigin: 'center center', duration: 0.3 })
          // gsap.to(outerCursorCircle.current, { fill: 'url(#myGradient)', fillOpacity: 0.2, duration: 0.3 })
          gsap.to(outerCursorCircle.current, { fill: 'none', fillOpacity: 0.2, duration: 0.3 })
          const bounds = el.getBoundingClientRect();
          const elMidX = bounds.x + bounds.width / 2;
          const elMidY = bounds.y + bounds.height / 2;
          let newX = (elMidX > e.clientX) ? `-=${(elMidX - e.clientX) / 4}` : `+=${(e.clientX - elMidX) / 4}`;
          let newY = (elMidY > e.clientY) ? `-=${(elMidY - e.clientY) / 4}` : `+=${(e.clientY - elMidY) / 4}`;
          gsap.to(el, {
            x: newX, y: newY, duration: 0.2,
            onComplete: () => {
              if (animate) {
                target.current = el;
              }
            }
          })
        });
        el.addEventListener('mouseleave', () => {
          // Target
          target.current = null;
          animate = false;
          // Anim
          gsap.to(innerCursor.current, { scale: derivedGrowRatio, fillOpacity: 1, duration: 0.3 })
          gsap.to(outerCursor.current, { scale: derivedGrowRatio, duration: 0.3 })
          gsap.to(outerCursorCircle.current, { fill: '#000', fillOpacity: 0.1, duration: 0.3 })
          gsap.to(el, { x: 0, y: 0, duration: 0.3 })
        });
      }
    });
  }, []);

  return (
    <>
      <svg ref={innerCursor} className="innerCursor" id="innerCursor" viewBox="0 0 202 202">
        <circle r="100" cx="101" cy="101" />
      </svg>
      <svg ref={outerCursor} className="outerCursor" id="outerCursor" viewBox="0 0 202 202">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
          <filter id="filter">
            <feSpecularLighting result="specOut"
              specularExponent="20" lightingColor="#bbbbbb">
              <fePointLight x="50" y="75" z="200" />
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="specOut"
              operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
          <filter id="dilate">
            <feMorphology operator="dilate" radius="2" />
          </filter>
          <radialGradient id="myGradient">
            <stop offset="20%" stopColor="white" />
            <stop offset="100%" stopColor="#555" />
          </radialGradient>
        </defs>
        <circle ref={outerCursorCircle} r="100" cx="101" cy="101" />
      </svg>
      <style jsx>
        {`
          .innerCursor {
            position: fixed;
            z-index: 101;
            top: -${derivedCursorSize / 2}px;
            left: -${derivedCursorSize / 2}px;
            width: ${derivedCursorSize}px;
            transform: scale(${derivedGrowRatio});
            height: ${derivedCursorSize}px;
            pointer-events: none;
            circle {
              fill: #e73c36;
            }
          }
          .outerCursor {
            position: fixed;
            z-index: 100;
            top: -${derivedCursorSize / 2}px;
            left: -${derivedCursorSize / 2}px;
            width: ${derivedCursorSize}px;
            height: ${derivedCursorSize}px;
            transform: scale(${derivedGrowRatio});
            pointer-events: none;
            circle {
              fill-opacity: 0.1;
              stroke: #ccc;
              stroke-width: 2px;
              fill: #000;
            }
          }
        `}
      </style>
    </>
  );
};

export default Cursor;
