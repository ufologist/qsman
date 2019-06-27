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
        a: 1,
        b: undefined,
        c: '',
        d: '2',
        e: null,
        f: parseInt('a'), // NaN
        g: 1 / 0, // Infinity
        h: '中文',
        i: '%E4%B8%AD%E6%96%87',
        j: [100, 101]
    });
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
        value: ''
    }, {
        key: 'f',
        value: ''
    }, {
        key: 'g',
        value: ''
    }, {
        key: 'h',
        value: '中文'
    }, {
        key: 'i',
        value: '中文'
    }, {
        key: 'j',
        value: '100'
    }, {
        key: 'j',
        value: '101'
    }]);
});