(function($) {

	var defOptions = {
		errClass: null,
		contClass: null,
		elClass: null,
		msg: null,
		el: null,
		wrap: false,
		autoshow: true,
		eventHided: 'focus keypress'
	};

	var uid = '__ierror__';
	
	$.fn.extend({
        ierror: function(options, arg) {
        	
        	options = options || {};
        	
        	$(this).each(function() {
        	
        		var self = this;
        		
        		if(!this[uid]) {
        			
        			this[uid] = $.extend({}, defOptions, options);
        			
        			if($(this[uid].el).size() < 1) {
        				this[uid].el = $('<div></div>').addClass(this[uid].errClass).hide()
        				.css('position', 'absolute').css('z-index',($(this).css('z-index')-0+1));
        			}
        			
        			$(this[uid].el).html(this[uid].msg);
        			
        			if(this[uid].wrap) {
        				$(this).wrap($('<span></span>').addClass(this[uid].contClass).css('position', 'relative'));
        				$(this).parent().append(this[uid].el);
        			} else {
        				$(document.body).append(this[uid].el);
        			}
        			
        			if(this[uid].eventHided) {
        			    this[uid].eventHided = this[uid].eventHided.split(' ');
        			    for(var i=0; i<this[uid].eventHided.length; i++) {
        			        if(this[uid].eventHided[i].length > 0) this[uid].eventHided[i] += '.'+uid;
        			    }
        			    this[uid].eventHided = this[uid].eventHided.join(' ');
        			}
        			
        			$(this).addClass(this[uid].elClass).bind(this[uid].eventHided, function(e) {
        				$(this[uid].el).hide();
        			});
        			
        			$(this).bind('blur.'+uid, function(e) {
        			    $(this[uid].el).filter(':hidden').show();
        			});
        			
        			$(this).bind('change', function(e) {
        			    $(this[uid].el).remove();
        			    if(this[uid].wrap) $(this).unwrap();
        			    this[uid] = undefined;
        			    $(this).unbind('.'+uid);
        			});
        			
        			if(this[uid].autoshow) $(this[uid].el).show();
        			
        		} else {
        		
        			if(options == 'hide') {
        				
        				$(this[uid].el).hide();
        				
        			} else if(options == 'remove') {
        			    
        			    $(this[uid].el).remove();
        			    if(this[uid].wrap) $(this).unwrap();
        			    this[uid] = undefined;
        			    $(this).unbind('.'+uid);
        			    
        			} else {
        				
        				this[uid] = $.extend({}, this[uid], options);
        			
        				$(this[uid].el).html(this[uid].msg);
        			
        				$(this[uid].el).show();
        				
        			}
        			
        		}
        		
        	});
        	
        	return this;
        }
    });
    
    $.extend({
        ierror: function(options, arg) {
        	if(options == 'default') {
    			defOptions = $.extend({}, defOptions, arg);
    		}
        }
    });
	
})(jQuery);
