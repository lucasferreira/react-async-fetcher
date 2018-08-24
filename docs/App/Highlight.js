import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";

const CustomHighlight = ({ exampleCode }) => (
  <Highlight {...defaultProps} theme={theme} code={exampleCode} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            <span className="line-number">{i + 1}</span>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default CustomHighlight;
