describe('Arroyo Labs Homepage', function() {

    beforeEach(function() {
        dv.ignoreSynchronization = true;
    });

    // helper method to load the home page and return a promise
    function loadHomePage() {
        return dv.get('http://www.arroyolabs.com/');
    }

    // cause an expected failure to make sure we take a screenshot
    it('should see rendered page elements', function() {
        loadHomePage().then(function () {
            expect(dv.getTitle()).toEqual('Arroyo Labs');
        });
    });

});
