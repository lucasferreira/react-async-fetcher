<h1 align="center" style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/234495/44482953-21bd0480-a620-11e8-91cf-c65718f9c63f.png" alt="react-async-fetcher" />
</h1>

<p align="center" style="font-size: 1.2rem;">
  <strong>AsyncFetcher</strong> it is a simple and useful React <i>(web or native)</i> component for asynchronous loading/fetch online data with help of <a href="https://github.com/axios/axios" title="More about axios">axios</a>.<br />
  <img src="https://user-images.githubusercontent.com/234495/44481891-672c0280-a61d-11e8-8898-d987b7808b90.png" alt="AsyncFetcher" width="70%" style="border: 0; width: 70%; min-width: 240px;" />
</p>

<hr />

[![npm version](http://img.shields.io/npm/v/react-async-fetcher.svg?style=flat-square)](https://npmjs.org/package/react-async-fetcher "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-async-fetcher.svg?style=flat-square)](https://npmjs.org/package/react-async-fetcher "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-async-fetcher.svg?style=flat-square)](https://npmjs.org/package/react-async-fetcher "View this project on npm")

## Installation

Since the library is a JS-based solution, to install the latest version of `react-async-fetcher` you only need to run:

```bash
$ npm install --save react-async-fetcher
```

or

```bash
$ yarn add react-async-fetcher
```

## Usage

The _AsyncFetcher component_ is based in function as child render to enhance your render with useful callback functions and props.

### "Automagic" simple GET

> [See this demo online](https://codesandbox.io/s/8k2k96z25l)

```jsx
import React from "react";
import AsyncFetcher from "react-async-fetcher";

const MyIpWidget = () => (
  <AsyncFetcher url="https://ipapi.co/json/">
    {({ isLoading, error, data }) => {
      // some loading state...
      if (isLoading) {
        return <p>Loading data...</p>;
      }

      // if has any error in your request
      if (error) {
        return (
          <p>
            <strong>Error:</strong> {error}
          </p>
        );
      }

      // if reach here your request was successful
      return (
        <p>
          <strong>My IP:</strong> {data.ip} <br />
          <strong>Location:</strong> {data.city} / {data.region}
        </p>
      );
    }}
  </AsyncFetcher>
);
```

### Manual "non-automagic" _(autoFetch={false})_ with query

> [See this demo online](https://codesandbox.io/s/98joov34qy)

```jsx
import React from "react";
import AsyncFetcher from "react-async-fetcher";

const MyUser = () => (
  // passing `params` as prop or component state you will generate some "/users?id=1" request
  <AsyncFetcher autoFetch={false} method="get" url="https://jsonplaceholder.typicode.com/users" params={{ id: "1" }}>
    {({ fetch, isLoading, error, data }) => {
      // some loading state...
      if (isLoading) {
        return <p>Loading data...</p>;
      }

      // if has any error in your request
      if (error) {
        return (
          <p>
            <strong>Error:</strong> {error}
          </p>
        );
      }

      if (data) {
        // if reach here your request was successful
        return (
          <p>
            <strong>Name:</strong> {data.name}
          </p>
        );
      }

      // using the `fetch` prop/callback to call for JSON API
      return (
        <button onClick={fetch} type="button">
          Find my user
        </button>
      );
    }}
  </AsyncFetcher>
);
```

### Autocomplete search with `debounce` prop to delay future requests

> [See this demo online](https://codesandbox.io/s/jpvr4p1763)

```jsx
import React from "react";
import AsyncFetcher from "react-async-fetcher";

const MyAutoComplete = () => (
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
```

### Simple (and manual) POST request

> [See this demo online](https://codesandbox.io/s/pwmz63z8kx)

```jsx
import React from "react";
import AsyncFetcher from "react-async-fetcher";

const SimplePost = () => (
  <AsyncFetcher
    method="post"
    contentType="json"
    url="https://jsonplaceholder.typicode.com/posts"
    canFetch={({ postData }) => !!postData.title} // a litle validation for prevent empty post titles
    postData={{ userId: "1", title: "", body: "" }} // initial data for controlled inputs
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
          <p>
            <strong>Results:</strong> {JSON.stringify(data)}
          </p>
        )}
      </form>
    )}
  </AsyncFetcher>
);
```

### More Examples

For more info and good examples _(including Form Upload and usage with Formik)_ visit the [website project](https://lucasferreira.github.io/react-async-fetcher/).

## Children Render Props

This is the list of main props that all render functions receive in a first and only object props that you should probably know about.

### fetch

> `function(customRequest:object)` | defaults to `null`

When you call this function you manually ask for a new request/fetch for your AsyncFetcher component. If you pass some `customRequest` object as argument, that object could have some `params` or `postData` that will be used only for this request.

### isLoading

> `boolean` | defaults to `true` when `autoFetch={true}` or `false` when `autoFetch={false}`

This prop will indicate whether or not your AsyncFetcher component is in loading/fetching state.

### data

> `any` | defaults to `null`

This is the main result of your request when it done with success. As your response data it is parsed by axios, it could be some JSON/Javascript object or other kind of complex data.

### error

> `any` | defaults to `null`

This prop will be filled when your request/fetch it is completed without success. When you start a new `fetch` this prop will be `null` again until new fail happens.

### response

> `object` | defaults to `null`

This prop will be filled when your request/fetch it is completed and will have your complete request details beyond `data` and `error` info.

### set

> `function(data:<object or func>)` | use like React `setState` function with some plain object (key -> value) or a function that eval some plain object

Since AsyncFetcher component controls his internal state for new changes you could create stateless components that uses AsyncFetcher and manage new `params` and/or `postData` internally without use component props.

You could call inside you render children function like `set({ params: { userId: 1, active: 'Y' } })` to fill some new fresh params for your query request or could call `set({ postData: { name: 'John', email: 'john@doe.com' } })` for your POST requests.

You can even manually reset your `data` results calling `set({ data: null })`, or using the _set_ function to handle any other custom state variable than `params`, `postData` or `data`, like `set({ myCustom: 'var' })`. This custom state props will be avaible in `state` prop.

### params

> `object` | defaults to `null`

Prop to access the current query params state that will be used in the next request/fetch cycle.

### postData

> `object` | defaults to `null`

Prop to access the current request payload state that will be used in the next _POST_ request/fetch cycle.

### state

> `object` | defaults to `null`

Prop to access the current custom state of your AsyncFetcher component that are not `params`, `postData` and `data`.

## Component Props

| Property           | Default | Description                                                                                                                                                                                                                                                                                                                                                     |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                | `null`  | The URL _(only required prop)_ used for fetching your data. Can be some string or a function that evals and return a URL string.                                                                                                                                                                                                                                |
| method             | `get`   | The request method to be used when fetching some data _("get", "post", "put", "delete", "options")_                                                                                                                                                                                                                                                             |
| params             | `null`  | A object or string that will be passed in your URL as query params                                                                                                                                                                                                                                                                                              |
| postData           | `null`  | A object or string that will be passed in your POST requests as _axios_ `data` option _(payload)_. If you need to post some payload with data please set `method` prop as `post` or `put`                                                                                                                                                                       |
| canFetch           | `true`  | Indicates if new requests/fetchs are allowed to be done. Accepts boolean values or a function that receives the current params and return a boolean                                                                                                                                                                                                             |
| autoFetch          | `true`  | Controls if AsyncFetcher can handle itself _("automagic")_ new requests when state _(params and/or postData)_ changed and also the first fetch in component mount                                                                                                                                                                                               |
| autoPreventDefault | `true`  | If the first argument of `fetch` function is a _DOMEvent_ this prop will control when `AsyncFetcher` will call _event.preventDefault()_ or not                                                                                                                                                                                                                  |
| debounce           | `0`     | Indicates how much milliseconds _(positive number)_ the AsyncFetcher component will debounce consecutive requests after `params` or `postData` changes when `autoFetch={true}`. Recommended for autocomplete and/or `autoFetch` based forms                                                                                                                     |
| headers            | `null`  | A custom plain object with additional HTTP Headers for your request                                                                                                                                                                                                                                                                                             |
| ajax               | `false` | Adds `{'X-Requested-With': 'XMLHttpRequest'}` to your request headers                                                                                                                                                                                                                                                                                           |
| authToken          | `null`  | Adds a authorization token _(like JWT)_ to your request headers as `{'Authorization': 'Bearer ${authToken}'}`                                                                                                                                                                                                                                                   |
| accepts            | `null`  | Adds a `Accept` header to your request. Can be some mime string, array of mimes or function that evals and return a mime string                                                                                                                                                                                                                                 |
| contentType        | `null`  | Adds a `Content-Type` header to your request. It's useful when you need to POST some _json data_. So you can use `contentType="json"`. It's expected common content types options as: json, xml, form, html and text. Or you could pass some complex mime like `multipart/form-data`                                                                            |
| responseType       | `null`  | Indicates the type of data that the server will respond with. As [axios documentation](https://github.com/axios/axios#request-config) the options are: _'json', 'text', 'arraybuffer', 'blob', 'document', 'stream'_                                                                                                                                            |
| withCredentials    | `false` | Indicates whether or not cross-site Access-Control requests should be made using credentials                                                                                                                                                                                                                                                                    |
| axiosConfig        | `null`  | A custom plain object that extends the axios config object used in your request. This plain object it is useful to fill all the other [axios documentation](https://github.com/axios/axios#request-config) options that are not handle by default for AsyncFetcher like: `timeout`, `transformRequest`, `transformResponse`, `auth`, `responseEncoding` and etc |
| transformError     | `null`  | A optional transform callback for parse and change a possible error response when your request/fetch fails. This func/callback needs to return some string or plain object with error details                                                                                                                                                                   |
| onResponse         | `null`  | A event callback that occurs when a request/fetch it is complete with success, it receives a state object with `response`, `params`, `postData` and `set` function                                                                                                                                                                                              |
| onError            | `null`  | A event callback that occurs when a request/fetch it is complete with error, it receives a first argument of `error` object and the second argument it is state object with `response`, `params`, `postData` and `set` function                                                                                                                                 |

## License

[MIT](./LICENSE)
