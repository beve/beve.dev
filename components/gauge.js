import React, { useState } from "react";
import { gsap } from "gsap";
import useIntersection from "../hooks/useIntersection";
import useTimeline from "../hooks/useTimeline";
import CustomEase from "gsap/CustomEase3";
import DrawSVG from "gsap/DrawSVGPlugin3";
import theme from "../theme/index"
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(DrawSVG);

const Gauge = ({
  color,
  customCss,
  value,
  radius = 58,
  strokeWidth = 15,
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
    <>
      <svg
        ref={ref}
        style={customCss}
        viewBox={`0 0 ${(radius * 2 + strokeWidth) * 1.5} ${
          (radius * 2 + strokeWidth) * 1.5
        }`}
      >
        <circle
          cx={(radius + strokeWidth / 2) * 1.5}
          cy={radius + strokeWidth / 2}
          r={radius}
        />
        <text
          x="50%"
          y="35%"
          textAnchor="middle"
          dx="-.2em"
          dy=".3em"
          className="text1"
        >
          {computedAnimatedValue}
        </text>
        <text x="50%" y="35%" textAnchor="middle" dx="1.2em" className="text2">
          %
        </text>
        <text x="50%" y="85%" textAnchor="middle" className="text3">
          {label}
        </text>
      </svg>
      <style jsx>
        {`
          circle {
            stroke: ${theme.color.primary};
            stroke-width: 4px;
            fill: none;
          }

          .text1 {
            stroke-width: 0.5px;
            font-size: 1.6em;
            stroke: ${theme.color.grey};
          }

          .text2 {
            stroke-width: 0.5px;
            font-size: 0.9em;
            stroke: ${theme.color.grey};
          }

          .text3 {
            stroke-width: 0.5px;
            font-weight: 600;
            font-size: 1.3em;
            stroke: ${theme.color.grey};
          }
        `}
      </style>
    </>
  );
};

export default Gauge;
