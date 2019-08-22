import {
    parseQueryString
} from '../src/util.js';

test('没有参数', function() {
    var querystring = parseQueryString('');
    expect(querystring).toEqual([])
});

test('字符串参数', function() {
    var querystring = parseQueryString('&a=1&b&c=&d=2&e=中文&f=%E4%B8%AD%E6%96%87&g=100&g=101');
    expect(querystring).toEqual([{
        key: '',
        value: ''
    }, {
        key: 'a',
        value: '1'
    }, {
        key: 'b',
        value: ''
    }, {
        key: 'c',
        value: ''
    }, {
        key: 'd',
        value: '2'
    }, {
        key: 'e',
        value: '中文'
    }, {
        key: 'f',
        value: '中文'
    }, {
        key: 'g',
        value: '100'
    }, {
        key: 'g',
        value: '101'
    }]);
});

test('对象参数', function() {
    var querystring = parseQueryString({
        '': undefined,

        number: 1,
        string: '2',
        booleanTrue: true,
        booleanFalse: false,
        null: null,
        undefined: undefined,
        array: [100, 101],            // 支持数组
        encode: '中文',         // 会做 URL 编码
        decode: '%E7%BC%96%E7%A0%81', // 支持已经通过 URL 编码的字符串

        emptyString: '',
        nan: parseInt('a'), // NaN
        infinity: 1 / 0, // Infinity

        encodeError: '中文: 100%' // 非 URL 编码, 会导致 decodeURIComponent 报错: URI malformed
    });
    expect(querystring).toEqual([{
        key: '',
        value: ''
    }, {
        key: 'number',
        value: '1'
    }, {
        key: 'string',
        value: '2'
    }, {
        key: 'booleanTrue',
        value: 'true'
    }, {
        key: 'booleanFalse',
        value: 'false'
    }, {
        key: 'null',
        value: ''
    }, {
        key: 'undefined',
        value: ''
    }, {
        key: 'array',
        value: '100'
    }, {
        key: 'array',
        value: '101'
    }, {
        key: 'encode',
        value: '中文'
    }, {
        key: 'decode',
        value: '编码'
    }, {
        key: 'emptyString',
        value: ''
    }, {
        key: 'nan',
        value: ''
    }, {
        key: 'infinity',
        value: ''
    }, {
        key: 'encodeError',
        value: '中文: 100%'
    }]);
});