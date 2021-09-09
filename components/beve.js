import React from "react"

import styles from "./beve.module.scss"

const Beve = () => {
  return (
    <>
      <div className={`beve ${styles.beve}`}>
        <div className={`mainContainer ${styles.mainContainer}`} data-cursor="big">
          <div className={`beContainer ${styles.beContainer}`}>be</div>
          <div className={`veContainer ${styles.veContainer}`}>
            <div>ve</div>
            <div className={`dot ${styles.dot}`}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beve;
