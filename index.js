require('babel-register')({
  "presets": [ "es2015"],
  "plugins": ["transform-runtime", "syntax-async-functions", "transform-async-to-generator"]
});
require('./server');
