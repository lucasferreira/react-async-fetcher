import React from "react";
import AsyncFetcher from "react-async-fetcher";
import { withFormik } from "formik";
import { string, object } from "yup";

const MyInnerForm = ({ values, touched, errors, isValid, handleChange, handleBlur, submitForm, resetForm }) => (
  <AsyncFetcher
    method="post"
    contentType="json"
    url="https://jsonplaceholder.typicode.com/posts"
    canFetch={isValid} // use formik isValid prop to indicates when AsyncFetcher could send POST request
    postData={values}
    autoFetch={false}>
    {fetcher => (
      <form
        onSubmit={event => {
          // preventing default html form submition
          event.preventDefault();
          // call to formik for a fresh validation
          submitForm().then(() => {
            // if this form `isValid` call to AsyncFetcher for a new POST request
            fetcher.fetch({ onResponse: () => resetForm() });
          });
        }}>
        {!!fetcher.error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {JSON.stringify(fetcher.error)}
          </div>
        )}
        {fetcher.isLoading && <p className="loading">Loading data...</p>}
        <div className={errors.title && touched.title ? "form-group has-error" : "form-group"}>
          <label htmlFor="title">Post Title</label>
          <input
            id="title"
            placeholder="Insert your post title (required)"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.title && touched.title ? "form-control error" : "form-control"}
          />
          {errors.title && touched.title && <div className="help-block help-block-error">{errors.title}</div>}
        </div>
        <div className={errors.body && touched.body ? "form-group has-error" : "form-group"}>
          <label htmlFor="body">Post Title</label>
          <textarea
            id="body"
            placeholder="Insert your post body"
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.body && touched.body ? "form-control error" : "form-control"}
            rows={3}
          />
          {errors.body && touched.body && <div className="help-block help-block-error">{errors.body}</div>}
        </div>
        <button disabled={fetcher.isLoading} type="submit" className="btn btn-primary">
          Send my post
        </button>
        {!!fetcher.data && (
          <div className="results">
            <p>
              <strong>Results:</strong>
            </p>
            <pre>{JSON.stringify(fetcher.data)}</pre>
          </div>
        )}
      </form>
    )}
  </AsyncFetcher>
);

const INITIAL_DATA = {
  userId: "1",
  title: "",
  body: "",
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({ ...INITIAL_DATA }), // initial data for controlled inputs...
  handleSubmit: () => {}, // IMPORTANT: set this handleSubmit as noop function, formik require this
  validationSchema: object().shape({
    title: string().required("Title is required!"),
    body: string().required("Body is required!"),
  }),
})(MyInnerForm);

export default EnhancedForm;
