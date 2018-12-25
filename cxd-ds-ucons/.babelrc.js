module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    process.env.PLUGINS && 'transform-es2015-modules-strip',
    '@babel/proposal-object-rest-spread'
  ].filter(Boolean),
  env: {
    test: {
      plugins: [ 'istanbul' ]
    }
  },
  ignore: [
    './lib'
  ]
  
  
    
}

