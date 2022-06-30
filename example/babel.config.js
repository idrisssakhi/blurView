const path = require('path');
const libApi = require('../package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          [libApi.name]: path.join(__dirname, '..', libApi.source),
        },
      },
    ],
  ],
};
