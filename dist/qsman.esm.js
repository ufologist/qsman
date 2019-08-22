function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * Edge cases where we actually want to encode the value to an empty
 * string instead of the stringified value.
 * 
 * @param {*} value
 * @return {string}
 * @see querystringify
 */
function stringifyObjectValue(value) {
  var _value = value;

  if (!_value && (_value === null || _value === undefined)) {
    _value = '';
  } else if (typeof _value === 'number' && !isFinite(_value)) {
    _value = '';
  }

  return String(_value);
}
/**
 * 获取剥离了 querystring 的 URL
 * 
 * @param {string} url 
 * @return {string} 第一个问号之前的 URL(不包括第一个问号)
 */


function stripUrlQueryString(url) {
  var _url = stripUrlHash(url);

  var questionMarkIndex = _url.indexOf('?');

  return _url.substring(0, questionMarkIndex != -1 ? questionMarkIndex : _url.length);
}
/**
 * 获取剥离了 hash 的 URL
 * 
 * @param {string} url 
 * @return {string} 第一个井号之前的 URL(不包括第一个井号)
 */

function stripUrlHash(url) {
  var hashIndex = url.indexOf('#');
  return url.substring(0, hashIndex !== -1 ? hashIndex : url.length);
}
/**
 * 获取 URL 中的 querystring(不包括起始的问号)
 * 
 * @param {string} url 
 * @return {string}
 */

function getUrlQueryString(url) {
  var _url = stripUrlHash(url);

  var questionMarkIndex = _url.indexOf('?');

  return questionMarkIndex !== -1 ? _url.substring(questionMarkIndex + 1) : '';
}
/**
 * 获取 URL 中的 hash(不包括起始的井号)
 * 
 * @param {string} url 
 * @return {string}
 */

function getUrlHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex !== -1 ? url.substring(hashIndex + 1) : '';
}
/**
 * 解析 querystring
 * 
 * @param {string | object} queryString 不包含起始问号的 querystring
 * @return {Array<Object>} 解析出来的 querystring 数组
 * [{
 *     key: 'key1',
 *     value: 'value1'
 * }, {
 *     key: 'key2',
 *     value: 'value2'
 * }]
 */

function parseQueryString(queryString) {
  var kvs = [];

  if (!queryString) {
    return kvs;
  }

  if (typeof queryString === 'string') {
    // 解析字符串类型的 querystring
    var kvps = queryString.split('&');

    for (var i = 0, length = kvps.length; i < length; i++) {
      var kvp = kvps[i];
      var eqIndex = kvp.indexOf('=');
      var key = '';
      var value = undefined;

      if (eqIndex !== -1) {
        key = kvp.substring(0, eqIndex);
        value = kvp.substring(eqIndex + 1, kvp.length);
      } else {
        key = kvp;
      }

      try {
        key = decodeURIComponent(key);
      } catch (error) {
        console.warn('decodeURIComponent key error, remain key', key, error);
      }

      if (typeof value !== 'undefined') {
        try {
          value = decodeURIComponent(value);
        } catch (error) {
          console.warn('decodeURIComponent value error, remain value', value, error);
        }
      } else {
        value = '';
      }

      kvs.push({
        key: key,
        value: value
      });
    }
  } else {
    // 解析对象类型的 querystring
    for (key in queryString) {
      if (Object.prototype.hasOwnProperty.call(queryString, key)) {
        var _key = key;

        try {
          _key = decodeURIComponent(_key);
        } catch (error) {
          console.warn('decodeURIComponent key error, remain key', _key, error);
        } // XXX 不解析嵌套对象


        var value = queryString[key];

        if (Object.prototype.toString.call(value) === '[object Array]') {
          value.forEach(function (item) {
            var _value = stringifyObjectValue(item);

            try {
              _value = decodeURIComponent(_value);
            } catch (error) {
              console.warn('decodeURIComponent value error, remain value', _value, error);
            }

            kvs.push({
              key: _key,
              value: _value
            });
          });
        } else {
          value = stringifyObjectValue(value);

          try {
            value = decodeURIComponent(value);
          } catch (error) {
            console.warn('decodeURIComponent value error, remain value', value, error);
          }

          kvs.push({
            key: _key,
            value: value
          });
        }
      }
    }
  }

  return kvs;
}

/**
 * 解析和维护 URL 上的参数, 接口设计参考 `URLSearchParams`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 */

