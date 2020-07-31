import theme from "../theme/index"

const Bar = ({
  value,
  barHeight = 5,
  width = 195,
  label = "Arduino",
}) => {
  const halfHeight = barHeight / 2;
  const computedValue = (width * value) / 100;

  /*
  const valRef = useRef();
  const pathRef = useRef();
  const [computedAnimatedValue, set] = useState(0);

  const [ref, observer] = useIntersection(() => {
    timeline.current.play();
  });

  const timeline = useTimeline(
    { paused: true, delay: Math.random() * 0.5 },
    (tl) => {
      const animatedValue = { val: 0 };

      // Bar length
      tl.fromTo(
        pathRef.current,
        {
          opacity: 0.2,
        },
        {
          duration: 1,
          strokeDashoffset: width - (width / 100) * value,
          opacity: 1,
          ease: "easeOut",
        }
      );
      // Numbers
      tl.fromTo(
        valRef.current,
        {
          opacity: 0,
        },
        {
          duration: 1,
          opacity: 1,
          ease: "easeOut",
        },
        "<"
      );
      // Val displayed (text)
      tl.to(
        animatedValue,
        1,
        {
          val: value,
          roundProps: "val",
          onUpdate: () => {
            set(animatedValue.val);
          },
          onComplete: () => {
            // Animation complete disconnect observer
            observer.current.disconnect();
          },
        },
        "<"
      );
    }
  );
  */

  return (
    <div className="barContainer">
      <svg viewBox={`0 0 ${width + barHeight} 27`} className="bar" data-value={value}>
        <defs>
          <path
            id="labelPath"
            d={`M${halfHeight},${15 - halfHeight} H${computedValue + 100}`}
          />
        </defs>
        <g fill="none">
          <path
            className="pathPath"
            d={`M${halfHeight},${27 - halfHeight} H${width + halfHeight}`}
          />{" "}
          <path
            className="pathAnimated"
            d={`M${halfHeight},${27 - halfHeight} H${width + halfHeight}`}
          />
        </g>
        <g>
          <text dy="0" className="text1">
            <textPath href="#labelPath" startOffset={computedValue - 10}>
              {value}
            </textPath>
          </text>
          <text dy="-6" className="text2">
            <textPath href="#labelPath" startOffset={computedValue + 7}>
              %
            </textPath>
          </text>
        </g>
        <text className="text3">
          <textPath href="#labelPath" startOffset={0}>
            {label}
          </textPath>
        </text>
      </svg>
      <style jsx>
        {`
          .barContainer {
            margin: 35px 0;
          }

          path {
            stroke-linecap: round;
            stroke-width: ${barHeight};
          }
          path.pathPath {
            stroke: ${theme.color.grid};
          }
          path.pathAnimated {
            stroke: ${theme.color.primary};
            stroke-dasharray: ${width};
            stroke-dashoffset: ${width};
          }
          text {
            font-weight: 300;
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

export default Bar