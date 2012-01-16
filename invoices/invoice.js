window.Invoices = {};
window.Invoices.TEMPLATE = {};
window.Invoices.L10N = {};

// override Backbone.sync
if(location.host == 'localhost:8000') {
    
    // Backbone.sync local
    console.warn('LOCALHOST DEVELOPER: %o', true);
    
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
    
        var arg = model.toJSON() || {};
        if(arg instanceof Array) arg = {};
    
        // options.data
        options.data = options.data || {};
        for(var i in options.data) {
            arg[i] = options.data[i];
        }
    
        if(!(arg instanceof Array)) window.bridgeObjects[id0]['data']['data'] = arg;
        
        if(typeof options.loader == 'function') options.loader.call(this, 0);// progress
    
        if(model.syncArg[method] && (model.syncArg[method]+'').length > 0) {
            console.log('Backbone.sync SEND: %o', JSON.stringify(window.bridgeObjects[id0]['data']));
            window.bridge.postMessage(JSON.stringify({id: id0, data: window.bridgeObjects[id0]['data']}), '*');
        } else {
            console.error('Backbone.sync ERROR');
        }
    }

    window.addEventListener("message", function(e) {
        var data = JSON.parse(e.data) || {};
        var id = data['id'];
        var res = JSON.parse(data['data']) || {};
        res.data = res.data || [];
        
        if((!(res.data instanceof Object) && !(res.data instanceof Array)) || res.data.error > 0) {
            //window.bridgeObjects[id]['options'].error(res.data);
            console.error('Backbone.sync ERROR: Response: %o;', res.data);
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
        model.syncArg = model.syncArg || {};
        var data = {subname: model.syncArg[method], data: {}};
        var data0 = model.toJSON(), data1 = options.data || {};
        
        if(!(data0 instanceof Array)) {
            for(var i in data0) {
                data.data[i] = data0[i];
            }
        }
        
        for(var j in data1) {
            data.data[j] = data1[j];
        }
        
        if(typeof options.loader == 'function') options.loader.call(this, 0);// progress
        
        console.warn('Backbone.sync REQUEST: %o', data);
        
        $.ajax({
            url: 'https://pulyaev.test.liqpay.com/?do=invoices&act=ajax',
            dataType: 'json',
            type: 'POST',
            data: {json: JSON.stringify(data)},
            success: function(data, textStatus, jqXHR) {
                // always expect only json
                data = data || {};
                data.data = data.data || [];
                
                if((!(data.data instanceof Object) && !(data.data instanceof Array)) || data.data.error > 0) {
                    console.error('Backbone.sync ERROR: Response: %o;', data.data);
                    if(typeof(options.error) == 'function') options.error.call(this, jqXHR);// OR data
                } else {
                    if(typeof(options.success) == 'function') options.success.call(this, data.data);
                }
                
                console.warn('Backbone.sync RESPONCE: %o', data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Backbone.sync($.ajax) error: jqXHR: %o; textStatus: %o; errorThrown: %o;', jqXHR, textStatus, errorThrown);
            },
            complete: function() {
                if(typeof options.loader == 'function') options.loader.call(this, 1);// progress
            }
        });
        
    }
    // Backbone.sync
    
}

$(document).ready(function() {
    
    // Backbone.sync local
    if(location.host == 'localhost:8000') {
        window.bridge = document.getElementById("invoices_iframe").contentWindow;
    }
    // Backbone.sync local

    // --PATHS--
    window.CSS = [];
    window.TPL = [];
    window.JS = [];
    window.L10N = [];
    
    // -globalmenu-
    window.TPL.push("invoices/app/globalmenu/template.globalMenu.tpl");
    window.JS.push("invoices/app/globalmenu/model.globalMenuItem.js");
    window.JS.push("invoices/app/globalmenu/collection.globalMenu.js");
    window.JS.push('invoices/app/globalmenu/view.globalMenu.js');
    
    // -buyersGroups-
    window.TPL.push("invoices/app/buyersGroups/template.buyersGroups.tpl");
    window.TPL.push('invoices/app/buyersGroups/template.buyersGroupsItem.tpl');
    window.TPL.push('invoices/app/buyersGroups/template.buyersGroupsItemEdit.tpl');
    window.TPL.push('invoices/app/buyersGroups/template.buyersGroupsAdd.tpl');
    window.TPL.push('invoices/app/buyersGroups/template.buyersGroupsDel.tpl');
    window.TPL.push('invoices/app/buyersGroups/template.buyersGroupsLoader.tpl');
    window.TPL.push('invoices/app/buyersGroups/template.buyersGroupsLoaderDialog.tpl');
    window.L10N.push('invoices/app/buyersGroups/l10n.ru.json');
    window.JS.push("invoices/app/buyersGroups/model.buyersGroups.js");
    window.JS.push("invoices/app/buyersGroups/collection.buyersGroups.js");
    window.JS.push('invoices/app/buyersGroups/view.buyersGroups.js');
    
    // -buyers-
    window.TPL.push('invoices/app/buyers/template.buyers.tpl');
    window.TPL.push('invoices/app/buyers/template.buyersItem.tpl');
    window.TPL.push('invoices/app/buyers/template.buyersItemEdit.tpl');
    window.TPL.push('invoices/app/buyers/template.buyersItemNew.tpl');
    window.TPL.push('invoices/app/buyers/template.buyersDel.tpl');
    window.TPL.push('invoices/app/buyers/template.buyersLoader.tpl');
    window.JS.push('invoices/app/buyers/model.buyers.js');
    window.JS.push('invoices/app/buyers/collection.buyers.js');
    window.JS.push('invoices/app/buyers/view.buyers.js');
    
    // -ps-
    window.TPL.push("invoices/app/ps/template.ps.tpl");
    window.TPL.push('invoices/app/ps/template.psItemGroup.tpl');
    window.TPL.push('invoices/app/ps/template.psItemGroupEdit.tpl');
    window.TPL.push('invoices/app/ps/template.psAddGroup.tpl');
    window.TPL.push('invoices/app/ps/template.psDelGroup.tpl');
    window.JS.push("invoices/app/ps/model.psGroupItem.js");
    window.JS.push("invoices/app/ps/collection.psGroup.js");
    window.JS.push('invoices/app/ps/view.ps.js');
    
    // -psTables-
    window.TPL.push('invoices/app/psTables/template.psTables.tpl');
    window.TPL.push('invoices/app/psTables/template.psTablesItem.tpl');
    window.TPL.push('invoices/app/psTables/template.psTablesItemEdit.tpl');
    window.TPL.push('invoices/app/psTables/template.psTablesItemNew.tpl');
    window.TPL.push('invoices/app/psTables/template.psTablesDel.tpl');
    window.JS.push('invoices/app/psTables/model.psTable.js');
    window.JS.push('invoices/app/psTables/collection.psTables.js');
    window.JS.push('invoices/app/psTables/view.psTables.js');
    
    // -invoices-
    window.TPL.push("invoices/app/invoices/template.invoices.tpl");
    window.JS.push("invoices/app/invoices/model.invoices.js");
    window.JS.push("invoices/app/invoices/collection.invoicess.js");
    window.JS.push('invoices/app/invoices/view.invoices.js');
    
    // -invoicesTables-
    window.TPL.push("invoices/app/invoicesTables/template.invoicesTables.tpl");
    window.TPL.push("invoices/app/invoicesTables/template.invoicesTablesItem.tpl");
    window.TPL.push('invoices/app/invoicesTables/template.invoicesTablesItemDel.tpl');
    window.JS.push("invoices/app/invoicesTables/model.invoicesTable.js");
    window.JS.push("invoices/app/invoicesTables/collection.invoicesTables.js");
    window.JS.push('invoices/app/invoicesTables/view.invoicesTables.js');
    
    // -invoice-
    window.TPL.push("invoices/app/invoice/template.invoice.tpl");
    window.JS.push("invoices/app/invoice/model.invoiceBuyer.js");
    window.JS.push("invoices/app/invoice/collection.invoiceBuyers.js");
    window.JS.push("invoices/app/invoice/model.invoiceGoods.js");
    window.JS.push("invoices/app/invoice/collection.invoiceGoodss.js");
    window.JS.push("invoices/app/invoice/model.invoice.js");
    window.JS.push("invoices/app/invoice/collection.invoices.js");
    window.JS.push('invoices/app/invoice/view.invoice.js');
    
    // -itemInvoice-
    window.TPL.push("invoices/app/itemInvoice/template.itemInvoiceEdit.tpl");
    window.TPL.push("invoices/app/itemInvoice/template.itemInvoiceView.tpl");
    window.TPL.push("invoices/app/itemInvoice/template.itemInvoiceSend.tpl");
    window.TPL.push("invoices/app/itemInvoice/template.itemInvoiceEditGoodsItem.tpl");
    window.TPL.push("invoices/app/itemInvoice/template.itemInvoiceEditBuyerItem.tpl");
    window.TPL.push('invoices/app/itemInvoice/template.itemInvoiceEditGoodsNew.tpl');
    window.TPL.push('invoices/app/itemInvoice/template.itemInvoiceEditBuyerHelpGroup.tpl');
    window.TPL.push('invoices/app/itemInvoice/template.itemInvoiceEditBuyerHelpItem.tpl');
    window.TPL.push('invoices/app/itemInvoice/template.itemInvoiceEditGoodsHelpGroup.tpl');
    window.TPL.push('invoices/app/itemInvoice/template.itemInvoiceEditGoodsHelpItem.tpl');
    
    window.TPL.push('invoices/app/itemInvoice/template.itemInvoiceEditNewGoodsItem.tpl');
    window.TPL.push('invoices/app/itemInvoice/template.itemInvoiceEditDialog.tpl');
    
    window.JS.push('invoices/app/itemInvoice/view.itemInvoiceEdit.js');
    window.JS.push('invoices/app/itemInvoice/view.itemInvoiceView.js');
    window.JS.push('invoices/app/itemInvoice/view.itemInvoiceSend.js');
    window.JS.push('invoices/app/itemInvoice/view.itemInvoice.js');
    
    // -itemInvoiceBuyerHelp-
    window.JS.push('invoices/app/itemInvoiceHelp/model.itemInvoiceHelpItem.js');
    window.JS.push('invoices/app/itemInvoiceHelp/collection.itemInvoiceHelpItem.js');
    window.JS.push('invoices/app/itemInvoiceHelp/model.itemInvoiceHelpGroupBuyer.js');
    window.JS.push('invoices/app/itemInvoiceHelp/collection.itemInvoiceHelpGroupBuyer.js');
    window.JS.push('invoices/app/itemInvoiceHelp/model.itemInvoiceHelpGroupGoods.js');
    window.JS.push('invoices/app/itemInvoiceHelp/collection.itemInvoiceHelpGroupGoods.js');
    window.JS.push('invoices/app/itemInvoiceHelp/model.itemInvoiceHelpSelectionGoods.js');
    window.JS.push('invoices/app/itemInvoiceHelp/collection.itemInvoiceHelpSelectionGoods.js');
    window.JS.push('invoices/app/itemInvoiceHelp/model.itemInvoiceHelpSelectionBuyer.js');
    window.JS.push('invoices/app/itemInvoiceHelp/collection.itemInvoiceHelpSelectionBuyer.js');
    window.JS.push('invoices/app/itemInvoiceHelp/view.itemInvoiceHelpBuyer.js');
    window.JS.push('invoices/app/itemInvoiceHelp/view.itemInvoiceHelpGoods.js');
    
    /*
    // -iteminvoicebuyers
    window.TPL.push("invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyers.tpl");
    window.TPL.push("invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersItem.tpl");
    window.TPL.push('invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersNew.tpl');
    window.TPL.push('invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersNewButton.tpl');
    window.JS.push("invoices/app/itemInvoiceBuyers/model.itemInvoiceBuyersRemote.js");
    window.JS.push("invoices/app/itemInvoiceBuyers/collection.itemInvoiceBuyersRemote.js");
    window.JS.push("invoices/app/itemInvoiceBuyers/model.itemInvoiceBuyers.js");
    window.JS.push("invoices/app/itemInvoiceBuyers/collection.itemInvoiceBuyers.js");
    window.JS.push('invoices/app/itemInvoiceBuyers/view.itemInvoiceBuyers.js');
    
    // -iteminvoicebuyersFind
    window.TPL.push("invoices/app/itemInvoiceBuyersFind/template.itemInvoiceBuyersFindItem.tpl");
    window.TPL.push("invoices/app/itemInvoiceBuyersFind/template.itemInvoiceBuyersFindGroupItem.tpl");
    window.JS.push("invoices/app/itemInvoiceBuyersFind/model.itemInvoiceBuyersFindGroup.js");
    window.JS.push("invoices/app/itemInvoiceBuyersFind/collection.itemInvoiceBuyersFindGroup.js");
    window.JS.push("invoices/app/itemInvoiceBuyersFind/model.itemInvoiceBuyersFind.js");
    window.JS.push("invoices/app/itemInvoiceBuyersFind/collection.itemInvoiceBuyersFind.js");
    window.JS.push('invoices/app/itemInvoiceBuyersFind/view.itemInvoiceBuyersFind.js');
    */
    
    // --ROUTER--
    JS.push("invoices/app/model.router.js");
    JS.push("invoices/app/collection.routers.js");
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
                            
                            if(location.host == 'localhost:8000') {
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
                                    
                                    window.Invoices.router = new window.Invoices.Router();
                                
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
                            
                                window.Invoices.router = new window.Invoices.Router();
                                Backbone.history.start();
                            }
                            
                        }
                    });
                    
                }
            });
            
        }
    });

});
