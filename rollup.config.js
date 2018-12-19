import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
    input : 'lib/index.js',

    output : {
        file   : 'dist/index.js',
        format : 'umd',
        name   : 'ReactMVx',
        exports: 'named',
        globals: {
            react: 'React',
            'type-r': 'Nested',
            'prop-types': 'PropTypes' //just to silence warning. Actually does not matter. window.PropTypes is undefined, same result as using webpack
        }
    },
    plugins: [
        resolve(), //for support of `import X from "directory"` rather than verbose `import X from "directory/index"`
        uglify()
    ],
    sourcemap: true,
    external: [
        'react',
        'type-r',
        'prop-types',
        'valuelink'
    ]
};