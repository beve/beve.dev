import React from "react";
import styles from "./contactInfos.module.scss"

const ContactInfos = () => (
  <>
    <div className={`contactInfos ${styles.contactInfos}`} style={{gridArea: 'infos'}}>
      <div>
        <a href="mailto:chris@beve.org">chris@beve.dev</a>
        <span>+33 (6) 12 52 16 14</span>
      </div>
    </div>
  </>
);

export default ContactInfos;
