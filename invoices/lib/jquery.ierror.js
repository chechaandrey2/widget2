(function($) {

    var errors = {};// code:msg
    var defOptions = {
        errcode: 0,
        msg: null,
        el: null,
        position: {},// jquery position
        attr: 'data-error',
        errorClass: null,
        errorContClass: null,
        eventErrHiden: 'focus keypress'
    }

    $.extend({
        ierror: function(options, arg, value) {
            
            if(typeof options == 'string') {
                // cmd
                if(options == 'cmd') {
                    if(arg == 'add') {
                        value = value || {};
                        for(var i in value) {
                            errors[i] = value[i];
                        }
                    }
                } else if(options == 'option') {
                    
                }
            } else {
                
                var opt = $.extend({}, defOptions, options);
                
                opt.position = opt.position || {};
                opt.position.of = $(opt.el);
                
                var errmsgdef = '<h2>Not message error</h2>', attrmsg = $(opt.el).attr(opt.attr);
                var errmsg = opt.msg?opt.msg:(
                    opt.errcode?(errors[opt.errcode]?errors[opt.errcode]:errmsgdef):(attrmsg?attrmsg:errmsgdef)
                );
                
                $(opt.el).addClass(opt.errorClass).css('position', 'relative');
                
                var $e = $('<div></div>').addClass(opt.errorContClass).html(errmsg).appendTo(document.body).css('position', 'absolute');
                $e.position(opt.position);
                
                $(opt.el).one(opt.eventErrHiden, function(e) {
                    $e.remove();
                    $(opt.el).removeClass(opt.errorClass);
                });
                
            }
            
        }
    });

})(jQuery);
