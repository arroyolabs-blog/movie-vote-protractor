// example page object
var MovieVote = function() {

    // get the page via browser
    this.get = function() {
        dv.get('http://localhost:8000/')
    };

    // return the value of vote text after executing a promise
    this.getVotesText = function() {
        return dv.findElement(By.id('votes')).then(function(el) { 
            return el.getText();
        });
    };

};

describe('Movie Vote App - Home Page', function() {

    // initialize a page object as a fixture
    var movieVoteObj = new MovieVote();
    movieVoteObj.get();

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

    it('should see rendered page elements', function() {
        loadHomePage().then(function () {

            /*
            Testing Elements
            */

            // The Webdriver has a built in method to check the page title. This is useful to make
            // sure were on the page we expect when navigating
            expect(dv.getTitle()).toEqual('Movie Vote');


            // counting elements instances can be a fragile way to test, but is
            // often the easiest way to make sure the stuff we expect shows up 
            // on the page

            // Get elements via XPath Selectors and check counts
            dv.findElements(By.xpath('//*[@id="votes"]')).then(function(el) { 
                expect(el.length).toEqual(1); 
            });

            dv.findElements(By.xpath('/html/body/ul/li')).then(function(el) { 
                expect(el.length).toEqual(2); 
            });

            // Get elements via CSS ID and check the count
            dv.findElements(By.id('votes')).then(function(el) { 
                expect(el.length).toEqual(1); 
            });

            expect(movieVoteObj.getVotesText()).toEqual('0');
        
        });
    });

    /*
    Test some of the user actions associated with the web app itself.

    In this case, we should test the upvote and downvote buttons.
    */

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
