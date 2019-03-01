import QsMan from '../src/qsman.js';

describe('constructor', function() {
    test('不传 URL', function() {
        var qsman = new QsMan();
        expect(qsman.toString()).toBe('');
    });

    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        expect(qsman.toString()).toBe('http://domain.com');
    });

    test('URL 以斜杠结尾', function() {
        var qsman = new QsMan('http://domain.com/');
        expect(qsman.toString()).toBe('http://domain.com/');
    });

    test('URL 有 hash', function() {
        var qsman = new QsMan('http://domain.com#/path/b?a=1');
        expect(qsman.toString()).toBe('http://domain.com#/path/b?a=1');
    });

    test('URL 有参数', function() {
        var qsman = new QsMan('http://domain.com?a=1');
        expect(qsman.toString()).toBe('http://domain.com?a=1');
    });

    test('URL 有参数和 hash', function() {
        var qsman = new QsMan('http://domain.com?a=1#/path/b?c=2');
        expect(qsman.toString()).toBe('http://domain.com?a=1#/path/b?c=2');
    });

    test('URL 参数有多余的问号', function() {
        var qsman = new QsMan('http://domain.com??a=1?b=2&c=3');
        expect(qsman.toString()).toBe('http://domain.com?%3Fa=1%3Fb%3D2&c=3');
    });

    test('URL 参数有多余的 &', function() {
        var qsman = new QsMan('http://domain.com?&a=1&&b=2&&');
        expect(qsman.toString()).toBe('http://domain.com?a=1&b=2');
    });

    test('URL 参数有空值', function() {
        var qsman = new QsMan('http://domain.com?a=1&b&c=2');
        expect(qsman.toString()).toBe('http://domain.com?a=1&b&c=2');
    });

    test('URL 参数有明确的空值', function() {
        var qsman = new QsMan('http://domain.com?a=1&b=&c=2');
        expect(qsman.toString(false)).toBe('http://domain.com?a=1&b=&c=2');
    });

    test('排除 URL 没有明确空值的参数', function() {
        var qsman = new QsMan('http://domain.com?a=1&b&c=2');
        expect(qsman.toString(false)).toBe('http://domain.com?a=1&c=2');
    });
});

describe('append', function() {
    test('不传 URL', function() {
        var qsman = new QsMan();
        qsman.append({
            a: 1,
            b: 2
        });
        expect(qsman.toString()).toBe('?a=1&b=2');
    });

    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        qsman.append('a=1&b=2');
        expect(qsman.toString()).toBe('http://domain.com?a=1&b=2');

        qsman.append('a=3&d=4');
        expect(qsman.toString()).toBe('http://domain.com?a=1&b=2&a=3&d=4');
    });

    test('URL 有参数', function() {
        var qsman = new QsMan('http://domain.com/?a=1');
        qsman.append('b=2&c=3')
        expect(qsman.toString()).toBe('http://domain.com/?a=1&b=2&c=3');

        qsman.append('a=4&d=5');
        expect(qsman.toString()).toBe('http://domain.com/?a=1&b=2&c=3&a=4&d=5');
    });

    test('URL 有参数追加对象参数', function() {
        var qsman = new QsMan('http://domain.com/?a=1');
        qsman.append({
            a: [100, 200, 300],
            b: 2,
            c: 3
        });
        expect(qsman.toString()).toBe('http://domain.com/?a=1&a=100&a=200&a=300&b=2&c=3');
    });
});

describe('replace', function() {
    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        qsman.replace('a=1&b=2');
        expect(qsman.toString()).toBe('http://domain.com?a=1&b=2');

        qsman.replace('a=3&b=4');
        expect(qsman.toString()).toBe('http://domain.com?a=3&b=4');
    });

    test('追加时替换已有参数', function() {
        var qsman = new QsMan('http://domain.com/?a=1&a=2&b=200&b=201&c=300');
        qsman.replace({
            a: 100,
            b: [2000, 2001],
            c: 3
        }, true);
        expect(qsman.toString()).toBe('http://domain.com/?a=100&b=2000&b=2001&c=3');
    });
});

