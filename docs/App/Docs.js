import React, { Fragment } from "react";
import Markdown from "./Markdown";

const Docs = () => (
  <Fragment>
    <h2 className="page-header">Documentation</h2>
    <Markdown source={require("!!raw-loader!./Docs.md")} />
  </Fragment>
);

export default Docs;
