import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ cursorSize = 180, hideCursor = true }) => {
  const innerCursor = useRef();
  const outerCursor = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const lockOuter = useRef(false);
  // const hovered = useRef(false)
  const cursorInnerRatio = 0.145;
  const cursorInnerRatioBig = 0.435;
  const cursorOuterSize = cursorSize * cursorInnerRatioBig;
  const bigCursorTL = gsap.timeline({
    paused: true,
    defaults: { ease: "linear" },
  });
  const outerCursorTL = gsap.timeline({
    paused: true,
    defaults: { ease: "linear" },
  });

  useEffect(() => {
    // Hide main cursor
    if (hideCursor) {
      document.body.style.cursor = "none";
    }
    // Main loop
    const renderCursor = () => {
      // Set inner cursor position
      const { x: mouseX, y: mouseY } = mousePosition.current;
      gsap.set(innerCursor.current, {
        x: mouseX,
        y: mouseY,
      });
      if (!lockOuter.current) {
        gsap.set(outerCursor.current, {
          x: mouseX,
          y: mouseY,
        });
      }
      // if (hovered.current) {
      //   gsap.set(outerCursor.current, {
      //     x: `-=${cursorOuterSize / 2 - cursorSize / 2 + 1}`,
      //     y: `-=${cursorOuterSize / 2 - cursorSize / 2 + 1}`,
      //   })
      // }
      // }
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);
    // set event listeners
    const setMousePosition = (e) => {
      mousePosition.current = {
        x: e.clientX - cursorSize / 2,
        y: e.clientY - cursorSize / 2,
      };
    };
    // Event listeners
    document.addEventListener("mousemove", setMousePosition);
    return () => {
      document.removeEventListener("mousemove", setMousePosition);
    };
  }, [cursorSize, hideCursor, cursorOuterSize]);

  useEffect(() => {
    bigCursorTL.fromTo(
      innerCursor.current,
      {
        scale: cursorInnerRatio,
        opacity: 1,
      },
      {
        duration: 0.2,
        scale: cursorInnerRatioBig,
        opacity: 0.3,
      }
    );
    const surroundItem = (e) => {
      bigCursorTL.play();
    };
    const leaveItem = (e) => {
      // hovered.current = false
      bigCursorTL.reverse();
    };
    // Foreach links
    document.querySelectorAll('[data-cursor="big"]').forEach((item) => {
      item.addEventListener("mouseenter", surroundItem);
      item.addEventListener("mouseleave", leaveItem);
    });
  }, [bigCursorTL, outerCursorTL, cursorOuterSize]);

  useEffect(() => {
    outerCursorTL.fromTo(
      innerCursor.current,
      {
        scale: cursorInnerRatio,
        opacity: 1,
      },
      {
        duration: 0.3,
        scale: cursorInnerRatioBig,
        opacity: 0.1,
      }
    );
    const surroundItem = (e) => {
      const el = e.target;
      const { top, left, width, height } = el.getBoundingClientRect();
      const size = Math.max(width, height);
      gsap.to(outerCursor.current, 0.3, {
        x: left + width / 2 - cursorSize / 2,
        y: top + height / 2 - cursorSize / 2,
      });
      outerCursorTL.fromTo(
        outerCursor.current,
        {
          height: cursorSize,
          width: cursorSize,
          opacity: 0,
          scale: cursorInnerRatio,
        },
        {
          duration: 0.3,
          opacity: 1,
          scale: (cursorInnerRatioBig * size) / 130,
        },
        "<"
      );
      lockOuter.current = true;
      outerCursorTL.play();
    };
    const leaveItem = (e) => {
      outerCursorTL.reverse();
      lockOuter.current = false;
    };
    // Foreach links
    document.querySelectorAll('[data-cursor="around"]').forEach((item) => {
      item.addEventListener("mouseenter", surroundItem);
      item.addEventListener("mouseleave", leaveItem);
    });
  }, [bigCursorTL, outerCursorTL, cursorSize]);

  return (
    <>
      <div ref={innerCursor} className="innerCursor" id="inner-cursor"></div>
      <div className="outerCursor" ref={outerCursor}></div>
      <style jsx>
        {`
          .innerCursor {
            position: fixed;
            z-index: 100000;
            top: 0;
            left: 0;
            width: ${cursorSize}px;
            height: ${cursorSize}px;
            border-radius: 50%;
            background-color: #e73c36;
            pointer-events: none;
          }
          .outerCursor {
            position: fixed;
            z-index: 100000;
            top: 0;
            left: 0;
            opacity: 0;
            width: ${cursorOuterSize}px;
            height: ${cursorOuterSize}px;
            background-color: red;
            border-radius: 50%;
            border: 1px solid #e73c36;
            pointer-events: none;
            background-color: transparent;
          }
        `}
      </style>
    </>
  );
};

export default Cursor;
