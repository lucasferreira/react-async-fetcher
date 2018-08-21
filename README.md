# react-async-fetcher

AsyncFetcher it is a simple and usefull React _(web or native)_ component for asynchronous loading/fetch online data with help of [axios](https://github.com/axios/axios).

[![npm version](http://img.shields.io/npm/v/react-async-fetcher.svg?style=flat-square)](https://npmjs.org/package/react-async-fetcher "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-async-fetcher.svg?style=flat-square)](https://npmjs.org/package/react-async-fetcher "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-async-fetcher.svg?style=flat-square)](https://npmjs.org/package/react-async-fetcher "View this project on npm")

## Installation

Since the library is a JS-based solution, to install the latest version of `react-async-fetcher` you only need to run:

```bash
npm install --save react-async-fetcher
```

or

```bash
yarn add react-async-fetcher
```

## Basic Usage

The _AsyncFetcher component_ is based in function as child render to enhance your render with useful callback functions and props.

"Automagic" simple GET sample ([see this demo online](https://codesandbox.io/s/8k2k96z25l)):

```javascript
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
```

Manual "non-automagic" (with autoFetch={false}) sample with query ([see this demo online](https://codesandbox.io/s/98joov34qy)):

```javascript
import AsyncFetcher from "react-async-fetcher";

const MyUser = () => (
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

      // if reach here your fetch are good
      if (data) {
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

## Props

| Property        | Default | axios API | Description                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFetch       | `true`  | No        | Controls if AsyncFetcher can handle itself for new requests when state _(params and/or postData)_ changes and the first fetch in component mount                                                                                                                                                                                                                |
| url             | `null`  | Yes       | The URL _(only required prop)_ used for fetching your data. Can be some string or a function that evals and return a URL string                                                                                                                                                                                                                                 |
| method          | `get`   | Yes       | The request method to be used when fetching some data _("get", "post", "put", "delete", "options")_                                                                                                                                                                                                                                                             |
| params          | `null`  | Yes       | A object or string that will be passed in your URL as query params                                                                                                                                                                                                                                                                                              |
| postData        | `null`  | No        | A object or string that will be passed in your POST requests as _axios_ `data` option _(payload)_. If you need to post some payload with data please set `method` prop as `post` or `put`                                                                                                                                                                       |
| debounce        | `0`     | No        | Indicates how much milliseconds _(positive number)_ the AsyncFetcher component will debounce consecutive requests after `params` or `postData` changes when `autoFetch={true}`. Indicate for autocompletes and/or `autoFetch` based forms                                                                                                                       |
| headers         | `null`  | Yes       | A custom plain object with additional HTTP Headers for your request                                                                                                                                                                                                                                                                                             |
| ajax            | `false` | No        | Adds `{'X-Requested-With': 'XMLHttpRequest'}` to your request headers                                                                                                                                                                                                                                                                                           |
| authToken       | `null`  | No        | Adds a authorization token _(like JWT)_ to your request headers as `{'Authorization':`Bearer ${authToken}`}`                                                                                                                                                                                                                                                    |
| accepts         | `null`  | No        | Adds a `Accept` header to your request. Can be some mime string, array of mimes or function that evals and return a mime string                                                                                                                                                                                                                                 |
| contentType     | `null`  | No        | Adds a `Content-Type` header to your request. It's useful when you need to POST some _json data_. So you can use `contentType="json"`. It's expected common content types options as: json, xml, form, html and text. Or you could pass some complex mime like `multipart/form-data`                                                                            |
| responseType    | `null`  | Yes       | Indicates the type of data that the server will respond with. As [axios documentation](https://github.com/axios/axios#request-config) the options are: _'json', 'text', 'arraybuffer', 'blob', 'document', 'stream'_                                                                                                                                            |
| withCredentials | `false` | Yes       | Indicates whether or not cross-site Access-Control requests should be made using credentials                                                                                                                                                                                                                                                                    |
| axiosConfig     | `null`  | No        | A custom plain object that extends the axios config object used in your request. This plain object it is useful to fill all the other [axios documentation](https://github.com/axios/axios#request-config) options that are not handle by default for AsyncFetcher like: `timeout`, `transformRequest`, `transformResponse`, `auth`, `responseEncoding` and etc |
| transformError  | `null`  | No        | A optional transform callback for parse and change a possible error response when your request/fetch fails. This func/callback needs to return some string or plain object with error details                                                                                                                                                                   |
| onResponse      | `null`  | No        | A event callback that occurs when a request/fetch it is complete with success                                                                                                                                                                                                                                                                                   |
| onError         | `null`  | No        | A event callback that occurs when a request/fetch it is complete with error                                                                                                                                                                                                                                                                                     |

## License

[MIT](./LICENSE)
