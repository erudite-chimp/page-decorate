(function ( $ ) {
	$.fn.pageProgress = function(options) {
		var settings = $.extend({
			// These are the defaults.
			handler: "scroll",
			attributes: ["label", "width", "aria-valuenow"],
			interval: 1,
			debug: 0
		}, options);

		return this.each(function() {
			$el = $(this);
			if (settings.handler == "scroll") {
				$(window).scroll(function(){
					var document_height = $(document).height() - $(window).height();
					var scroll_offset = $(document).scrollTop();
					var page_progress = Math.round((scroll_offset/document_height) * 100);
					page_progress = (page_progress < 0)
					              ? 0
					              : (page_progress > 100)
					                  ? 100
					                  : page_progress;

					if ((page_progress % settings.interval) != 0)
					{
						return;
					}
					if (settings.debug)
					{
						console.log("Page progress: " + page_progress + "%");
					}

					$.each(settings.attributes, function(i, value){
						if (value == "width") {
							$el.width(page_progress + "%");
						}
						else if (value == "label") {
							$el.css({"min-width": "2em"});
							$el.text(page_progress + "%");
						}
						else
						{
							$el.attr(value, page_progress);
						}
					});
				});
			}
		});
	};

}( jQuery ));