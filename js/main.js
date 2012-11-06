/**
 * @author Evan Vandegriff
 */

(function(){
	
	var url = window.location.href.split('.')[0].split('/'),
	url_root = window.location.href.split('/').length > 2 ? '../' : '',
	jsonfilename = url[url.length-1],
	jsonfullpath = url_root + 'json/' + jsonfilename + '.json';
	
	initCarousel();
	
	function initCarousel(){
		var $templates = $('#templates');
		
		$.get(url_root + 'templates/slideshow.html',function(data){
			$templates.append($(data));
			$.get(url_root + 'templates/thumbnail.html',function(data){
				$templates.append($(data));
				fillCarousel(jsonfullpath);
			});
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
		$thumbnailviewer = $templates.find('.thumbnailViewer'),
		$thumb = $thumbnailviewer.find('.thumbImg').clone(),
		$item = $templates.find('.item').clone();
		
		$carousel.find('.item').remove();
		$thumbnailviewer.find('.thumbnail').remove();
		
		$.each(data,function(){
			var $itemClone = $item.clone(),
			$thumbClone = $thumb.clone();
			
			$itemClone.find('.image').attr('src', this.src);
			$itemClone.find('.image').data('id', this.id);
			$itemClone.find('.thumbnail-label').text(this.label);
			$itemClone.find('.description').text(this.description);
			
			$thumbClone.attr('src', this.thumbnailsrc);
			$thumbClone.data('id', this.id);
			
			$thumbnailviewer.prepend($thumbClone);
			$carousel.find('.carousel-inner').prepend($itemClone);
		});

		$('.viewer').append($carousel);
		$('.viewer').append($thumbnailviewer)
		
		$carousel.carousel();
		$carousel.on('slid', function(){
			$carousel.carousel('pause');
		});
		
		$thumbnailviewer.find('.thumbImg').on('click', function(){
			$carousel.carousel($(this.data('id') - 1));
		});

	}

})();