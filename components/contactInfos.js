import React from "react";

const ContactInfos = () => (
  <>
    <div className="contactInfos">
      <div>
        <a href="mailto:chris@beve.org">chris@beve.dev</a>
        <span>+33 (6) 12 52 16 14</span>
      </div>
    </div>
    <style jsx>
      {`
        .contactInfos {
          grid-area: infos;
          font-size: 1em; // 16px
          grid-column: 1;
          justify-self: center;
        }
        .contactInfos > div {
          display: flex;
          flex-flow: column nowrap;
          justify-self: center;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          margin-bottom: 55px;
        }
        a {
          font-weight: 300;
        }
        span {
          font-weight: 600;
          white-space: nowrap;
        }
      `}
    </style>
  </>
);

export default ContactInfos;
