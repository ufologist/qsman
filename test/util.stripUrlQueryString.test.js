var stripUrlQueryString = require('../src/util.js').stripUrlQueryString;

test('URL 上没有参数', function() {
    var url = stripUrlQueryString('http://domain.com');
    expect(url).toBe('http://domain.com');
});

test('URL 上没有参数时以斜杠结尾', function() {
    var url = stripUrlQueryString('http://domain.com/');
    expect(url).toBe('http://domain.com/');
});

test('URL 有 hash', function() {
    var url = stripUrlQueryString('http://domain.com#/path/b?a=1');
    expect(url).toBe('http://domain.com');
});

test('URL 上有参数', function() {
    var url = stripUrlQueryString('http://domain.com?a=1');
    expect(url).toBe('http://domain.com');
});

test('URL 上有参数带了多余的问号', function() {
    var url = stripUrlQueryString('http://domain.com??a=1');
    expect(url).toBe('http://domain.com');
});

test('URL 上有参数穿插了多余的问号', function() {
    var url = stripUrlQueryString('http://domain.com???a=1?b=2&c=3');
    expect(url).toBe('http://domain.com');
});

test('URL 有 hash 同时有参数', function() {
    var url = stripUrlQueryString('http://domain.com?a=1#/path/b?c=2');
    expect(url).toBe('http://domain.com');
});