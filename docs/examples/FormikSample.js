import React from "react";
import AsyncFetcher from "react-async-fetcher";
import { Formik } from "formik";
import { string, object } from "yup";

const INITIAL_DATA = {
  userId: "1",
  title: "",
  body: "",
};

const validationSchema = object().shape({
  title: string().required("Title is required!"),
  body: string().required("Body is required!"),
});

const MyFormikForm = () => (
  <AsyncFetcher method="post" contentType="json" url="https://jsonplaceholder.typicode.com/posts" autoFetch={false}>
    {fetcher => (
      <Formik
        initialValues={{ ...INITIAL_DATA }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => fetcher.fetch({ postData: values, onResponse: () => resetForm() })}>
        {({ values, touched, errors, isValid, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
      </Formik>
    )}
  </AsyncFetcher>
);

export default MyFormikForm;
