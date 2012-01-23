(function($) {
    
    var defOptions = {
        minLength: 2,
        validate: null,
        elClassItem: null,
        el: null,
        selectorItem: null,
        render: null,
        renderEmpty: null,
        selected: null,
        hided: null,
        focusin: null,
        focusout: null,
        entered: null
    }
    
    var uid = '__autocomplete__';
    
    $.fn.extend({
        iautocomplete: function(options, arg) {
            
            $(this).each(function() {
                if(!this[uid]) {
                    // create
                    
                    var self = this;
                    
                    this[uid] = $.extend({}, defOptions, options);
                    
                    this[uid]['listener'] = false;
                    
                    $(this).bind('focus', function(e) {
                        this[uid]['listener'] = true;
                        if(typeof this[uid].focusin == 'function') this[uid].focusin.call(this, this[uid]);
                        render.call(this, e.target, 0);
                    });
                    
                    $(this).bind('keydown', function(e) {
                        if(!this[uid]['listener']) return;
                        var $c = $(this[uid].selectorItem, this[uid].el);
                        switch(e.which) {
                            case 38:// UP
                                var length = $c.size();
					            var pos = $c.index($('.'+this[uid].elClassItem));
					            $c.removeClass(this[uid].elClassItem);
					            $($c.get(pos-1>=0?pos-1:length-1)).addClass(this[uid].elClassItem);
					            e.preventDefault();
					        break;
					        case 40:// DOWN
					            var length = $c.size();
					            var pos = $c.index($('.'+this[uid].elClassItem));
					            $c.removeClass(this[uid].elClassItem);
					            $($c.get(pos+1<length?pos+1:0)).addClass(this[uid].elClassItem);
					            e.preventDefault();
					        break;
				            case 13:// ENTER
				                // selected
				                var pos = $c.index($('.'+this[uid].elClassItem));
				                var el = $c.get(pos);
				                selected.call(this, el);
				                if(!el && typeof this[uid].entered == 'function') this[uid].entered.call(this, e.target, this[uid]);
				                if(typeof this[uid].hided == 'function') this[uid].hided.call(this, this[uid]);
					            e.preventDefault();// ??
					        break;/*
					            case 8:// ESCAPE
					            render(e);
					        break;*/
				            default:// OTHER KEY
					            render.call(this, e.target, 0);
					        break;
                        }
                        
                    });
                    
                    $(this).bind('blur', function(e) {
                        this[uid]['listener'] = false;
                        setTimeout(function() {
                            if(typeof self[uid].hided == 'function') self[uid].hided.call(self, self[uid]);
                        }, 150);
                        if(typeof this[uid].focusout == 'function') this[uid].focusout.call(this, this[uid]);
                    });
                    
                    $(this[uid].el).delegate(this[uid].selectorItem, 'click', function(e) {
                        var $c = $(self[uid].selectorItem, self[uid].el);
                        var el = f1($c, e.target, 0);
                        if($(el).size() > 0) {
                            selected.call(self, el);
                            $(self).focus();
                        }
                    });
                    
                    $(this[uid].el).delegate(this[uid].selectorItem, 'mouseover', function(e) {
                        var $c = $(self[uid].selectorItem, self[uid].el);
                        var el = f1($c, e.target, 0);
                        if($(el).size() > 0) {
                            $c.removeClass(self[uid].elClassItem);
                            $(el).addClass(self[uid].elClassItem);
                        }
                    });
                    
                    $(this).attr('autocomplete', 'off');
                    
                    if(typeof this[uid].hided == 'function') this[uid].hided.call(this, this[uid]);
                    
                } else {
                    // cmd
                    
                    if(options == 'render') {
                        render.call(this, this, 0);
                    }
                    
                }
            });
            
            return this;
            
        }
    });
    
    $.extend({
        iautocomplete: function(options, arg) {
        	if(options == 'default') {
    			defOptions = $.extend({}, defOptions, arg);
    		}
        }
    });
    
    function f1($c, el, i) {// max 5 level rec
        if(i >= 5) return -1;
        var index = $c.index(el);
        if(index < 0) {
            i++;
            return f1($c, el.parentNode, i);
        } else {
            return el;
        }
    }
    
    function render(el, timeout) {
        if(!this[uid].listener) return;
        var self = this;
        timeout = timeout || 0;
        setTimeout(function() {
            var value = $(el).val();
			if(value.length >= self[uid].minLength) {
			    
			    if(typeof self[uid].validate == 'function') {
			        if(self[uid].validate.call(self, value) !== true) {
			            if(typeof self[uid].hided == 'function') self[uid].hided.call(self, self[uid]);
			            return;
			        }
			    }
			    
			    if(typeof self[uid].render == 'function') {
                    self[uid].render.call(self, self[uid], value);
                }
                
                $($(self[uid].selectorItem, self[uid].el).get(0)).addClass(self[uid].elClassItem);
                
                if($(self[uid].el).children().size() < 1 && typeof self[uid].renderEmpty == 'function') {
                    self[uid].renderEmpty.call(self, self[uid], value);
                }
			} else {
			    if(typeof self[uid].hided == 'function') self[uid].hided.call(self, self[uid]);
		    }
		}, timeout);
    }
    
    function selected(el) {
        if(el && typeof this[uid].selected == 'function') {
		    this[uid].selected.call(this, this[uid], $(this).val(), el);
		}
    }
    
})(jQuery);
