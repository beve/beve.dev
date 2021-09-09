import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "./homeProject.module.scss";

export default ({ style, name, illustration, logo, slug }) => {
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
    gsap.set("#innerCursor", { visibility: "hidden" });
    gsap.set("#outerCursor", { visibility: "hidden" });
    tl.fromTo(el, { scale: 1 }, { scale, duration: 0.3, ease: "power1.in" });
    tl.to(logoRef.current, 0.3, { opacity: 1 }, "<0.05");
  };

  const handleMouseLeave = (e) => {
    const tl = timeline.current;
    tl.clear();
    const el = maskRef.current;
    const { top, left } = el.parentNode.getBoundingClientRect();
    gsap.set(el, { x: e.clientX - left, y: e.clientY - top, opacity: 0.9 });
    gsap.set("#innerCursor", { visibility: "visible" });
    gsap.set("#outerCursor", { visibility: "visible" });
    tl.to(el, 0.5, { scale: 0 });
    tl.to(logoRef.current, 0.3, { opacity: 0 }, "<");
  };

  const handleClick = () => {
    gsap.to("#innerCursor", 0.5, { visibility: "visible" });
    gsap.set("#outerCursor", { visibility: "visible" });
  };

  return (
    <>
      <Link href="/p/[slug]" as={`/p/${slug}`} scroll={false}>
        <div className={`homeProject ${styles.homeProject}`} style={style}>
          <div
            tabIndex={0}
            role="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleClick}
            onClick={handleClick}
          >
            <img src={illustration} className={`illustration ${styles.illustration}`} />
            <img ref={logoRef} src={logo} className={`logo ${styles.logo}`} />
            <b>
              <span ref={maskRef}></span>
            </b>
          </div>
          <div className={`name ${styles.name}`}>{name}</div>
        </div>
      </Link>
    </>
  );
};
