'use strict';
/*
Example Movie Voter Class
*/

// namespacing is always a good habit
var AL = AL || {};

AL.movie = (function() {
 
    // default vote count
    var votes = 0;

    // increment the movies popularity
    function upvote() {
        votes += 1;
        updateVotes();
    }

    // decrement the movie's popularity
    function downvote() {
        votes -= 1;
        updateVotes();
    }

    // update the view with the current model's vote count value
    function updateVotes() {
        document.getElementById('votes').innerHTML = votes;
    }

    // add event listeners and udpate the view with the default vote count
    var init = function() {
        document.getElementById('upvote').addEventListener('click', upvote);
        document.getElementById('downvote').addEventListener('click', downvote);

        // update the view
        updateVotes();
    };

    // expose the init method
    return {
        init: init
    }
  
})();
