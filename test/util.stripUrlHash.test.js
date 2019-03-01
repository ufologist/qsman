import {
    stripUrlHash
} from '../src/util.js';

test('URL 上没有 hash', function() {
    var url = stripUrlHash('http://domain.com');
    expect(url).toBe('http://domain.com');
});

test('URL 有 hash', function() {
    var url = stripUrlHash('http://domain.com#/path/b?a=1');
    expect(url).toBe('http://domain.com');
});

test('URL 有 hash 同时有参数', function() {
    var url = stripUrlHash('http://domain.com?a=1#/path/b?c=2');
    expect(url).toBe('http://domain.com?a=1');
});

test('URL 有多余的井号', function() {
    var url = stripUrlHash('http://domain.com??a=1##/path/a/b?a=1&b=2#');
    expect(url).toBe('http://domain.com??a=1');
});