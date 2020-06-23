import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ cursorSize = 14, hideCursor = true }) => {
  const innerCursor = useRef();
  const outerCursor = useRef();

  useEffect(() => {
    // Hide main cursor
    if (hideCursor) {
      document.body.style.cursor = "none";
    }

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
        duration: 0.5,
      });
    };
    // Event listeners
    document.addEventListener("mousemove", mouseMoveHandle);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandle);
    };
  }, [cursorSize, hideCursor]);

  useEffect(() => {
    var tl = gsap.timeline();
    document.querySelectorAll('[data-cursor]').forEach(function (el) {
      const cursorType = el.getAttribute('data-cursor');
      // if (cursorType === 'around') {
      //   el.addEventListener('mouseenter', () => {
      //     gsap.to(el, 0.3, { x: '-=3' })
      //     gsap.to(outerCursor.current, 0.8, { transform: 'scale(4)', delay: 0.5 })
      //   });
      //   el.addEventListener('mouseleave', () => {
      //     gsap.to(outerCursor.current, 0.3, { transform: 'scale(1)' })
      //     gsap.to(el, 0.8, { x: '+=3', delay: 0.5 })
      //   });
      // }
      // if (cursorType === 'big') {
      //   el.addEventListener('mouseenter', () => {
      //     tl.clear();
      //     tl.to(innerCursor.current, 0.8, { opacity: 0.4, transform: 'scale(3)', transformOrigin: 'center center' })
      //     console.log('mouse enter')
      //   });
      //   el.addEventListener('mouseleave', () => {
      //     tl.clear();
      //     tl.to(innerCursor.current, 0.8, { transform: 'scale(1)', opacity: 1, transformOrigin: 'center center' })
      //     console.log('mouse leave')
      //   });
      // }
    });
  }, []);

  return (
    <>
      <div ref={innerCursor} className="innerCursor" id="inner-cursor"></div>
      <div className="outerCursor" ref={outerCursor}></div>
      <style jsx>
        {`
          .innerCursor {
            position: fixed;
            z-index: 10;
            top: -${cursorSize / 2}px;
            left: -${cursorSize / 2}px;
            width: ${cursorSize}px;
            height: ${cursorSize}px;
            background-color: red;
            border-radius: 100%;
            opacity: 0.8;
            background-color: #e73c36;
            pointer-events: none;
          }
          .outerCursor {
            position: fixed;
            z-index: 10;
            top: -${cursorSize / 2 + 1}px;
            left: -${cursorSize / 2 + 1}px;
            width: ${cursorSize}px;
            height: ${cursorSize}px;
            background-color: rgba(255, 0, 0, 0.4);
            border-radius: 100%;
            border: 1px solid #e73c36;
            pointer-events: none;
          }
        `}
      </style>
    </>
  );
};

export default Cursor;
