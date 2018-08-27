import React, { Fragment } from "react";
import Markdown from "./Markdown";

const Installation = () => (
  <Fragment>
    <h2 className="page-header">Installation</h2>
    <Markdown source={require("!!raw-loader!./Installation.md")} />
  </Fragment>
);

export default Installation;
