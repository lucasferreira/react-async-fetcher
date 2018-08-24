import React from "react";
import AsyncFetcher from "react-async-fetcher";

const INITIAL_DATA = {
  userId: "1",
  title: "",
  body: "",
};

const SimplePost = () => (
  <AsyncFetcher
    method="post"
    contentType="json"
    url="https://jsonplaceholder.typicode.com/posts"
    canFetch={({ postData }) => !!postData.title} // a litle validation for prevent empty post titles
    postData={{ ...INITIAL_DATA }} // initial data for controlled inputs
    onResponse={({ data, set }) => {
      // when the post request are done with success we could reset the form
      if (!!data) set({ postData: { ...INITIAL_DATA } });
    }}
    autoFetch={false}>
    {({ isLoading, error, data, postData, set, fetch }) => (
      <form method="post" onSubmit={fetch}>
        {!!error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {JSON.stringify(error)}
          </div>
        )}
        {isLoading && <p className="loading">Loading data...</p>}
        <div className="form-group">
          <input
            placeholder="Insert your post title (required)"
            value={postData.title}
            onChange={event => set({ postData: { title: event.target.value } })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Insert your post body"
            value={postData.body}
            onChange={event => set({ postData: { body: event.target.value } })}
            className="form-control"
            rows={3}
          />
        </div>
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Send my post
        </button>
        {!!data && (
          <div className="results">
            <p>
              <strong>Results:</strong>
            </p>
            <pre>{JSON.stringify(data)}</pre>
          </div>
        )}
      </form>
    )}
  </AsyncFetcher>
);

export default SimplePost;
