exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    onPrepare: function() {
        global.dv = browser.driver;
    },
    specs: ['./*.spec.js']
}
