import {
    getUrlQueryString
} from '../src/util.js';

test('URL 上没有参数', function() {
    var querystring = getUrlQueryString('http://domain.com');
    expect(querystring).toBe('');
});

test('URL 有参数', function() {
    var querystring = getUrlQueryString('http://domain.com?a=1');
    expect(querystring).toBe('a=1');
});

test('URL 有 hash 同时有参数', function() {
    var querystring = getUrlQueryString('http://domain.com?a=1#/path/b?c=2');
    expect(querystring).toBe('a=1');
});