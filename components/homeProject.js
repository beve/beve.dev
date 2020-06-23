import React, { useRef } from "react";
import gsap from "gsap";

export default ({ style, name, illustration, logo }) => {
  const maskRef = useRef(null);
  const logoRef = useRef(null);

  const timeline = useRef(gsap.timeline());

  const handleMouseEnter = (e) => {
    const tl = timeline.current;
    tl.clear();
    const el = maskRef.current;
    const { top, left, height } = el.parentNode.getBoundingClientRect();
    const scale = height / 8; // 12 is half cursor size
    gsap.set(el, { x: e.clientX - left, y: e.clientY - top, opacity: 0.9 });
    gsap.set("#inner-cursor", { visibility: "hidden" });
    tl.fromTo(el, { scale: 0 }, { scale, duration: 0.5 });
    tl.to(logoRef.current, 0.3, { opacity: 1 }, '<0.1');
  };

  const handleMouseLeave = (e) => {
    const tl = timeline.current;
    tl.clear();
    const el = maskRef.current;
    const { top, left } = el.parentNode.getBoundingClientRect();
    gsap.set(el, { x: e.clientX - left, y: e.clientY - top, opacity: 0.9 });
    gsap.set("#inner-cursor", { visibility: "visible" });
    tl.to(el, 0.5, { scale: 0 });
    tl.to(logoRef.current, 0.3, { opacity: 0 }, '<');
  };

  const handleClick = () => {
    gsap.to("#inner-cursor", 0.5, { visibility: "visible" });
  };

  return (
    <>
      <div className="homeProject" style={style}>
        <div
          tabIndex={0}
          role="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleClick}
          onClick={handleClick}
        >
            <img src={illustration} className="illustration" />
            <img ref={logoRef} src={logo} className="logo" />
            <b><span ref={maskRef}></span></b>
        </div>
        <div className="name">{name}</div>
      </div>
      <style jsx>
        {`
          .homeProject {
            position: relative;

            .illustration {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .logo {
              position: absolute;
              z-index: 1;
              width: 60%;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              opacity: 0;
            }

            b {
              position: absolute;
              top: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              pointer-events: none;
              span {
                display: block;
                position: absolute;
                top: -12px;
                left: -12px;
                opacity: 0;
                background-color: #e73c36;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                pointer-events: none;
              }
            }

            .name {
              position: absolute;
              left: 0;
              right: 0;
              bottom: -80px;
              text-align: center;
              font-weight: bold;
              font-size: 1.85em;
              opacity: 1;
              pointer-events: none;
            }
          }
        `}
      </style>
    </>
  );
};
