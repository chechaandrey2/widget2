(function($) {

	var defOptions = {
		plClass: null,
		contClass: null,
		placeholder: false
	};
	
	var inputSupport = 'placeholder' in document.createElement('input'),
	    textareaSupport = 'placeholder' in document.createElement('textarea');
	
	var uid = '__iplaceholder__';
	
	$.fn.extend({
        iplaceholder: function(options, arg) {
        	
        	options = options || {};
        	
        	if(!inputSupport || !textareaSupport || defOptions.placeholder || options.placeholder) {
        		
        		$(this).each(function() {
        		
        			$('input[placeholder], textarea[placeholder]', this).each(function() {
        			
        				var self = this;
        			
        				if(!this[uid]) {
        			
        					this[uid] = $.extend({}, defOptions, options);
        				
        					var $e = $('<div></div>').addClass(this[uid].plClass).html($(this).attr('placeholder')).hide()
        					.css('position', 'absolute').css('z-index',($(this).css('z-index')-0+1))
        					.bind('click', function() {
        						$(this).hide();
        						$(self).focus();
        					});
        					
        					var $input = $(this).wrap($('<div></div>').addClass(this[uid].contClass).css('position', 'relative'))
        					.css('position', 'relative').css('top', '0px').css('left', '0px')
        					.bind('focus', function() {
        						$e.hide();
        					}).bind('blur', function() {
        						var val = $(this).val();
        						if(!val || (val+'').length < 1) $e.show();
        					});
        				
        					$input.parent().append($e);
        				
        					var val = $(this).val();
        					if(!val || (val+'').length < 1) $e.show();
        					
        					this[uid]['$e'] = $e;
        				
        				} else {
        				
        					// cmd
        					var val = $(this).val();
        					if(!val || (val+'').length < 1) this[uid]['$e'].show(); else this[uid]['$e'].hide();
        				
        				}
        			
        			});
        		
        		});
        		
        	}
        	
        	return this;
        }
    });
    
    $.extend({
    	iplaceholder: function(options, arg) {
    		if(options == 'default') {
    			defOptions = $.extend({}, defOptions, arg);
    		}
    	}
    });
	
})(jQuery);
