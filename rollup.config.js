// import commonjs from 'rollup-plugin-commonjs';
// import nodeResolve from 'rollup-plugin-node-resolve';
import {
    uglify
} from 'rollup-plugin-uglify';

var plugins = [
    // nodeResolve({
    //     jsnext: true,
    //     main: true
    // }),
    // commonjs(),
    // uglify()
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