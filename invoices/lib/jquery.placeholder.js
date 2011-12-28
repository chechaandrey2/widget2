(function($) {
    
    var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea');
    var defOptions = {
        'class': 'placeholder'
    }
    
	$.fn.extend({
	    placeholder: function(options) {
	        
	        var opt = $.extend({}, defOptions, options);
	        
	        this.each(function() {
	            callbackBlur(this, opt['class']);
	        
	            $(this).bind('focus', function(e) {
	                callbackFocus(this, opt['class']);
	            });
	            
	            $(this).bind('blur', function(e) {
	                callbackBlur(this, opt['class']);
	            });
	        });
	        
	        return this;
	        
	    },
	    removePlaceholder: function(options) {
	    
	        var opt = $.extend({}, defOptions, options);
	        
	        this.each(function() {
	            callbackFocus(this, opt['class']);
	        });
	        
	        return this;
	    }
	});
	
	function callbackFocus(el, className) {
	    if(isInputSupported && isTextareaSupported) {
	        $(el).removeClass(className);
	    } else {
	        if($(el).hasClass(className)) {
	            $(el).removeClass(className);
	            $(el).val('');
	        }
	    }
	}
	
	function callbackBlur(el, className) {
	    if(isInputSupported && isTextareaSupported) {
	        if(($(el).val()+'').length <= 0) {
	            $(el).addClass(className);
	        }
	    } else {
	        if(($(el).val()+'').length <= 0) {
	            $(el).addClass(className);
	            $(el).val($(el).attr('placeholder'));
	        }
	    }
	}
	
})(jQuery);
