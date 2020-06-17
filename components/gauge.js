import React, { useState } from "react";
import { gsap } from "gsap";
import useIntersection from "../hooks/useIntersection";
import useTimeline from "../hooks/useTimeline";
import CustomEase from "gsap/CustomEase";
import DrawSVG from "gsap/DrawSVGPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import theme from "../theme/index"
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(DrawSVG);
gsap.registerPlugin(ScrollTrigger);

const Gauge = ({
  style,
  value,
  radius = 30,
  strokeWidth = 7,
  label = "React",
}) => {
  const [computedAnimatedValue, set] = useState(0);

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

  return (
    <div style={style} className="gaugeContainer">
      <svg
        ref={ref}
        viewBox={`0 0 ${(radius * 2 + strokeWidth * 2)} ${(radius * 2 + strokeWidth * 2) + 20}`}
        className="gauge"
      >
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
        />
        <text
          x="50%"
          y={radius / 2 - strokeWidth / 2}
          textAnchor="middle"
          dx="-2"
          dy={radius + 2}
          className="text1"
        >
          {computedAnimatedValue}
        </text>
        <text x="50%" y={radius + strokeWidth + 1} dx="7" className="text2">
          %
        </text>
        <text x="50%" y={radius * 2 + strokeWidth * 2 + 14} textAnchor="middle" className="text3">
          {label}
        </text>
      </svg>
      <style jsx>
        {`
          .gaugeContainer {
            padding: 25px;
            font-weight: 300;
          }

          .gauge {
            width: 100%;
          }

          circle {
            stroke: ${theme.color.primary};
            stroke-width: ${strokeWidth}px;
            fill: none;
          }

          .text1 {
            font-size: 14px;
          }

          .text2 {
            font-size: 7px;
          }

          .text3 {
            font-weight: 600;
            font-size: 9px;
          }
        `}
      </style>
    </div>
  );
};

export default Gauge;
