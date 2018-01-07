module.exports = (api, options = {}) => {
  return {
    presets: [
      [require('@babel/preset-env'), {
        modules: options.modules === false ? false : 'commonjs',
        targets: {
          browsers: [
            'chrome >= 55',
            'edge >= 15',
            'firefox >= 55',
            'opera >= 48',
            'safari >= 10.1'
          ]
        }
      }],
      [require('@babel/preset-stage-2')],
      [require('@babel/preset-typescript')]
    ],
    plugins: [
      [require('@babel/plugin-transform-react-jsx'), {
        pragma: 'jsx'
      }]
    ]
  }
}
