// import commonjs from 'rollup-plugin-commonjs';
// import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import {
    uglify
} from 'rollup-plugin-uglify';

var plugins = [
    // nodeResolve({
    //     jsnext: true,
    //     main: true
    // }),
    // commonjs(),
    babel({
        exclude: 'node_modules/**'
    }),
    uglify()
];

export default [{
    input: 'src/qsman.js',
    output: {
        file: 'dist/qsman.js',
        format: 'umd',
        name: 'QsMan'
    },
    plugins: plugins
}];