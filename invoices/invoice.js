window.Invoices = {};
window.Invoices.TEMPLATE = {};
window.Invoices.L10N = {};


PreLoader.add(window.PATHS);
PreLoader.set('cache', false);
PreLoader.set('sync', true);

var I = 0;

PreLoader.on('successed', function(e) {
	if(window.console) console.log('status: %o, type: %o, url: %o, name: %o', e.status, e.type, e.url, e.name);
	if(e.namespace == 'tpl') window.Invoices.TEMPLATE[e.name] = e.data;
	if(e.namespace && e.namespace.indexOf('l10n') == 0) window.Invoices.L10N[e.name] = e.data;
	// draw indicator
	var el = document.getElementById('invoicePreLoader');
	if(el) {
	    I++;
	    el.innerHTML = '<h2 style="color: red;">'+(I/e.length*100).toFixed(2)+'%</h2>';
	}
});

PreLoader.load({
    ready: true,
    success: function(data) {
		sync();
		endPreloaded();
		var el = document.getElementById('invoicePreLoader');
	    if(el) el.style.display = 'none';
	},
	error: function(data) {
		//console.log('ErrorEnd Loader');
		alert('ErrorEnd Loader');
	}
});

function sync() {
    
// override Backbone.sync
if(location.host == 'localhost:8000') {
    
    // Backbone.sync local
    if(window.console) console.warn('LOCALHOST DEVELOPER: %o', true);
    
    // Backbone.sync
    window.bridge;
    window.bridgeObjects = {};

    function _guid() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    Backbone.sync = function(method, model, options) {
        var id0 = _guid();
        window.bridgeObjects[id0] = {
            'data': {subname: model.syncArg[method]},
            'options': options
        };
        
        model.syncFilter = model.syncFilter || {};
        
        var arg = model.toJSONExt(model.syncFilter[method]) || {};
        if(arg instanceof Array) arg = {};
    
        // options.data
        options.data = options.data || {};
        for(var i in options.data) {
            arg[i] = options.data[i];
        }
    
        if(!(arg instanceof Array)) window.bridgeObjects[id0]['data']['data'] = arg;
        
        if(typeof options.loader == 'function') options.loader.call(this, 0);// progress
    
        if(model.syncArg[method] && (model.syncArg[method]+'').length > 0) {
            if(window.console) console.log('Backbone.sync SEND: %o', JSON.stringify(window.bridgeObjects[id0]['data']));
            window.bridge.postMessage(JSON.stringify({id: id0, data: window.bridgeObjects[id0]['data']}), '*');
        } else {
            //console.error('Backbone.sync ERROR');
            $.ierrorDialog('add', 'Backbone.sync ERROR; NOT model.syncArg[method]');
        }
    }

    window.addEventListener("message", function(e) {
        var data = JSON.parse(e.data) || {};
        var id = data['id'];
        var res = JSON.parse(data['data']) || {};
        res.data = res.data || [];
        
        if((!(res.data instanceof Object) && !(res.data instanceof Array)) || res.data.error > 0) {
            window.bridgeObjects[id]['options'].error(res.data);
        } else {
            window.bridgeObjects[id]['options'].success(res.data);
        }
        
        if(typeof window.bridgeObjects[id]['options'].loader == 'function') 
            window.bridgeObjects[id]['options'].loader.call(this, 1);// progress
        
        delete window.bridgeObjects[id];
    }, false);
    // Backbone.sync
    
} else {
    
    // Backbone.sync
    Backbone.sync = function(method, model, options) {
        options = options || {};
        model.syncFilter = model.syncFilter || {};
        model.syncArg = model.syncArg || {};
        var data = {subname: model.syncArg[method], data: {}};
        var data0 = model.toJSONExt(model.syncFilter[method]), data1 = options.data || {};
        
        if(!(data0 instanceof Array)) {
            for(var i in data0) {
                data.data[i] = data0[i];
            }
        }
        
        for(var j in data1) {
            data.data[j] = data1[j];
        }
        
        if(typeof options.loader == 'function') options.loader.call(this, 0);// progress
        
        if(window.console) console.log('Backbone.sync REQUEST: %o', JSON.stringify(data));
        
        $.ajax({
            url: 'https://pulyaev.test.liqpay.com/?do=invoices&act=ajax',
            dataType: 'json',
            type: 'POST',
            data: {json: JSON.stringify(data)},
            success: function(data, textStatus, jqXHR) {// jqXHR.responseText
                // always expect only json
                data = data || {};
                data.data = data.data || [];
                
                if((!(data.data instanceof Object) && !(data.data instanceof Array)) || data.data.error > 0) {
                    if(typeof(options.error) == 'function') options.error.call(this, data.data);
                } else {
                    if(typeof(options.success) == 'function') options.success.call(this, data.data);
                }
                
                if(window.console) console.log('Backbone.sync RESPONCE: %o', JSON.stringify(data));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $.ierrorDialog('add', 'Backbone.sync($.ajax) error: textStatus: '+textStatus+'; responseText: '+jqXHR.responseText);
            },
            complete: function() {
                if(typeof options.loader == 'function') options.loader.call(this, 1);// progress
            }
        });
        
    }
    // Backbone.sync
    
}
    
}

function endPreloaded() {
    
if(location.host == 'localhost:8000') {

    window.bridge = document.getElementById("invoices_iframe").contentWindow;
    
    // wait load iFrame
    // Backbone.sync local
    document.getElementById("invoices_iframe").onload = function() {

        $.iplaceholder('default', {
            plClass: 'placeholder',
            contClass: null,
            placeholder: true
        });
    
        $.ierror('default', {
            errClass: 'error',
	    	contClass: null,
	    	elClass: null,
	    	wrap: false,
	    	autoshow: true,
	    	eventHided: 'focus keypress'
        });
    
        $.itabs('default', {
	        elClassTabItem: 'tab-item'
        });

        $.iautocomplete('default', {
            minLength: 2,
            elClassItem: 'selected'
         });
    
        $.ierrorDialog('default', {
            errContClass: 'error-cont',
	    	errItemClass: 'error-item',
		    textButton: 'Ok',
	    	textTitle: 'Server Error'
        });
    
        window.Invoices.router = new window.Invoices.Router({l10nLang: 'ua'});
        
        Backbone.history.start();
    }
    // Backbone.sync local
} else {
    
    $.iplaceholder('default', {
        plClass: 'placeholder',
		contClass: null,
		placeholder: true
    });
    
    $.ierror('default', {
        errClass: 'error',
		contClass: null,
		elClass: null,
		wrap: false,
		autoshow: true,
		eventHided: 'focus keypress'
    });
    
    $.itabs('default', {
	    elClassTabItem: 'tab-item'
    });
    
    $.iautocomplete('default', {
        minLength: 2,
        elClassItem: 'selected'
    });
    
    $.ierrorDialog('default', {
        errContClass: 'error-cont',
		errItemClass: 'error-item',
		textButton: 'ok',
		textTitle: 'Server Error'
    });
    
    window.Invoices.router = new window.Invoices.Router({l10nLang: 'ua'});
    
    Backbone.history.start();
}
    
}

