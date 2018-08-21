import { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import _debounce from "lodash.debounce";
import _isPlainObject from "lodash.isplainobject";
import _isEqual from "fast-deep-equal";
import { isEvent, serialize, concatParams, parseMime } from "./utils";

const defaultFetchCreator = requestData => axios(requestData);

export default class AsyncFetcher extends PureComponent {
  static propTypes = {
    autoFetch: PropTypes.bool,
    method: PropTypes.oneOf(["get", "post", "put", "delete", "options"]),
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    params: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    postData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    headers: PropTypes.object,
    axiosConfig: PropTypes.object,
    ajax: PropTypes.bool,
    authToken: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    accepts: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    contentType: PropTypes.string,
    responseType: PropTypes.string,
    withCredentials: PropTypes.bool,
    transformError: PropTypes.func,
    fetchCreator: PropTypes.func,
    onResponse: PropTypes.func,
    onError: PropTypes.func,
    debounce: PropTypes.number,
    children: PropTypes.func,
  };
  static defaultProps = {
    autoFetch: true,
    method: "get",
    headers: {},
    axiosConfig: {},
    ajax: false,
    withCredentials: false,
    transformError: err => err,
    fetchCreator: defaultFetchCreator,
    debounce: 0,
  };
  constructor(props) {
    super(props);

    this._debouncedFetch =
      +props.debounce > 0 ? _debounce(this.fetch.bind(this), +props.debounce) : this.fetch.bind(this);

    this.state = {
      isLoading: !!props.autoFetch,
      response: null,
      data: null,
      error: null,
      params: null,
      postData: null,
      customState: {},
    };
  }
  componentDidUpdate(prevProps, prevState) {
    let hasChange = false;
    ["method", "params", "postData", "url", "authToken"].forEach(k => {
      if (k in prevProps && !_isEqual(prevProps[k], this.props[k])) {
        hasChange = true;
      }
    });
    if (!hasChange) {
      ["params", "postData"].forEach(k => {
        if (k in prevState && !_isEqual(prevState[k], this.state[k])) {
          hasChange = true;
        }
      });
    }

    if (+prevProps.debounce !== +this.props.debounce) {
      this._debouncedFetch =
        +this.props.debounce > 0 ? _debounce(this.fetch.bind(this), +this.props.debounce) : this.fetch.bind(this);
    }

    if (hasChange && !!this.props.autoFetch) {
      this._debouncedFetch();
    }
  }
  componentDidMount() {
    this._mounted = true;

    if (!!this.props.autoFetch) {
      this.fetch();
    }
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  fetch = (dataEvent = null, customRequest = {}) => {
    const {
      url,
      headers,
      axiosConfig,
      authToken,
      ajax,
      accepts,
      responseType,
      withCredentials,
      transformError,
      fetchCreator,
      onResponse,
      onError,
    } = this.props;

    const method = this.props.method.toLowerCase();
    const isPost = method === "post" || method === "put";
    const isEventData = !!dataEvent && isEvent(dataEvent);

    const contentType = !!this.props.contentType
      ? parseMime(this.props.contentType)
      : isPost
        ? parseMime("form")
        : null;

    const customHeaders = {};
    if (!!contentType) {
      customHeaders["Content-Type"] = contentType;
    }
    if (!!authToken) {
      let authorization = typeof authToken === "function" ? authToken() : authToken;
      if (!!authorization) {
        if (authorization.indexOf("Bearer") === -1) {
          authorization = `Bearer ${authorization}`;
        }
        customHeaders["Authorization"] = authorization;
      }
    }
    if (!!ajax) {
      customHeaders["X-Requested-With"] = "XMLHttpRequest";
    }
    if (!!accepts) {
      customHeaders["Accept"] = (function() {
        if (typeof accepts === "string") {
          return accepts
            .split(";")
            .map(parseMime)
            .join(";");
        }
        if (Array.isArray(accepts)) {
          return accepts.map(parseMime).join(";");
        }
        if (typeof accepts === "function") {
          return accepts();
        }
        return accepts;
      })();
    }

    const requestConfig = {
      method,
      withCredentials: !!withCredentials,
      headers: { ...headers, ...customHeaders },
    };

    let params =
      !isPost && !!dataEvent && !isEventData ? dataEvent : concatParams(this.props.params, this.state.params);

    if (typeof url === "function") {
      requestConfig.url = url(!!params ? params : {});
    } else {
      requestConfig.url = url;

      if (!!params) {
        if (typeof params !== "string" && _isPlainObject(params)) {
          params = serialize(params);
        }
        if (typeof params === "string") {
          requestConfig.url = (
            requestConfig.url +
            (requestConfig.url.indexOf("?") === -1 ? "?" : "&") +
            params
          ).replace(/\?&/gi, "?");
        } else {
          requestConfig.params = params;
        }
      }
    }

    if (isPost) {
      let data = !!dataEvent && !isEventData ? dataEvent : concatParams(this.props.postData, this.state.postData);
      if (!!data && contentType.indexOf("x-www-form-urlencoded") !== -1 && _isPlainObject(data)) {
        data = serialize(data);
      }
      requestConfig.data = data;
    }

    if (!!responseType) {
      requestConfig.responseType = responseType;
    }

    this.setState({ isLoading: true, error: null }, () =>
      fetchCreator({ ...requestConfig, ...axiosConfig, ...customRequest })
        .then(response => {
          if (!this._mounted) {
            return;
          }

          this.setState(
            {
              response,
              data: response.data,
              isLoading: false,
            },
            () => {
              if (!!onResponse) onResponse(response);
            }
          );
        })
        .catch(error => {
          if (!this._mounted) {
            return;
          }

          const transformedError = transformError({ ...error });

          this.setState(
            () => {
              const errorState = {
                error: `${!!transformedError && typeof transformedError === "string" ? transformedError : error}`,
                response: null,
                data: null,
                isLoading: false,
              };
              if (!!transformedError && typeof transformedError === "object" && "response" in transformedError) {
                errorState.response = transformedError.response;

                if (!!errorState.response && typeof errorState.response === "object" && "data" in errorState.response) {
                  errorState.data = errorState.response.data;
                }
              }

              return errorState;
            },
            () => {
              if (!!onError) onError(transformedError);
            }
          );
        })
    );
  };
  setCustomState = state => {
    if (!!state && (typeof state === "object" || typeof state === "function")) {
      let hasCustom = false;
      let customState = this.state.customState;

      if (typeof state === "function") {
        state = state({
          params: this.state.params,
          postData: this.state.postData,
          ...customState,
        });
        if (typeof state !== "object") {
          return;
        }
      }

      Object.keys(state).forEach(k => {
        if (["params", "postData", "data"].indexOf(k) !== -1) {
          if (!_isEqual(this.state[k], state[k])) {
            this.setState({ [k]: state[k] });
          }
        } else {
          customState[k] = state[k];
          hasCustom = true;
        }
      });

      if (hasCustom) {
        this.setState({ customState });
      }
    }
  };
  render() {
    if (!!this.props.children && typeof this.props.children === "function") {
      return (
        this.props.children({
          fetch: this.fetch,
          isLoading: this.state.isLoading,
          response: this.state.response,
          data: this.state.data,
          error: this.state.error,
          params: concatParams(this.props.params, this.state.params),
          postData: concatParams(this.props.postData, this.state.postData),
          state: this.state.customState,
          set: this.setCustomState,
        }) || null
      );
    }

    return null;
  }
  _mounted = false;
}
