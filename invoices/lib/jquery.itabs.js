(function($) {

	var defOptions = {
		elClass: null,
		elClassTabs: null,
		elClassConts: null
		elTabs: null
	};

	var uid = '__itabs__';
	
	$.fn.extend({
        itabs: function(options, arg) {
        	
        	options = options || {};
        	
        	$(this).each(function() {
        	
        		var self = this;
        		
        		if(!this[uid]) {
        			
        			this[uid] = $.extend({}, defOptions, options);
        			
        			$(this).addClass(this[uid].elClass);
        			
        			var $tabs = $(this[uid].elTabs, this);
        			
        			if($tabs.size() < 1) return;
        			
        			$tabs.addClass(this[uid].elClassTabs);
        			
        			$('[href^="#"]', $tabs).each(function() {
        			
        			    var id = $(this).attr('href');
        			    
        			    if($('[data-id="'+id+'"]', self).size() < 1) {
        			        $(self).append($('<div></div>').attr());
        			    }
        			    
        			});
        			
        		} else {
        		
        			// cmd
        			
        		}
        		
        	});
        	
        	return this;
        }
    });
    
    $.extend({
        itabs: function(options, arg) {
        	if(options == 'default') {
    			defOptions = $.extend({}, defOptions, arg);
    		}
        }
    });
	
})(jQuery);
