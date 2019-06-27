import {
    getUrlQueryString,
    parseQueryString,
    stripUrlQueryString,
    getUrlHash
} from './util.js';

/**
 * 解析和维护 URL 上的参数, 接口设计参考 `URLSearchParams`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 */
class QsMan {
    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url || '';
        // 解析 URL 已有的 querystring
        this._queryStringKvs = parseQueryString(getUrlQueryString(this._url));
    }

    /**
     * 追加 URL 参数
     *
     * @param {string | object} queryString
     * @return {object} this
     */
    append(queryString) {
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
    get(name) {
        return this.getAll(name)[0];
    }
    /**
     * 获取参数的所有值
     *
     * @param {string} name 要获取的参数名
     * @return {Array<string>}
     */
    getAll(name) {
        return this._queryStringKvs.filter(function(kv) {
            return kv.key === name;
        }).map(function(kv) {
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
    set(name, value) {
        var kvMap = {};
        kvMap[name] = value;

        // 解析出 value 值
        var valueQueryStringKvs = parseQueryString(kvMap);

        var found = this._queryStringKvs.filter(function(kv) {
            return kv.key === name;
        });
        if (found.length > 0) {
            // 记录要设置的参数的位置
            var kvIndex = this._queryStringKvs.indexOf(found[0]);

            // 先删除再插入
            this.delete(name);
            // 在追加的位置切一刀(将需要替换的元素排除掉)
            var left = this._queryStringKvs.slice(0, kvIndex);
            var right = this._queryStringKvs.slice(kvIndex + 1);

            // 在左边追加参数
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
    has(name) {
        return this._queryStringKvs.filter(function(kv) {
            return kv.key === name;
        }).length > 0;
    }

    /**
     * 删除某个参数
     *
     * @param {string} name
     * @return {object} this
     */
    delete(name) {
        var queryStringKvs = this._queryStringKvs;
        queryStringKvs.filter(function(kv) {
            return kv.key === name;
        }).forEach(function(item) {
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
    keys() {
        return this._queryStringKvs.reduce(function(keys, kv) {
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
    sort() {
        this._queryStringKvs.sort(function(kv1, kv2) {
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
    toString(includeEmptyStringValue = true) {
        var url = '';
        var queryStringKvs = this._queryStringKvs;

        // 排除空字符串的 KEY
        queryStringKvs = queryStringKvs.filter(function(kv) {
            return kv.key !== '';
        });

        if (!includeEmptyStringValue) {
            queryStringKvs = queryStringKvs.filter(function(kv) {
                return kv.value !== '';
            });
        }

        var queryString = queryStringKvs.map(function(kv) {
            var key = encodeURIComponent(kv.key);
            var value = encodeURIComponent(kv.value);
            return key + '=' + value;
        }).join('&');

        // 重组 URL
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
    replace(queryString) {
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
    getObject() {
        return this._queryStringKvs.reduce(function(object, kv) {
            var key = kv.key;
            var value = kv.value;

            var objectValue = object[key];
            if (typeof objectValue === 'undefined') {
                object[key] = value;
            } else {
                if (Object.prototype.toString.apply(objectValue) === '[object Array]') { // 找到多个
                    objectValue.push(value);
                } else {
                    object[key] = [objectValue, value];
                }
            }

            return object;
        }, {});
    }
}

export default QsMan;