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

The _AsyncFetcher component_ is based in function as child render.

"Automagic" simple GET sample:

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

[See the demo above online](https://codesandbox.io/s/8k2k96z25l).

Manual "non-automagic" (with autoFetch={false}) sample with query:

```javascript
import AsyncFetcher from "react-async-fetcher";

const MyUser = () => (
  <AsyncFetcher autoFetch={false} method="get" url="https://jsonplaceholder.typicode.com/users" params={{ id: "1" }}>
    {({ isLoading, error, data, fetch }) => {
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

      // using the `fetch` argument/callback to call for JSON API
      return (
        <button onClick={fetch} type="button">
          Find my user
        </button>
      );
    }}
  </AsyncFetcher>
);
```

[See the demo above online](https://codesandbox.io/s/98joov34qy).
