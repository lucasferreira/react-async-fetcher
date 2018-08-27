## Usage

The _AsyncFetcher component_ is based in function as child render to enhance your render with useful callback functions and props.

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
| autoFetch          | `true`  | Controls if AsyncFetcher can handle itself _("automagic")_ for new requests when state _(params and/or postData)_ changes and the first fetch in component mount                                                                                                                                                                                                |
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
