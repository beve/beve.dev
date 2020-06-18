import React from "react";
import Grid from "../components/grid";

const images = [
  '01-2-3-fnh.png',
  '02-4-3-labelvie.png',
  '03-3-5-ensta.png',
  '04-2-7-cnrs.png',
  '05-4-7-lajungle.png',
  '06-3-9-alterrebreizh.png',
  '07-2-11-montpellier3m.png',
  '08-4-11-canal.png',
]

export default function Customers({ data }) {
  return (
    <>
      <Grid
        style={{ gridTemplateRows: "380px 160px 160px 190px" }}
        drawCols={14}
      >
        <div className="title">Clients</div>
        {images.map((image) => {
          const [_, row, col] = image.match(
            /^[0-9]{2}-([0-9]+)-([0-9]+).*/
          ); // eslint-disable-line
          return (
            <img
              key={image}
              src={`/images/logos/${image}`}
              loading="eager"
              style={{
                maxHeight: '80px', 
                maxWidth: '80%',
                objectFit: 'cover', 
                gridRow: row,
                gridColumn: `${col} / span 2`,
                objectFit: 'contain',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
              alt="Logo"
            />
          );
        })}
      </Grid>
      <style jsx>
        {`
          .title {
            grid-row: 1;
            grid-column: 2 / -1;
            font-size: 3.5em;
            letter-spacing: 1px;
            align-self: end;
            font-weight: 700;
            padding-bottom: 65px;
          }
        `}
      </style>
    </>
  );
}