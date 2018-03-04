const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isEnvDevelopment = env === 'development';
const isEnvProduction = env === 'production';
const isEnvTest = env === 'test';

module.exports = function(api) {
  api.cache(!isEnvProduction);

  return {
    presets: [
      isEnvTest && [
        require('@babel/preset-env').default,
        { targets: { node: 'current' } },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        require('@babel/preset-env').default,
        { useBuiltIns: 'entry' },
      ],
      [
        require('@babel/preset-react').default,
        { development: isEnvDevelopment || isEnvTest },
      ],
    ].filter(Boolean),
    plugins: [
      isEnvDevelopment && require('react-hot-loader/babel').default,
      [
        require('babel-plugin-emotion'),
        {
          hoist: isEnvProduction,
          sourceMap: isEnvDevelopment,
          autoLabel: isEnvDevelopment,
          labelFormat: '[filename]-[local]',
        },
      ],
      require('@babel/plugin-transform-destructuring').default,
      require('@babel/plugin-proposal-class-properties').default,
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        { useBuiltIns: true },
      ],
      [
        require('@babel/plugin-transform-react-jsx').default,
        { useBuiltIns: true },
      ],
      isEnvProduction && [
        require('@babel/plugin-transform-react-display-name').default,
        { removeImport: true },
      ],
      isEnvProduction && [
        require('babel-plugin-transform-react-remove-prop-types').default,
        { removeImport: true },
      ],
    ].filter(Boolean),
  };
};
