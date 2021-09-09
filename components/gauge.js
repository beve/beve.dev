import React, { useState } from "react";
import { gsap } from "gsap";
import useTimeline from "../hooks/useTimeline";
import CustomEase from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const Gauge = ({
  style,
  value,
  radius = 30,
  strokeWidth = 7,
  label = "React",
}) => {
  // const [computedAnimatedValue, set] = useState(0);

  /*

  const [ref, observer] = useIntersection(() => {
    timeline.current.play();
  });

  const timeline = useTimeline(
    { paused: true, delay: Math.random() * 1.2 },
    (tl) => {
      const animatedValue = { val: 0 };
      const el = ref.current.querySelector("circle");
      gsap.set(el, { drawSVG: 0 });
      tl.to(el, 0.8, { drawSVG: `${value}%` });
      tl.to(
        animatedValue,
        0.3,
        {
          val: value,
          roundProps: "val",
          onUpdate: () => {
            set(animatedValue.val);
          },
          onComplete: () => {
            observer.current.disconnect();
          },
        },
        "<"
      );
    }
  );
  */

  return (
    <div style={style} className="gaugeContainer">
      <svg
        viewBox={`0 0 ${(radius * 2 + strokeWidth * 2)} ${(radius * 2 + strokeWidth * 2) + 20}`}
        className="gauge"
        data-value={value}
      >
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          style={{strokeWidth: `${strokeWidth}px`}}
        />
        <text
          x="50%"
          y={radius / 2 - strokeWidth / 2}
          textAnchor="middle"
          dx="-2"
          dy={radius + 2}
          className="text1"
        >
          {value}
        </text>
        <text x="50%" y={radius + strokeWidth + 1} dx="7" className="text2">
          %
        </text>
        <text x="50%" y={radius * 2 + strokeWidth * 2 + 14} textAnchor="middle" className="text3">
          {label}
        </text>
      </svg>
    </div>
  );
};

export default Gauge;
