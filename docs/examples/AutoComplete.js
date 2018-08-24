import React from "react";
import AsyncFetcher from "react-async-fetcher";

const AutoComplete = () => (
  <AsyncFetcher
    debounce={300} // debounce/delay consecutive types for a good autocomplete requests performance
    params={{ q: "" }} // initial data for controlled q input
    canFetch={({ params }) => !!params.q} // allow new requests only if user has typed some username
    url="https://api.github.com/search/users">
    {({ isLoading, error, data, params, set, fetch }) => {
      const hasQueryParam = !!params.q;
      const hasData = hasQueryParam && data !== null && !!data.items;
      const hasError = hasQueryParam && !!error;

      return (
        <form onSubmit={fetch}>
          {hasError && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {JSON.stringify(error)}
            </div>
          )}
          <div className="form-group">
            <input
              placeholder="Search for github username"
              value={params.q}
              onChange={event => set({ params: { q: event.target.value } })}
              className="form-control"
            />
          </div>
          {hasQueryParam && isLoading && <p className="loading">Loading data...</p>}
          {hasData && (
            <div className="results">
              {data.items.slice(0, 5).map(user => (
                <span key={user.id} className="label label-default">
                  {user.login}
                </span>
              ))}
            </div>
          )}
        </form>
      );
    }}
  </AsyncFetcher>
);

export default AutoComplete;
