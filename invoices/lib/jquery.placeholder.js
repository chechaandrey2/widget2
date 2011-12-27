(function($) {
    
    var isInputSupported = false;//'placeholder' in document.createElement('input'),
	    isTextareaSupported = false;//'placeholder' in document.createElement('textarea');
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
	        
	    }
	});
	
	function callbackFocus(el, className) {
	    if(isInputSupported && isTextareaSupported) {
	        $(el).removeClass(className);
	    } else {
	        $(el).removeClass(className);
	        $(el).val('');
	    }
	}
	
	function callbackBlur(el, className) {
	    if(isInputSupported && isTextareaSupported) {
	        $(el).addClass(className);
	    } else {
	        $(el).addClass(className);
	        if($(this).val() == '') $(this).val($(this).attr('pplaceholder'));
	    }
	}
	
})(jQuery);
