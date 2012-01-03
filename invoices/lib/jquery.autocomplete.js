(function($) {

    var defOptions = {
        interval: 1000,
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
            
            var render = function(e) {
                setTimeout(function() {
                    var value = $(e.target).val();
				    if(value.length >= opt.minLength) {
				        if(typeof opt.render == 'function') {
                            opt.render(opt, value);
                        }
                        
                        $($(opt.selectorItem, opt.el).get(0)).attr('data-selected', 'selected');
                        
                        if($(opt.el).children().size() < 1 && typeof opt.renderEmpty == 'function') {
                            opt.renderEmpty(opt, value);
                        }
				    } else {
				        if(typeof opt.hided == 'function') opt.hided(opt);
				    }
				}, 0);
            }
            
            $(this).bind('focus', function(e) {
                
            });
            
            $(this).bind('keydown', function(e) {
                switch(e.which) {
                    case 38:// UP
                        var length = $(opt.selectorItem, opt.el).size();
					    var pos = $(opt.selectorItem, opt.el).index($('[data-selected="selected"]'));
					    $(opt.selectorItem, opt.el).removeAttr('data-selected');
					    $($(opt.selectorItem, opt.el).get(pos-1>=0?pos-1:length-1)).attr('data-selected', 'selected');
					    event.preventDefault();
					break;
					case 40:// DOWN
					    var length = $(opt.selectorItem, opt.el).size();
					    var pos = $(opt.selectorItem, opt.el).index($('[data-selected="selected"]'));
					    $(opt.selectorItem, opt.el).removeAttr('data-selected');
					    $($(opt.selectorItem, opt.el).get(pos+1<length?pos+1:0)).attr('data-selected', 'selected');
					    event.preventDefault();
					break;
				    case 13:// ENTER
				        // selected
				        var pos = $(opt.selectorItem, opt.el).index($('[data-selected="selected"]'));
				        if(typeof opt.selected == 'function') {
                            opt.selected(opt, $(this).val(), $(opt.selectorItem, opt.el).get(pos));
                        }
					    event.preventDefault();
					break;/*
					case 8:// ESCAPE
					    render(e);
					break;*/
				    default:// OTHER KEY
					    render(e);
					break;
                }
            });
            
            $(this).bind('blur', function(e) {
                if(typeof opt.hided == 'function') opt.hided(opt);
            });
            
            $(opt.el).delegate(opt.selectorItem, 'click', function(e) {
                
            });
            
            return this;
        }
    });
    
})(jQuery);
