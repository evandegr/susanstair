/**
 * @author Evan Vandegriff
 */

(function(){
	initCarousel();
	
	function initCarousel(){
		var $templates = $('#templates');
		
		$templates.load('templates/slideshow.html',fillCarousel);
	}
	
	
	function fillCarousel(jsonFileName){
		var $templates = $('#templates');
		
		function getAllSupportedItems( ) {
		    return $.getJSON(jsonFileName).pipe(function (data) {
		        return data.items;
		    });
		}

		// Usage:
		getAllSupportedItems.done(function (items) {
		    // you have your items here
		});
	}
})();