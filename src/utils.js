import _isPlainObject from "lodash.isplainobject";

export function isEvent(o) {
  return typeof o === "object" && !!o.type && "target" in o;
}

export function serialize(obj, prefix = false) {
  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
}

export function concatParams(a, b) {
  if (!!a && !!b) {
    if (_isPlainObject(a) && _isPlainObject(b)) {
      return Object.assign(a, b);
    }
    if (_isPlainObject(a) && typeof b === "string") {
      return (serialize(a) + "&" + b).replace(/&&/gi, "&");
    }
    if (_isPlainObject(b) && typeof a === "string") {
      return (a + "&" + serialize(b)).replace(/&&/gi, "&");
    }
    if (typeof a === "string" && typeof b === "string") {
      return (a + "&" + b).replace(/&&/gi, "&");
    }
  }

  return a || b || null;
}

export function parseMime(type, charset = "utf-8") {
  if (!!type && typeof type === "string" && type.indexOf("/") === -1) {
    switch (type.trim().toLowerCase()) {
      case "json":
        return "application/json";
      case "xml":
        return "application/xml";
      case "multipart":
        return "multipart/form-data";
      case "form":
        return "application/x-www-form-urlencoded; charset=" + charset;
      case "html":
        return "text/html";
      default:
        return "text/plain";
    }
  }

  return type;
}
