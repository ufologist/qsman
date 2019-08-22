# qsman: query string maintainer

[![NPM version][npm-image]][npm-url] [![Build Status][ci-status-image]][ci-status-url] [![Coverage Status][coverage-status-image]][coverage-status-url] [![Known Vulnerabilities][vulnerabilities-status-image]][vulnerabilities-status-url] [![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[vulnerabilities-status-image]: https://snyk.io/test/npm/qsman/badge.svg
[vulnerabilities-status-url]: https://snyk.io/test/npm/qsman
[ci-status-image]: https://travis-ci.org/ufologist/qsman.svg?branch=master
[ci-status-url]: https://travis-ci.org/ufologist/qsman
[coverage-status-image]: https://coveralls.io/repos/github/ufologist/qsman/badge.svg?branch=master
[coverage-status-url]: https://coveralls.io/github/ufologist/qsman
[npm-image]: https://img.shields.io/npm/v/qsman.svg?style=flat-square
[npm-url]: https://npmjs.org/package/qsman
[license-image]: https://img.shields.io/github/license/ufologist/qsman.svg
[license-url]: https://github.com/ufologist/qsman/blob/master/LICENSE
[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/qsman/blob/master/CHANGELOG.md

[![npm-image](https://nodei.co/npm/qsman.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.com/package/qsman)

解析和维护(增删改查) URL 上的参数, 拼接 URL 参数的时候再也不用判断是追加 `?` 还是 `&` 了

## Example

```javascript
import QsMan from 'qsman';

var url = new QsMan('https://domain.com?number=1000').append({
    number: 1,
    string: '2',
    booleanTrue: true,
    booleanFalse: false,
    null: null,
    undefined: undefined,
    array: [100, 101],            // 支持数组
    encode: '中文: 100%',         // 会做 URL 编码
    decode: '%E7%BC%96%E7%A0%81', // 支持已经通过 URL 编码的字符串
}).toString();

// https://domain.com?number=1000&number=1&string=2&booleanTrue=true&booleanFalse=false&null=&undefined=&array=100&array=101&encode=%E4%B8%AD%E6%96%87%3A%20100%25&decode=%E7%BC%96%E7%A0%81
console.log(url);
```

## APIDoc

* [ESDoc](https://doc.esdoc.org/github.com/ufologist/qsman/)
* 兼容所有支持 [ES5](https://kangax.github.io/compat-table/es5/) 的浏览器

  > * 提问: 如果想兼容 IE6 怎么办?
  > * 回答
  >   * 构建的时候安装和使用 [babel-plugin-transform-es3-memeber-and-property-regenerator](https://www.npmjs.com/package/babel-plugin-transform-es3-memeber-and-property-regenerator) 解决保留关键字的问题
  >   * 在页面中使用 [es5-shim](https://github.com/es-shims/es5-shim)

## 为什么造轮子

找了很多库都只能一次性解析 query string, 不能方便地维护 query string, 也不能方便地将 query string 再追加到 URL 上

例如
* [querystringify](https://www.npmjs.com/package/querystringify)
* [qs](https://www.npmjs.com/package/qs)