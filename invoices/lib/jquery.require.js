(function($) {

    var defOptions = {
        urls: [],
        callback: null,// data
        end:null
    };
    
    var defOptions1 = {
        urls:[],
        callback: null,
        end:null,
        async: true
    }
    
    var defOptions2 = {
        urls:[],
        callback: null,
        end:null
    }

	$.extend({
	    require:function(options){
		    
		    var opt = $.extend({}, defOptions, options);
		    
		    if(!opt.urls || typeof opt.urls != 'object' || !(opt.urls instanceof Array)) {
		        console.log('jQuery require error: error');
		        return;
		    }
		    
		    var arr = [];
		    
		    for(var i=0; i<opt.urls.length; i++) arr.push(false);
		    
		    for(var i=0; i<opt.urls.length; i++) {
		        f1(opt, arr, i);
		    }
		    
		    if(opt.urls.length < 1 && typeof opt.end == 'function') opt.end();// fix
		    
		    return this;
	    },
	    include: function(options) {
	        
	        var opt = $.extend({}, defOptions1, options);
	        
	        if(!opt.urls || typeof opt.urls != 'object' || !(opt.urls instanceof Array)) {
		        console.log('jQuery include error: error');
		        return;
		    }
		    
		    var arr = [];
		    
		    for(var i=0; i<opt.urls.length; i++) arr.push(false);
		    
		    if(opt.async) {
		        for(var i=0; i<opt.urls.length; i++) {
		            f2(opt, arr, i);
		        }
		    } else {
		        f2(opt, arr, 0);
		    }
		    
		    return this;
	        
	    },
	    includeCSS: function(options) {
	        
	        var opt = $.extend({}, defOptions2, options);
	        
	        if(!opt.urls || typeof opt.urls != 'object' || !(opt.urls instanceof Array)) {
		        console.log('jQuery include error: error');
		        return;
		    }
		    
		    var time = (new Date()).getTime();
		    
		    for(var i=0; i<opt.urls.length; i++) {
		        includeCSS(opt.urls[i]+'?t='+time);
		        if(typeof opt.callback == 'function') opt.callback(opt.urls[i]);
		    }
		    
		    if(typeof opt.end == 'function') opt.end();
	        
	    }
	});
	
	function f2(opt, arr, i) {
	    var j = i;
	    include(opt.urls[i], function(url) {
	        arr[j] = true;
		    if(typeof opt.callback == 'function') opt.callback(url);
		    
		    var end = true;
		        
		    for(var i0=0; i0<arr.length; i0++) {
		        if(!arr[i0]) {
		            end = false;
		            break;
		        }
		    }
		    
		    if(end && typeof opt.end == 'function') opt.end();
		    
		    j++;
		    
		    if(!end && opt.urls[j] && !opt.async) {
		        f2(opt, arr, j);
		    }
		    
	    });
	}
	
	function include(url, callback) {
	    var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url+'?t='+(new Date()).getTime());
        
        script.done = false;
        
        script.onreadystatechange = function (e) {
            if(script.readyState == 'complete' && !script.done) {
                script.done = true;
                if(typeof callback == 'function') callback(url);
            }
        }
        
        script.onload = function (e) {
            if(!script.done) {
                script.done = true;
                if(typeof callback == 'function') callback(url);
            }
        }
        
        document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	function includeCSS(url) {
	    var style = document.createElement('link');
	    style.setAttribute('rel', 'stylesheet');
	    style.setAttribute('type', 'text/css');
	    style.setAttribute('href', url);
	    style.setAttribute('media', 'all');
	    document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	function f1(opt, arr, i) {
	    var j = i;
	    $.ajax({
		    url: opt.urls[i]+'?t='+(new Date()).getTime(),
		    type: 'GET',
		    dataType: 'text',
		    success: function(res) {
		        arr[j] = true;
		        if(typeof opt.callback == 'function') opt.callback(res, opt.urls[j]);
		        
		        var end = true;
		        
		        for(var i=0; i<arr.length; i++) {
		            if(!arr[i]) {
		                end = false;
		                break;
		            }
		        }
		        
		        if(end && typeof opt.end == 'function') opt.end();
		        
		    },
		    error: function(res) {
		        console.log('jQuery require error: file load "'+opt.urls[j]+'" - NOT FOUND');
		    }
		});
	}
	
})(jQuery);
