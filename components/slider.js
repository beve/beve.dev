import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import Draggable from "gsap/Draggable"
import InertiaPlugin from "gsap/InertiaPlugin"
import useTimeline from "../hooks/useTimeline"

export default (props) => {
  const ref = useRef(null)
  const dashedLineRef = useRef(null)
  const dashedRoundRef = useRef(null)

  const timeline = useTimeline({ paused: true }, (tl) => {
    tl.to(dashedLineRef.current, 0.5, {
      strokeDashoffset: -20,
      repeat: -1,
      ease: "none",
    })
    tl.to(
      dashedRoundRef.current,
      0.7,
      { strokeDashoffset: -20, repeat: -1, ease: "none" },
      "<"
    )
  })

  const onMouseEnterHandle = () => {
    timeline.current.play()
  }

  const onMouseLeaveHandle = () => {
    timeline.current.pause()
  }

  useEffect(() => {
    const maxPos = dashedLineRef.current.getTotalLength() + 72
    const onUpdate = () => {
      console.log("ici")
    }
    if (typeof window !== "undefined") {
      gsap.registerPlugin(Draggable)
      gsap.registerPlugin(InertiaPlugin)
      Draggable.create(ref.current, {
        type: "x",
        throwProps: true,
        allowEventDefault: true,
        bounds: { minX: 0, maxX: maxPos },
        inertia: true,
        edgeResistance: 0.75,
        onDrag: onUpdate,
        onThrowUpdate: onUpdate,
        snap: (endValue) => (endValue < 250 ? 0 : maxPos),
      })
    }
  }, [])

  return (
    <div className="slider"
      role='button'
      onMouseEnter={onMouseEnterHandle}
      onMouseLeave={onMouseLeaveHandle}
    >
      <svg {...props} viewBox="-30 0 393 43">
        <g ref={ref}>
          <path
            d="M0 .378a43 46.905 0 0021 36.21 43 47 905 0 0043 0A43 47 905 0 0085.779.377z"
            fill="#e73c35"
            strokeWidth={1.29}
          />
          <path
            d="M30.83 13.172l25.645.095-9.334 9.05v0"
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity={1}
          />
        </g>
        <path
          ref={dashedLineRef}
          d="M96.933.783H292.12"
          fill="none"
          stroke="#333"
          strokeWidth={1}
          strokeDasharray="10,10"
        />
        <path
          ref={dashedRoundRef}
          d="M352.624.787a31.063 32 0 01-62 0s62.126-.834 62 0z"
          fill="none"
          stroke="#333"
          strokeWidth={1}
          strokeDasharray="10,10"
        />
      </svg>
    </div>
  )
}
