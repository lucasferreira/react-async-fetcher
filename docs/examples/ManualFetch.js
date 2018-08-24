import React from "react";
import ReactDOM from "react-dom";
import AsyncFetcher from "react-async-fetcher";

const ManualFetch = () => (
  <AsyncFetcher autoFetch={false} method="get" url="https://jsonplaceholder.typicode.com/users" params={{ id: "1" }}>
    {({ isLoading, error, data, fetch }) => {
      // some loading state...
      if (isLoading) {
        return <p className="loading">Loading data...</p>;
      }

      // if has any error in your request
      if (error) {
        return (
          <p>
            <strong>Error:</strong> {error}
          </p>
        );
      }

      // if reach here your fetch are good
      if (data) {
        return (
          <p>
            <strong>Name:</strong> {data[0].name}
          </p>
        );
      }

      // using the `fetch` argument/callback to call for JSON API
      return (
        <button onClick={fetch} type="button" className="btn btn-primary">
          Find my user
        </button>
      );
    }}
  </AsyncFetcher>
);

export default ManualFetch;
