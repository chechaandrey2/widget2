window.Invoices = {};
window.Invoices.TEMPLATE = {};
window.Invoices.L10N = {};

// override Backbone.sync
/*
Backbone.sync = function(method, model, success, error) {
    var data = {subname: model.url(method), data: JSON.stringify(model.toJSON())}
    $.ajax({
        type: 'POST',
        url: window.Invoices.APIURL,
        success: function(data, textStatus, jqXHR) {
            console.warn('AJAX DATA: %s;', data);
            data = data || {};
            success(data['data'] || {}, textStatus, jqXHR);
        },
        error: function(jXHR, textStatus, errorThrown) {
            console.error('AJAX ERROR: %o, %o, %o', jXHR, textStatus, errorThrown);
            error(jXHR, textStatus, errorThrown);
        },
        data: data
    });
}
*/

// Backbone.sync local
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
    
    var arg = model.toJSON();
    if(!(arg instanceof Array)) window.bridgeObjects[id0]['data']['data'] = arg;
    
    if(model.syncArg[method] && (model.syncArg[method]+'').length > 0) {
        console.log('Backbone.sync SEND: %o', window.bridgeObjects[id0]['data']);
        window.bridge.postMessage(JSON.stringify({id: id0, data: window.bridgeObjects[id0]['data']}), '*');
    } else {
        console.error('Backbone.sync ERROR');
    }
}

window.addEventListener("message", function(e) {
    var data = JSON.parse(e.data) || {};
    var id = data['id'];
    var res = JSON.parse(data['data']) || {};
    if((res.status+'').toLowerCase() == 'ok') {
        window.bridgeObjects[id]['options'].success(res.data);
    } else {
        window.bridgeObjects[id]['options'].error(res.data);
    }
    delete window.bridgeObjects[id];
}, false);
// Backbone.sync local

$(document).ready(function() {
    
    // Backbone.sync local
    window.bridge = document.getElementById("invoices_iframe").contentWindow;
    // Backbone.sync local

    // --PATHS--
    window.CSS = [];
    window.TPL = [];
    window.JS = [];
    window.L10N = [];
    
    // -globalmenu-
    window.TPL.push("invoices/app/globalmenu/template.globalmenu.tpl");
    window.JS.push("invoices/app/globalmenu/model.globalmenuitem.js");
    window.JS.push("invoices/app/globalmenu/collection.globalmenu.js");
    window.JS.push('invoices/app/globalmenu/view.globalmenu.js');
    
    // -iteminvoice-
    window.TPL.push("invoices/app/iteminvoice/template.iteminvoice.tpl");
    window.TPL.push('invoices/app/iteminvoice/template.iteminvoice_new_ps.tpl');
    window.JS.push("invoices/app/iteminvoice/model.iteminvoice.js");
    window.JS.push('invoices/app/iteminvoice/view.iteminvoice.js');
    
    // -clients-
    window.TPL.push("invoices/app/clients/template.clients.tpl");
    window.TPL.push('invoices/app/clients/template.clients_add_group.tpl');
    window.TPL.push('invoices/app/clients/template.clients_item_group.tpl');
    window.TPL.push('invoices/app/clients/template.clients_del_group.tpl');
    window.TPL.push('invoices/app/clients/template.clients_table.tpl');
    window.L10N.push('invoices/app/clients/l10n.ru.json');
    window.JS.push("invoices/app/clients/model.clients_group.js");
    window.JS.push("invoices/app/clients/collection.clients_group.js");
    window.JS.push("invoices/app/clients/collection.clients_contacts.js");
    window.JS.push('invoices/app/clients/view.clients.js');
    
    // -clientsContacts-
    window.TPL.push('invoices/app/clients/template.clientsContacts.tpl');
    window.TPL.push('');
    window.JS.push('');
    window.JS.push('');
    window.JS.push('');
    
    // --ROUTER--
    JS.push("invoices/app/router.js");
    // --PATHS--
    
    // include CSS
    $.includeCSS({
        urls: window.CSS,
        callback: function(url) {
            console.log(url);
        }
    });
    
    // require TPL
    $.require({
        urls: window.TPL,
        callback: function(data, url) {
            window.Invoices.TEMPLATE[url] = data;
            console.log(url);
        },
        end: function() {
            
            // require L10N
            $.require({
                urls: window.L10N,
                callback: function(data, url) {
                    window.Invoices.L10N[url] = data;
                    console.log(url);
                },
                end: function() {
                    
                    // include JS
                    $.include({
                        urls: window.JS,
                        async: false,
                        callback: function(url) { console.log(url); },
                        end: function() {
                        
                            // wait load iFrame
                            // Backbone.sync local
                            document.getElementById("invoices_iframe").onload = function() {
                                
                                window.Invoices.Router = new window.Invoices.ROUTER();
                                
                                Backbone.history.start();
                            }
                            // Backbone.sync local
                            
                            /*
                             * window.Invoices.Router = new window.Invoices.ROUTER();
                             *
                             * Backbone.history.start();
                             */
                            
                        }
                    });
                    
                }
            });
            
        }
    });

});
