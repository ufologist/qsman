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
import {
    QsMan
} from 'qsman';

var url = new QsMan('https://domain.com?foo=bar').append({
    a: 1,
    b: 2,
    c: '中文'
}).toString();

// https://domain.com?foo=bar&a=1&b=2&c=%E4%B8%AD%E6%96%87
console.log(url);
```

## APIDoc

[ESDoc](https://doc.esdoc.org/github.com/ufologist/qsman/)