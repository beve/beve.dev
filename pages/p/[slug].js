import Grid from "../../components/grid";
import Down from "../../components/down";
import Close from "../../components/close";

export default function ProjectPage({ data }) {
  /*
  const {
    name,
    images,
    stack,
    customer,
    technologies,
    context,
    description,
  } = data.allDatoCmsProject.edges[0].node;
  */

  return (
    <>
      <Grid
        className="projects"
        style={{
          gridTemplateRows: `225px 260px 1fr`,
          height: `100vh`,
        }}
        drawCols={14}
        colsCss={{
          zIndex: 1,
          opacity: 0.3,
        }}
      >
          {/* 
        <div className="illustrations">
          {images.map((image) => {
            const { fluid, alt, title } = image;
            return (
              <Img
                key={title}
                fluid={fluid}
                alt={alt}
                title={title}
                style={{ height: "100%" }}
              />
            );
          })}
        </div>
        <div className="sheet">
          <div>{name}</div>
          <div className="infos">
            <div>
              <span>Contexte:</span>
              {perimeter}
            </div>
            <div>
              <span>Client:</span>
              {customer}
            </div>
            <div>
              <span>Stack:</span>
              {stack}
            </div>
            <div>
              <span>Technologies:</span>
              {technologies}
            </div>
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <div data-cursor="big" className="iconClose">
          <div>
            <Close />
          </div>
        </div>
        <div className="iconDown" data-cursor="big">
          <Down />
        </div>
          */}
      </Grid>
      <style jsx>
        {`
          .sheet div {
            font-size: 3em;
            font-weight: bold;
            line-height: 1.25em;
          }
        `}
      </style>
    </>
  );
}