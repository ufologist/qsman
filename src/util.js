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
export function stripUrlQueryString(url) {
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
export function stripUrlHash(url) {
    var hashIndex = url.indexOf('#');
    return url.substring(0, hashIndex !== -1 ? hashIndex : url.length);
}

/**
 * 获取 URL 中的 querystring(不包括起始的问号)
 * 
 * @param {string} url 
 * @return {string}
 */
export function getUrlQueryString(url) {
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
export function getUrlHash(url) {
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
export function parseQueryString(queryString) {
    var kvs = [];

    if (!queryString) {
        return kvs;
    }

    if (typeof queryString === 'string') { // 解析字符串类型的 querystring
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

            key = decodeURIComponent(key);
            value = typeof value !== 'undefined' ? decodeURIComponent(value) : '';

            kvs.push({
                key: key,
                value: value
            });
        }
    } else { // 解析对象类型的 querystring
        for (key in queryString) {
            if (Object.prototype.hasOwnProperty.call(queryString, key)) {
                // XXX 不解析嵌套对象
                value = queryString[key];

                if (Object.prototype.toString.call(value) === '[object Array]') {
                    value.forEach(function(item) {
                        kvs.push({
                            key: decodeURIComponent(key),
                            value: decodeURIComponent(stringifyObjectValue(item))
                        });
                    });
                } else {
                    kvs.push({
                        key: decodeURIComponent(key),
                        value: decodeURIComponent(stringifyObjectValue(value))
                    });
                }
            }
        }
    }

    return kvs;
}