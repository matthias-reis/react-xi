/**
 * Closely based on:
 *
 * xr (c) James Cleveland 2015
 * URL: https://github.com/radiosilence/xr
 * License: BSD
 */
(function(xing) {
  var Methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    OPTIONS: 'OPTIONS'
  };

  var Events = {
    READY_STATE_CHANGE: 'readystatechange',
    LOAD_START: 'loadstart',
    PROGRESS: 'progress',
    ABORT: 'abort',
    ERROR: 'error',
    LOAD: 'load',
    TIMEOUT: 'timeout',
    LOAD_END: 'loadend'
  };

  var defaults = {
    method: Methods.GET,
    data: undefined,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    dump: JSON.stringify,
    load: JSON.parse,
    xmlHttpRequest: function xmlHttpRequest() {
      return new XMLHttpRequest();
    },
    promise: function promise(fn) {
      return new Promise(fn);
    }
  };

  function serialize(obj, prefix) {
    let serialized = [];

    for(let param in obj) {
      if (obj.hasOwnProperty(param)) {
        let key = prefix ? prefix + "[" + param + "]" : param
        let value = obj[param];

        if (typeof(value) == "object") {
          serialized.push(serialize(value, key));
        }
        else {
          serialized.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      }
    }

    return serialized.join("&");
  }

  function res(xhr) {
    return {
      status: xhr.status,
      response: xhr.response,
      xhr: xhr
    };
  }

  function assign(l) {
    for (var _len = arguments.length, rs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rs[_key - 1] = arguments[_key];
    }

    for (var i in rs) {
      if (!({}).hasOwnProperty.call(rs, i)) continue;
      var r = rs[i];
      if (typeof r !== 'object') continue;
      for (var k in r) {
        if (!({}).hasOwnProperty.call(r, k)) continue;
        l[k] = r[k];
      }
    }
    return l;
  }

  function urlEncode(params) {
    var paramStrings = [];
    for (var k in params) {
      if (!({}).hasOwnProperty.call(params, k)) continue;
      paramStrings.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
    }
    return paramStrings.join('&');
  }

  var config = {};

  function configure(opts) {
    config = assign({}, config, opts);
  }

  function promise(args, fn) {
    return (args && args.promise ? args.promise : config.promise || defaults.promise)(fn);
  }

  function xr(args) {
    return promise(args, function(resolve, reject) {
      var opts = assign({}, defaults, config, args);
      var xhr = opts.xmlHttpRequest();

      xhr.open(opts.method, opts.params ? opts.url.split('?')[0] + '?' + urlEncode(opts.params) : opts.url, true);

      xhr.addEventListener(Events.LOAD, function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          var _data = null;
          if (xhr.responseText) {
            _data = opts.raw === true ? xhr.responseText : opts.load(xhr.responseText);
          }
          resolve(_data);
        } else {
          reject(res(xhr));
        }
      });

      xhr.addEventListener(Events.ABORT, function() {
        return reject(res(xhr));
      });
      xhr.addEventListener(Events.ERROR, function() {
        return reject(res(xhr));
      });
      xhr.addEventListener(Events.TIMEOUT, function() {
        return reject(res(xhr));
      });

      var k;
      for (k in opts.headers) {
        if (!({}).hasOwnProperty.call(opts.headers, k)) continue;
        xhr.setRequestHeader(k, opts.headers[k]);
      }

      for (k in opts.events) {
        if (!({}).hasOwnProperty.call(opts.events, k)) continue;
        xhr.addEventListener(k, opts.events[k].bind(null, xhr), false);
      }

      var data = typeof opts.data === 'object' && !opts.raw ? serialize(opts.data) : opts.data;
      console.log(serialize(opts.data));
      if (data !== undefined) xhr.send(data); else xhr.send();
    });
  }

  xr.assign = assign;
  xr.urlEncode = urlEncode;
  xr.configure = configure;
  xr.Methods = Methods;
  xr.Events = Events;
  xr.defaults = defaults;

  xing.get = function(url, params, args) {
    return xr(assign({url: url, method: Methods.GET, params: params}, args));
  };
  xing.post = function(url, data, headers, args) {
    return xr(assign({url: url, method: Methods.POST, data: data, headers: headers}, args));
  };
})(window.xing);
