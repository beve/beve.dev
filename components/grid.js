import React from "react";

const Grid = ({ children, className = '', drawCols, colsCss, style }) => {
  let divs;
  if (drawCols) {
    divs = new Array(drawCols).fill();
  }

  const s = drawCols ? { gridTemplateColumns: `repeat(${drawCols}, 1fr)` } : {};

  return (
    <div className={`${className} grid`} style={{ ...s, ...style }}>
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
      <style jsx>
        {`
          .grid {
            display: grid;
          }
          .cols {
            grid-row: 1 / -1;
            pointer-events: none;
          }
          .cols:nth-of-type(even) {
            border-right: 1px solid #ececec;
          }
        `}
      </style>
    </div>
  );
};

export default Grid;
