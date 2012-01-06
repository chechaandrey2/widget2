(function($) {

    var defOptions = {
        minLength: 2,
        el: null,
        selectorItem: null,
        // events
        selected: null,
        render: null,
        renderEmpty: null,
        hided: null
    }
    
    $.fn.extend({
        iautocomplete: function(options, arg) {
        
            if(options == 'cmd' || options == 'option') {
            
                if(options == 'cmd' && arg == 'refresh') {
                    if($(this).get(0) && typeof $(this).get(0)['__autocompleteRender__'] == 'function') {
                        $(this).get(0)['__autocompleteRender__']();
                    }
                }
                
                return this;
            }
        
            var opt = $.extend({}, defOptions, options);
            
            var self = this;
            
            var render = function(el, timeout) {
                var self = this;
                timeout = timeout || 0;
                setTimeout(function() {
                    var value = $(el).val();
				    if(value.length >= opt.minLength) {
				        if(typeof opt.render == 'function') {
                            opt.render.call(self, opt, value);
                        }
                        
                        $($(opt.selectorItem, opt.el).get(0)).attr('data-selected', 'selected');
                        
                        if($(opt.el).children().size() < 1 && typeof opt.renderEmpty == 'function') {
                            opt.renderEmpty.call(self, opt, value);
                        }
				    } else {
				        if(typeof opt.hided == 'function') opt.hided.call(self, opt);
				    }
				}, timeout);
            }
            
            var selected = function(el) {
				if(el && typeof opt.selected == 'function') {
				    console.warn(el);
				    opt.selected.call(this, opt, $(this).val(), el);
				}
            }
            
            var listener = false;
            
            $(this).bind('focus', function(e) {
                listener = true;
            });
            
            $(this).bind('keydown', function(e) {
                if(!listener) return;
                var $c = $(opt.selectorItem, opt.el);
                switch(e.which) {
                    case 38:// UP
                        var length = $c.size();
					    var pos = $c.index($('[data-selected="selected"]'));
					    $c.removeAttr('data-selected');
					    $($c.get(pos-1>=0?pos-1:length-1)).attr('data-selected', 'selected');
					    e.preventDefault();
					break;
					case 40:// DOWN
					    var length = $c.size();
					    var pos = $c.index($('[data-selected="selected"]'));
					    $c.removeAttr('data-selected');
					    $($c.get(pos+1<length?pos+1:0)).attr('data-selected', 'selected');
					    e.preventDefault();
					break;
				    case 13:// ENTER
				        // selected
				        var pos = $c.index($('[data-selected="selected"]'));
				        var el = $c.get(pos);
				        selected.call(this, el);
				        if(typeof opt.hided == 'function') opt.hided.call(this, opt);
					    e.preventDefault();
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
                listener = false;
                setTimeout(function() {
                    if(typeof opt.hided == 'function') opt.hided.call(this, opt);
                }, 150);
            });
            
            var f1 = function($c, el, i) {// max 2 level rec
                if(i >= 2) return -1;
                var index = $c.index(el);
                if(index < 0) {
                    i++;
                    return f1($c, el.parentNode, i);
                } else {
                    return el
                }
            }
            
            $(opt.el).delegate(opt.selectorItem, 'click', function(e) {
                var $c = $(opt.selectorItem, opt.el);
                var el = f1($c, e.target, 0);
                if($(el).size() > 0) {
                    selected.call(self, el);
                    $(self).focus();
                }
            });
            
            $(opt.el).delegate(opt.selectorItem, 'mouseover', function(e) {
                var $c = $(opt.selectorItem, opt.el);
                var el = f1($c, e.target, 0);
                if($(el).size() > 0) {
                    $c.removeAttr('data-selected');
                    $(el).attr('data-selected', 'selected');
                }
            });
            
            if(typeof opt.hided == 'function') opt.hided.call(this, opt);
            
            $(this).attr('autocomplete', 'off');
            
            if($(this).get(0)) {
                $(this).get(0)['__autocompleteRender__'] = function() {
                    render.call(self, $(this).get(0), 0);
                }
            }
            
            return this;
        }
    });
    
})(jQuery);
