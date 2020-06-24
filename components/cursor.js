import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ cursorSize = 14, growRatio = 3, hideCursor = true }) => {

  const innerCursor = useRef()
  const outerCursor = useRef()
  const outerCursorCircle = useRef()
  const target = useRef()

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
      if (target.current) {
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
          // Anim
          gsap.to(innerCursor.current, { scale: 0, transformOrigin: 'center center', duration: 0.3 })
          gsap.to(outerCursor.current, { scale: growRatio, fillOpacity: 0, transformOrigin: 'center center', duration: 0.3 })
          gsap.to(outerCursorCircle.current, { fillOpacity: 0, duration: 0.3 })
          const newX = (e.clientX - el.getBoundingClientRect().x) / 4;
          const newY = (e.clientY - el.getBoundingClientRect().y) / 6;
          gsap.to(el, {
            x: `+=${newX}`, y: `+=${newY}`, duration: 0.2, 
            onComplete: () => {
              target.current = el;
            }
          })
        });
        el.addEventListener('mouseleave', () => {
          // Target
          target.current = null;
          // Anim
          gsap.to(innerCursor.current, { scale: derivedGrowRatio, duration: 0.3 })
          gsap.to(outerCursor.current, { scale: derivedGrowRatio, fillOpacity: 1, duration: 0.3 })
          gsap.to(outerCursorCircle.current, { fillOpacity: 0.3, duration: 0.3 })
          gsap.to(el, { x: 0, y: 0, duration: 0.3 })
        });
      }
    });
  }, []);

  return (
    <>
      <svg ref={innerCursor} className="innerCursor" viewBox="0 0 202 202">
        <circle r="100" cx="101" cy="101" />
      </svg>
      <svg ref={outerCursor} className="outerCursor" viewBox="0 0 202 202">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
        <circle ref={outerCursorCircle} r="100" cx="101" cy="101" />
      </svg>
      <style jsx>
        {`
          .innerCursor {
            position: fixed;
            z-index: 100;
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
            top: -${derivedCursorSize / 2 + 1}px;
            left: -${derivedCursorSize / 2 + 1}px;
            width: ${derivedCursorSize}px;
            height: ${derivedCursorSize}px;
            transform: scale(${derivedGrowRatio});
            pointer-events: none;
            circle {
              fill-opacity: 0.3;
              stroke: #e73c36;
              fill: #e73c36;
            }
          }
        `}
      </style>
    </>
  );
};

export default Cursor;
