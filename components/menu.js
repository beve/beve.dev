import React from "react";
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
    </>
  );
};

export default Menu;