var QsMan =
/*#__PURE__*/
function () {
  /**
   * @param {string} url
   */
  function QsMan(url) {
    _classCallCheck(this, QsMan);

    this._url = url || ''; // 解析 URL 已有的 querystring

    this._queryStringKvs = parseQueryString(getUrlQueryString(this._url));
  }
  /**
   * 追加 URL 参数
   *
   * @param {string | object} queryString
   * @return {object} this
   */


  _createClass(QsMan, [{
    key: "append",
    value: function append(queryString) {
      var queryStringKvs = parseQueryString(queryString);
      this._queryStringKvs = this._queryStringKvs.concat(queryStringKvs);
      return this;
    }
    /**
     * 获取找到的第一个参数值
     *
     * @param {string} name 要获取的参数名
     * @return {string | undefined}
     */

  }, {
    key: "get",
    value: function get(name) {
      return this.getAll(name)[0];
    }
    /**
     * 获取参数的所有值
     *
     * @param {string} name 要获取的参数名
     * @return {Array<string>}
     */

  }, {
    key: "getAll",
    value: function getAll(name) {
      return this._queryStringKvs.filter(function (kv) {
        return kv.key === name;
      }).map(function (kv) {
        return kv.value;
      });
    }
    /**
     * 设置参数值
     *
     * @param {string} name
     * @param {string | Array<string>} value
     * @return {object} this
     */

  }, {
    key: "set",
    value: function set(name, value) {
      var kvMap = {};
      kvMap[name] = value; // 解析出 value 值

      var valueQueryStringKvs = parseQueryString(kvMap);

      var found = this._queryStringKvs.filter(function (kv) {
        return kv.key === name;
      });

      if (found.length > 0) {
        // 记录要设置的参数的位置
        var kvIndex = this._queryStringKvs.indexOf(found[0]); // 先删除再插入


        this.delete(name); // 在追加的位置切一刀(将需要替换的元素排除掉)

        var left = this._queryStringKvs.slice(0, kvIndex);

        var right = this._queryStringKvs.slice(kvIndex + 1); // 在左边追加参数


        for (var i = 0, length = valueQueryStringKvs.length; i < length; i++) {
          left.push(valueQueryStringKvs[i]);
        }

        this._queryStringKvs = left.concat(right);
      } else {
        this.append(kvMap);
      }

      return this;
    }
    /**
     * 是否有某个参数
     *
     * @param {string} name
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has(name) {
      return this._queryStringKvs.filter(function (kv) {
        return kv.key === name;
      }).length > 0;
    }
    /**
     * 删除某个参数
     *
     * @param {string} name
     * @return {object} this
     */

  }, {
    key: "delete",
    value: function _delete(name) {
      var queryStringKvs = this._queryStringKvs;
      queryStringKvs.filter(function (kv) {
        return kv.key === name;
      }).forEach(function (item) {
        var kvIndex = queryStringKvs.indexOf(item);
        queryStringKvs.splice(kvIndex, 1);
      });
      return this;
    }
    /**
     * 获取所有参数的名称
     *
     * @return {Array<string>}
     */

  }, {
    key: "keys",
    value: function keys() {
      return this._queryStringKvs.reduce(function (keys, kv) {
        if (keys.indexOf(kv.key) === -1) {
          keys.push(kv.key);
        }

        return keys;
      }, []);
    }
    /**
     * 对参数进行升序排序
     *
     * @return {object} this
     */

  }, {
    key: "sort",
    value: function sort() {
      this._queryStringKvs.sort(function (kv1, kv2) {
        var compareResult;

        if (kv1.key > kv2.key) {
          compareResult = 1;
        } else if (kv1.key < kv2.key) {
          compareResult = -1;
        } else {
          compareResult = 0;
        }

        return compareResult;
      });

      return this;
    }
    /**
     * 拼装 URL
     *
     * @param {boolean} [includeEmptyStringValue=true] 是否包含空字符串参数值的参数
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      var includeEmptyStringValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var url = '';
      var queryStringKvs = this._queryStringKvs; // 排除空字符串的 KEY

      queryStringKvs = queryStringKvs.filter(function (kv) {
        return kv.key !== '';
      });

      if (!includeEmptyStringValue) {
        queryStringKvs = queryStringKvs.filter(function (kv) {
          return kv.value !== '';
        });
      }

      var queryString = queryStringKvs.map(function (kv) {
        var key = encodeURIComponent(kv.key);
        var value = encodeURIComponent(kv.value);
        return key + '=' + value;
      }).join('&'); // 重组 URL

      url = stripUrlQueryString(this._url);

      if (queryString) {
        url = url ? url + '?' + queryString : queryString;
      }

      var hash = getUrlHash(this._url);

      if (hash) {
        url = url + '#' + hash;
      }

      return url;
    }
    /**
     * 替换 URL 参数
     *
     * @param {string | object} queryString
     * @return {object} this
     */

  }, {
    key: "replace",
    value: function replace(queryString) {
      var queryStringKvs = parseQueryString(queryString);

      for (var i = 0, length = queryStringKvs.length; i < length; i++) {
        this.delete(queryStringKvs[i].key);
      }

      this.append(queryString);
      return this;
    }
    /**
     * 获取参数对象
     *
     * @return {object} 返回包含了所有参数的对象, 例如: `{key1: 'value1', key2: 'value2', key3: ['value3', 'value4']}`
     */

  }, {
    key: "getObject",
    value: function getObject() {
      return this._queryStringKvs.reduce(function (object, kv) {
        var key = kv.key;
        var value = kv.value;
        var objectValue = object[key];

        if (typeof objectValue === 'undefined') {
          object[key] = value;
        } else {
          if (Object.prototype.toString.apply(objectValue) === '[object Array]') {
            // 找到多个
            objectValue.push(value);
          } else {
            object[key] = [objectValue, value];
          }
        }

        return object;
      }, {});
    }
  }]);

  return QsMan;
}();

export default QsMan;
