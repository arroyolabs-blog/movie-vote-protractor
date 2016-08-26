describe('Movie Vote App - Home Page', function() {

    // in order to test a non-angular app, we need to make sure we 
    // tun off the synchronization detection that would
    // prevent stuff from loading
    beforeEach(function() {
        dv.ignoreSynchronization = true;
    });

    // helper method to load the home page and return a promise
    function loadHomePage() {
        return dv.get('http://localhost:8000/');
    }

    // helper for taking screenshots
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

    //afterEach(function() {
    //    var passed = jasmine.getEnv().currentSpec.results().passed();
    //    if (!passed) {
    //        var fs = require('file-system');
    //        dv.takeScreenshot().then((png) => {
    //              writeScreenShot(png, 'foo.png');
    //        });
    //    }
    //});

    it('should see rendered page elements', function() {
        loadHomePage().then(function () {

            // check the title exists
            expect(dv.getTitle()).toEqual('Movie Vote');

            var foo = dv.findElements(By.xpath('//*[@id="votes"]')).then(function(el) { 
                expect(el.length).toEqual(1); 
            });
        });
    });

    it('should increment vote count when clicking upvote', function() {
        loadHomePage().then(function () {
            var votes = dv.findElement(by.id('votes'));
            expect(votes.getText()).toEqual("0");
            dv.findElement(by.id('upvote')).click();
            expect(dv.findElement(by.id('votes')).getText()).toEqual("1");

            dv.findElement(by.id('upvote')).click();
            dv.findElement(by.id('upvote')).click();
            expect(dv.findElement(by.id('votes')).getText()).toEqual("3");
        });
    });

    it('should decrement vote count when clicking downvote', function() {
        loadHomePage().then(function () {
            expect(dv.findElement(by.id('votes')).getText()).toEqual("0");
            dv.findElement(by.id('downvote')).click();
            expect(dv.findElement(by.id('votes')).getText()).toEqual("-1");

            dv.findElement(by.id('upvote')).click();
            dv.findElement(by.id('upvote')).click();
            dv.findElement(by.id('upvote')).click();
            dv.findElement(by.id('downvote')).click();
            expect(dv.findElement(by.id('votes')).getText()).toEqual("1");
        });
    });

});
