module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@api': './src/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@config': './src/config',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@pages': './src/pages',
            '@redux': './src/redux',
            '@router': './src/router',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            types: './src/types',
            '@utils': './src/utils',
          },
        },
      ],
      'nativewind/babel',
    ],
  };
};
