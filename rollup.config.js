
// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';

export default {
  entry : 'index.js',
  dest  : 'build/index.js',
  format: 'umd',
  moduleName  : 'Wagon',
  plugins: [
    /*
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          'es2015',
          {
              modules: false
          }
        ]
      ],
      plugins: [
        'external-helpers'
      ]
    })
  */
  buble()
  ]
}
