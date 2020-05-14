import React from "react";

const Grid = ({ children, gridCss, drawCols, colsCss }) => {
  let divs;
  if (drawCols) {
    divs = new Array(drawCols).fill();
  }
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${drawCols}, 1fr)`, ...gridCss }}
    >
      {divs &&
        divs.map((_, i) => (
          <b
            className="cols"
            style={{
              gridColumn: `${i + 1}`,
              ...colsCss,
            }}
            key={`d${i}`}
          ></b>
        ))}
      {children}
    </div>
  );
};

export default Grid;
