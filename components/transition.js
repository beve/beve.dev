import React, { useState, useEffect } from 'react'

export default function Transition({ children }) {

  console.log("MOUNT");

  const [components, set] = useState([])

  useEffect(() => {
    console.log("DRAW");
    // const lastComponent = components.pop()
    // set(lastComponent ? [lastComponent, children] : [children])
  });

  return (
    <div>{components.map(c => {
      return c;
    }
    )}</div>
  )
}