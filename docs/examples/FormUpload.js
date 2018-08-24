import React, { PureComponent } from "react";
import AsyncFetcher from "react-async-fetcher";

const INITIAL_DATA = {
  title: "",
};

export default class FormUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uploadProgress: 0,
    };
  }
  onUploadProgress = progressEvent => {
    const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    this.setState({ uploadProgress });
  };
  handleSubmit(postData, fetch) {
    // create FormData object for blog file AJAX post
    const data = new FormData();

    // append the attached file to our FormData object
    if (!!this._uploadInput && this._uploadInput.files.length > 0) {
      data.append("files[]", this._uploadInput.files[0]);
    }

    // mapping other input values to our FormData object
    Object.keys(postData).forEach(field => data.append(field, postData[field]));

    // request our `fetch` function from AsyncObject and setting our custom FormData as axios `data` attribute
    fetch({ data });
  }
  render() {
    const { uploadProgress } = this.state;

    return (
      <AsyncFetcher
        method="post"
        contentType="multipart" // important to "simulate" some native form post
        url="https://jquery-file-upload.appspot.com/"
        postData={{ ...INITIAL_DATA }} // initial data for controlled inputs
        axiosConfig={{
          // passing to AsyncFetcher a custom axios config/event to handle the upload progress
          onUploadProgress: this.onUploadProgress,
        }}
        onResponse={({ data, set }) => {
          // when the post request are done with success we could reset the form
          if (!!data) set({ postData: { ...INITIAL_DATA } });
        }}
        autoFetch={false}>
        {({ isLoading, error, data, postData, set, fetch }) => (
          <form
            onSubmit={event => {
              // preventing default html form submition
              event.preventDefault();
              // call for our customized event that will deal with input type file
              this.handleSubmit(postData, fetch);
            }}>
            {!!error && (
              <div className="alert alert-danger" role="alert">
                <strong>Error:</strong> {JSON.stringify(error)}
              </div>
            )}
            {isLoading && (
              <div className="progress" style={{ marginBottom: 16 }}>
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
                  {uploadProgress}%
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="title">Image Title</label>
              <input
                id="title"
                value={postData.title}
                onChange={event => set({ postData: { title: event.target.value } })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Image Title</label>
              <input
                id="img"
                ref={ref => (this._uploadInput = ref)}
                type="file"
                className="form-control"
                accept="image/*"
              />
            </div>
            <button disabled={isLoading} type="submit" className="btn btn-primary">
              Send my Image
            </button>
            {!!data && (
              <div className="results">
                <p>
                  <strong>Results:</strong>
                </p>
                <pre>{JSON.stringify(data)}</pre>
                {!!data.files && data.files.map(file => <img key={file.url} src={file.url} alt="" />)}
              </div>
            )}
          </form>
        )}
      </AsyncFetcher>
    );
  }
  _uploadInput;
}
