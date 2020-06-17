import Grid from "../components/grid";
import AnimationButton from "../components/animationButton";
import theme from "../theme/index"

export default () => {
  return (
    <>
      <Grid style={{ overflow: "hidden", minHeight: "100vh" }} drawCols={14}>
        <div className="caption">
          <div>Make dev.</div>
          <span>great again&nbsp;!</span>
        </div>
        <div className="animationButton">
          <AnimationButton />
        </div>
        <div className="desc">
          <div>
            Hello, je m'appelle <span>Christophe Beveraggi</span>
          </div>
          <div>
            Je suis développeur depuis 20 ans, concepteur d'objet amusants, et
            maker.
          </div>
        </div>
      </Grid>
      <style jsx>
        {`
          .caption {
            grid-row: 1;
            grid-column: 2 / span 12;
            display: flex;
            flex-flow: column wrap;
            flex-direction: column;
            margin: auto 0;
            align-items: center;
            text-transform: uppercase;
            font-size: 95px;
            font-size: 5.95em;
            line-height: 106px;
            line-height: 1.12em;
            letter-spacing: 2px;
            font-weight: bold;
          }

          .caption span {
            color: ${theme.color.primary};
          }

          .animationButton {
            grid-row: 1;
            grid-column: 12 / span 2;
            margin-top: auto;
            margin-bottom: auto;
            margin-left: 7px;
            width: 160px;
            height: 160px;
          }

          .desc {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            grid-row: 1;
            grid-column: 4 / -2;
            margin-bottom: 50px;
            font-size: 22px;
            font-weight: 300;
          }

          .desc span {
            color: ${theme.color.primary};
            font-weight: 600;
          }

          @media (max-width: 1366px) {
            .caption {
              display: block;
              margin-left: -0.2em;
            }
          }
          @media (max-width: 1000px) {
            .caption {
              max-width: 700px;
            }
          }
          @media (max-width: 800px) {
            .caption {
              max-width: 500px;
            }
          }
        `}
      </style>
    </>
  );
};
