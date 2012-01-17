(function($) {

	var defOptions = {
		elClass: null,
		elClassTabs: null,
		elClassTabItem: null,
		elClassCont: null,
		selectorItem: null,
		elTabs: null,
		selected: null
	};

	var uid = '__itabs__';
	
	$.fn.extend({
        itabs: function(options, arg, arg1) {
        	
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
        			    
        			    console.warn($('[data-id="'+id+'"]', self).size());
        			    
        			    if($('[data-id="'+id+'"]', self).size() < 1) 
        			        $(self).append($('<div></div>').attr('data-id', id).hide().addClass(self[uid].elClassCont));
        			    
        			});
        			
        			if(this[uid].selected) selected.call(this, this[uid].selected);
        			
        		} else {
        		
        			// cmd
        			if(options == 'select') {
        			    
        			    if($('[data-id="#'+arg+'"]', this).size() < 1)
        			        $(this).append($('<div></div>').attr('data-id', '#'+arg).hide().addClass(this[uid].elClassCont));
        			    
        			    selected.call(this, arg);
        			    
        			} else if(options == 'get') {
        			    
        			    var $e = $('> [data-id="#'+arg+'"]', this);
        			    
        			    if($e.size() < 1) {
        			        $e = $('<div></div>').attr('data-id', '#'+arg).hide().addClass(this[uid].elClassCont);
        			        $(this).append($e);
        			    }
        			    
        			    if(typeof arg1 == 'function') arg1.call(this, $e.get(0));
        			    
        			}
        			
        		}
        		
        	});
        	
        	return this;
        }
    });
    
    function selected(id) {
    
        var self = this;
        
        var $tabs = $(this[uid].elTabs, this);
        $(this[uid].selectorItem, $tabs).removeClass(this[uid].elClassTabItem)
        $('> [data-id^="#"]', this).hide();
        
        $(this[uid].selectorItem, $tabs).each(function() {
            if($('[href^="#'+id+'"]', this).size() > 0) $(this).addClass(self[uid].elClassTabItem);
        });
        
        $('> [data-id="#'+id+'"]', this).show();
        
    }
    
    $.extend({
        itabs: function(options, arg) {
        	if(options == 'default') {
    			defOptions = $.extend({}, defOptions, arg);
    		}
        }
    });
	
})(jQuery);
