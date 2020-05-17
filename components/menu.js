import React from "react";

const Menu = () => {
  return (
    <>
      <div className="menu">
        <a href="/" data-cursor="big">
          Accueil
        </a>
        <a href="/" data-cursor="big">
          Compétences
        </a>
        <a href="/" data-cursor="big">
          Projets
        </a>
        <a href="/" data-cursor="big">
          Clients
        </a>
        <a href="/" data-cursor="big">
          Contact
        </a>
      </div>
      <style jsx>
        {`
          .menu {
            box-sizing: border-box;
            display: flex;
            grid-area: menu;
            height: 140px;
            margin-left: -1px;
            border-bottom: 1px solid lightblue;
            border-left: 1px solid lightblue;
            border-right: 1px solid lightblue;
            justify-content: space-evenly;
            align-items: center;
            text-transform: uppercase;
            font-family: "Open Sans";
            font-weight: 600;
            background-color: #fff;
          }
          a {
            font-size: 14px;
            font-size: 0.85em;
            letter-spacing: 1.8px;
            color: #ccc;
          }
        `}
      </style>
    </>
  );
};

export default Menu;
