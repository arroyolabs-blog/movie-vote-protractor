describe('Movie Vote App - Home Page - Expected Failure', function() {

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

    // cause an expected failure to make sure we take a screenshot
    it('should see rendered page elements', function() {
        loadHomePage().then(function () {
            expect(dv.getTitle()).toEqual('Not the title');
        });
    });

});
