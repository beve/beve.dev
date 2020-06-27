import React from "react";
import theme from "../theme"
import Link from "next/link"

const Menu = () => {
  return (
    <>
      <div className="menu">
        <Link href="/" scroll={false}>
          <a data-cursor="big">Accueil</a>
        </Link>
        <Link href="/#competences" scroll={false}>
          <a data-cursor="big">Compétences</a>
        </Link>
        <Link href="/#projets" scroll={false}>
          <a data-cursor="big">Projets</a>
        </Link>
        <Link href="/#clients" scroll={false}>
          <a data-cursor="big">Clients</a>
        </Link>
        <Link href="/#contact" scroll={false}>
          <a data-cursor="big">Contact</a>
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
