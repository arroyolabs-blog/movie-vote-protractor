exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    onPrepare: function() {
        global.dv = browser.driver;
    },
    specs: ['./*.spec.js'],
    baseUrl: 'http://localhost:8000/',

    plugins: [{
        package: 'jasmine2-protractor-utils',
        disableHTMLReport: true,
        screenshotOnSpecFailure: true,
        screenshotOnExpectFailure: true,
        screenshotPath: 'tests/screenshots'
    }]
}
