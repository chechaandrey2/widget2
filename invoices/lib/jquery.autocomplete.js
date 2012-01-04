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
        autocomplete: function(options) {
            var opt = $.extend({}, defOptions, options);
            
            var self = this;
            
            var render = function(e) {
                var self = this;
                setTimeout(function() {
                    var value = $(e.target).val();
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
				}, 0);
            }
            
            var selected = function(el) {
				if(el && typeof opt.selected == 'function') {
				    opt.selected.call(this, opt, $(this).val(), el);
				}
            }
            
            var listener = false;
            
            $(this).bind('focus', function(e) {
                listener = true;
            });
            
            $(this).bind('keydown', function(e) {
                if(!listener) return;
                switch(e.which) {
                    case 38:// UP
                        var length = $(opt.selectorItem, opt.el).size();
					    var pos = $(opt.selectorItem, opt.el).index($('[data-selected="selected"]'));
					    $(opt.selectorItem, opt.el).removeAttr('data-selected');
					    $($(opt.selectorItem, opt.el).get(pos-1>=0?pos-1:length-1)).attr('data-selected', 'selected');
					    e.preventDefault();
					break;
					case 40:// DOWN
					    var length = $(opt.selectorItem, opt.el).size();
					    var pos = $(opt.selectorItem, opt.el).index($('[data-selected="selected"]'));
					    $(opt.selectorItem, opt.el).removeAttr('data-selected');
					    $($(opt.selectorItem, opt.el).get(pos+1<length?pos+1:0)).attr('data-selected', 'selected');
					    e.preventDefault();
					break;
				    case 13:// ENTER
				        // selected
				        var pos = $(opt.selectorItem, opt.el).index($('[data-selected="selected"]'));
				        var el = $(opt.selectorItem, opt.el).get(pos);
				        selected.call(this, el);
				        if(typeof opt.hided == 'function') opt.hided.call(this, opt);
					    e.preventDefault();
					break;/*
					case 8:// ESCAPE
					    render(e);
					break;*/
				    default:// OTHER KEY
					    render.call(this, e);
					break;
                }
            });
            
            $(this).bind('blur', function(e) {
                listener = false;
                setTimeout(function() {
                    if(typeof opt.hided == 'function') opt.hided.call(this, opt);
                }, 150);
            });
            
            $(opt.el).delegate(opt.selectorItem, 'click', function(e) {
                var $c = $(opt.selectorItem, opt.el);
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
                var el = f1($c, e.target, 0);
                if($(el).size() > 0) {
                    selected.call(self, el);
                    $(self).focus();
                }
            });
            
            if(typeof opt.hided == 'function') opt.hided.call(this, opt);
            
            $(this).attr('autocomplete', 'off');
            
            return this;
        }
    });
    
})(jQuery);
