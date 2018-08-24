import React from "react";
import AsyncFetcher from "react-async-fetcher";

const SimpleFetch = () => (
  <AsyncFetcher url="https://ipapi.co/json/">
    {({ isLoading, error, data, set }) => {
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
      return (
        <p>
          <strong>My IP:</strong> {data.ip} <br />
          <strong>Location:</strong> {data.city} / {data.region}
        </p>
      );
    }}
  </AsyncFetcher>
);

export default SimpleFetch;
