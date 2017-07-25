// Karma configuration
// Generated on Sun Jan 03 2016 14:44:45 GMT+0100 (Vest-Europa (normaltid))

module.exports = function (config) {
  var customLaunchers = {
    // latest ie on windows: https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support
    edge: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10'
    },
    ie11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1'
    },
    ie10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8'
    },
    firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'linux'
    },
    chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.11'
    },
    safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11'
    },
    ios: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.10',
      version: '9.2',
      deviceName: 'iPhone 6 Plus'
    },
    android7: {
      base: 'SauceLabs',
      appiumVersion: "1.6.4",
      platformVersion: '7.1',
      platformName: 'Android',
      browserName: 'Chrome',
      deviceName: 'Android GoogleAPI Emulator',
      deviceOrientation: 'portrait'
    }
  }
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'index.js',
      'test.js'
    ],
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: ['babelify']
    },
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    sauceLabs: {
      testName: 'react-animate-on-change',
      startConnect: false,  // started via travis.yml
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // how many browser should be started simultaneous
    concurrency: 5
  })
}