describe('get', function() {
    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        expect(qsman.get('a')).toBe(undefined);
    });

    test('追加字符串参数', function() {
        var qsman = new QsMan('http://domain.com');
        qsman.append('a=1');
        expect(qsman.get('a')).toBe('1');
    });

    test('追加对象参数', function() {
        var qsman = new QsMan('http://domain.com');
        qsman.append({
            a: 2
        });
        expect(qsman.get('a')).toBe('2');
    });

    test('URL 有参数', function() {
        var qsman = new QsMan('http://domain.com?a=1&b=foo&c=100&c=200&c=300');
        expect(qsman.get('a')).toBe('1');
        expect(qsman.get('b')).toBe('foo');
        expect(qsman.get('c')).toBe('100');
        expect(qsman.get('d')).toBe(undefined);
    });
});

describe('getAll', function() {
    test('追加字符串参数', function() {
        var qsman = new QsMan('http://domain.com');
        qsman.append('a=1&b=2&b=3');
        expect(qsman.getAll('a')).toEqual(['1']);
        expect(qsman.getAll('b')).toEqual(['2', '3']);
        expect(qsman.getAll('c')).toEqual([]);
    });
});

describe('getObject', function() {
    test('URL 有参数', function() {
        var qsman = new QsMan('http://domain.com?a=1&b=foo&c=100&c=200&c=300');
        expect(qsman.getObject()).toEqual({
            a: '1',
            b: 'foo',
            c: ['100', '200', '300']
        });
    });
});

describe('set', function() {
    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        expect(qsman.set('a', 1).get('a')).toBe('1');
        expect(qsman.set('a', [100, 101]).getAll('a')).toEqual(['100', '101']);
    });

    test('有参数', function() {
        var qsman = new QsMan('http://domain.com?a=1');
        expect(qsman.set('a', 2).get('a')).toBe('2');
    });

    test('参数有多个值', function() {
        var url = 'http://domain.com?a=1&a=2&a=3&b=4';

        var qsman = new QsMan(url);
        expect(qsman.set('a', 100).getAll('a')).toEqual(['100']);

        qsman = new QsMan(url);
        expect(qsman.set('a', [100, 101]).getAll('a')).toEqual(['100', '101']);
    });
});

describe('has', function() {
    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        expect(qsman.has('a')).toBe(false);
    });

    test('有参数', function() {
        var qsman = new QsMan('http://domain.com?a=1&b=2');
        expect(qsman.has('a')).toBe(true);
    });
});

describe('keys', function() {
    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        expect(qsman.keys()).toEqual([]);
    });

    test('有参数', function() {
        var qsman = new QsMan('http://domain.com?a=1&a=2&a=3&b=100&c=200');
        expect(qsman.keys()).toEqual(['a', 'b', 'c']);
    });
});

describe('delete', function() {
    test('URL 上没有参数', function() {
        var qsman = new QsMan('http://domain.com');
        expect(qsman.delete('a').toString()).toBe('http://domain.com');
    });

    test('有参数', function() {
        var url = 'http://domain.com?a=1&a=2&a=3&b=100&c=200';

        var qsman = new QsMan(url);
        expect(qsman.delete('a').toString()).toBe('http://domain.com?b=100&c=200');

        qsman = new QsMan(url);
        expect(qsman.delete('b').toString()).toBe('http://domain.com?a=1&a=2&a=3&c=200');

        qsman = new QsMan(url);
        expect(qsman.delete('a').toString()).toBe('http://domain.com?b=100&c=200');
    });
});

describe('sort', function() {
    test('有参数', function() {
        var qsman = new QsMan('http://domain.com?b=1&a=2&d=3&a=100&c=4&e=5&z=6&a=200&y=7&x=8');
        expect(qsman.sort().toString()).toBe('http://domain.com?a=2&a=100&a=200&b=1&c=4&d=3&e=5&x=8&y=7&z=6');
    });
});