import React from "react";

const Beve = () => {
  return (
    <>
      <div className="beve">
        <div className="mainContainer" data-cursor="around">
          <div className="beContainer">be</div>
          <div className="veContainer">
            <div>ve</div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .beve {
            font-size: 2.5em;
            font-weight: bold;
            line-height: 0.85em;
            grid-area: logo;
          }

          .beve .mainContainer {
            display: flex;
            height: 100%;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
          }

          .beve .mainContainer .beContainer {
            margin-left: -11px;
          }

          .beve .mainContainer .veContainer {
            display: inline-flex;
            flex: 0 1 auto;
            padding-left: 2px;
            padding-right: 11px;
            position: relative;
          }

          .beve .mainContainer .veContainer .dot {
            padding: 0;
            position: absolute;
            bottom: 1px;
            right: 0px;
            width: 7px;
            height: 6px;
            border-radius: 50%;
            background-color: red;
          }
        `}
      </style>
    </>
  );
};

export default Beve;
