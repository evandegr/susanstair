/**
 * @author Evan Vandegriff
 */

(function(){
	initCarousel();
	
	function initCarousel(){
		var $templates = $('#templates');
		
		$.get('templates/slideshow.html',function(data){
			$templates.append($(data));
			fillCarousel('../json/rockfaces.json');
		});
	}

	function fillCarousel(jsonFileName){
		var $templates = $('#templates');
		
		getCarouselData(jsonFileName);
	}
	
	function getCarouselData(jsonFileName) {
	    $.getJSON(jsonFileName, function (data) {
	        buildCarousel(data);
	        return data;
	    });
	}
	
	function buildCarousel (data){
		var $templates = $('#templates'),
		$carousel = $templates.find('#myCarousel'),
		$item = $templates.find('.item').clone();
		
		$carousel.find('.item').remove();
		$.each(data,function(){
			var $itemClone = $item.clone();
			
			$itemClone.find('.image').attr('src', this.src);
			$itemClone.find('.image').data('id', this.id);
			$itemClone.find('.thumbnail-label').text(this.label);
			$itemClone.find('.description').text(this.description);
			
			$carousel.find('.carousel-inner').prepend($itemClone);
		});

		$('.viewer').append($carousel);
		
		$carousel.carousel();

	}

})();