// import commonjs from 'rollup-plugin-commonjs';
// import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import {
    uglify
} from 'rollup-plugin-uglify';

var input = 'src/qsman.js';
var babelPlugin = babel({
    exclude: 'node_modules/**'
});

export default [{
    input: input,
    output: {
        file: 'dist/qsman.js',
        format: 'umd',
        name: 'QsMan'
    },
    plugins: [
        // nodeResolve({
        //     jsnext: true,
        //     main: true
        // }),
        // commonjs(),
        babelPlugin,
        uglify()
    ]
}, {
    input: input,
    output: {
        file: 'dist/qsman.common.js',
        format: 'cjs'
    },
    plugins: [
        babelPlugin
    ]
}, {
    input: input,
    output: {
        file: 'dist/qsman.esm.js',
        format: 'esm'
    },
    plugins: [
        babelPlugin
    ]
}];