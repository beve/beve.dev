import React from "react";
import Grid from "../components/grid";
import Slider from "../components/slider";
import styles from "./contact.module.scss"

export default () => {
  return (
    <div className={styles.contact}>
      <Grid style={{ gridTemplateRows: "280px 1fr 190px" }} drawCols={14}>
        <div className={styles.title}>Contact</div>
        <div className={styles.formCss}>
          <input type="text" placeholder="Nom Prénom"></input>
          <input type="email" placeholder="Email"></input>
          <textarea placeholder="Message"></textarea>
        </div>
        <div className={styles.submit}>
          <Slider />
        </div>
      </Grid>
    </div>
  );
};
