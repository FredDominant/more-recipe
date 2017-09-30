
  "scripts": {
    "build": "babel --presets es2015 server -d lib",
    "start": "npm run build && node lib/bin/www.js",
    "test": "mocha lib/src/test/test.js"
  },