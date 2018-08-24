import React, { Fragment } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Highlight from "./Highlight";
import Home from "./Home";
import Samples from "../examples";

import "../index.css";

const App = () => (
  <Router>
    <div id="page">
      <header>
        <h1>
          <img src="/logo.png" alt="React Async Fetcher" />
        </h1>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar">
            <ul className="nav nav-stacked nav-sidebar">
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <a
                  href="https://github.com/lucasferreira/react-async-fetcher#children-render-props"
                  target="_blank"
                  rel="noopener">
                  Documentation
                </a>
              </li>
              <li className="nav-header">Examples</li>
              {Samples.map(sample => (
                <li key={sample.key}>
                  <Link to={`/examples/${sample.key}`}>{sample.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="main">
            <Route exact path="/" component={Home} />
            {Samples.map(sample => (
              <Route
                key={`route-${sample.key}`}
                path={`/examples/${sample.key}`}
                render={props => {
                  return (
                    <Fragment>
                      <h2 className="page-header">{sample.name}</h2>
                      {!!sample.description && <p className="component-description">{sample.description}</p>}
                      <h4>Demo:</h4>
                      <div className="component-demo">
                        <sample.component />
                      </div>
                      <div className="component-source">
                        <h4>
                          Source{" "}
                          {sample.link && (
                            <span>
                              (
                              <a
                                href={`https://github.com/lucasferreira/react-async-fetcher/blob/master${sample.link}`}
                                target="_blank"
                                rel="noopener">
                                view-source on GitHub
                              </a>
                              )
                            </span>
                          )}
                          :
                        </h4>
                        <Highlight exampleCode={sample.sourceCode} />
                      </div>
                    </Fragment>
                  );
                }}
              />
            ))}
            <footer>Copyright © Lucas Ferreira, 2018. MIT Licensed.</footer>
          </div>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
