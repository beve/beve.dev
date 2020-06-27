import React from "react"
import theme from "../theme"
import Link from "next/link"

const Menu = () => {
  return (
    <>
      <div className="menu">
        <Link href="/" data-cursor="big">
          Accueil
        </Link>
        <Link href="/" data-cursor="big">
          Compétences
        </Link>
        <Link href="/" data-cursor="big">
          Projets
        </Link>
        <Link href="/" data-cursor="big">
          Clients
        </Link>
        <Link href="/" data-cursor="big">
          Contact
        </Link>
      </div>
      <style jsx>
        {`
          .menu {
            box-sizing: border-box;
            display: flex;
            grid-area: menu;
            height: 140px;
            margin-left: -1px;
            border-bottom: 1px solid ${theme.color.grid};
            border-left: 1px solid ${theme.color.grid};
            border-right: 1px solid ${theme.color.grid};
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
            color: ${theme.color.text};
          }
        `}
      </style>
    </>
  );
};

export default Menu;
