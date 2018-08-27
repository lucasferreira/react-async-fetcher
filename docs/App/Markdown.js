import React from "react";
import ReactMarkdown from "react-markdown";

const Markdown = props => (
  <div className="markdown-body">
    <ReactMarkdown
      renderers={{
        table: ({ columnAlignment, ...props }) => (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover" {...props} />
          </div>
        ),
      }}
      {...props}
    />
  </div>
);

export default Markdown;
