import React from "react";
import AsyncFetcher from "react-async-fetcher";

const CustomQuery = () => (
  <AsyncFetcher
    autoFetch={false}
    url={({ params }) => `https://ipapi.co/${params.ip}/json/`} // passing a function to customize the URL with params
    params={{ ip: "8.8.8.8" }} // initial value
    canFetch={({ params }) => !!params.ip} // allow new requests only if user has typed some IP
  >
    {({ isLoading, error, data, params, set, fetch }) => {
      const hasIPParam = !!params.ip;
      const hasError = hasIPParam && !!error;
      const hasData = hasIPParam && data !== null;

      return (
        <form onSubmit={fetch}>
          {hasError && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {JSON.stringify(error)}
            </div>
          )}
          <div className="input-group">
            <input
              placeholder="Type some valid IP for request"
              value={params.ip}
              onChange={event => set({ params: { ip: event.target.value }, data: null })} // update params with new IP value and reset previous data results
              className="form-control"
            />
            <span className="input-group-btn">
              <button disabled={!hasIPParam} type="submit" className="btn btn-primary">
                Click for request IP
              </button>
            </span>
          </div>
          {isLoading && <p className="loading">Loading data...</p>}
          {hasData && (
            <div className="results">
              <p>
                <strong>Results:</strong>
              </p>
              <pre>{JSON.stringify(data)}</pre>
            </div>
          )}
        </form>
      );
    }}
  </AsyncFetcher>
);

export default CustomQuery;
