import {
    getUrlHash
} from '../src/util.js';

test('URL 上没有 hash', function() {
    var hash = getUrlHash('http://domain.com');
    expect(hash).toBe('');
});

test('URL 有 hash', function() {
    var hash = getUrlHash('http://domain.com#/path/b?a=1');
    expect(hash).toBe('/path/b?a=1');
});

test('URL 有 hash 同时有参数', function() {
    var hash = getUrlHash('http://domain.com?a=1#/path/b?c=2');
    expect(hash).toBe('/path/b?c=2');
});

test('URL 有多余的井号', function() {
    var hash = getUrlHash('http://domain.com??a=1##/path/a/b?a=1&b=2#');
    expect(hash).toBe('#/path/a/b?a=1&b=2#');
});