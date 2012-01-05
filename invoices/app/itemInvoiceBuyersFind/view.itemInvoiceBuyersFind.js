window.Invoices.ViewItemInvoiceBuyersFind = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.fetch();// move to this.render
        
    },
    eventAdd: function(model) {
        this.el.append(this.statsTemplate['itemInvoiceBuyersFindItem'](model.toJSON()));
    },
    eventAddGroup: function(model) {
        this.el.append(this.statsTemplate['itemInvoiceBuyersFindGroupItem'](model.toJSON()));
    },
    collections: {},// key: collectionBuyersFind
    statsTemplate: {
        'itemInvoiceBuyersFindItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyersFind/template.itemInvoiceBuyersFindItem.tpl']),
        'itemInvoiceBuyersFindGroupItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyersFind/template.itemInvoiceBuyersFindGroupItem.tpl'])
    },
    render: function(value) {
        
        var self = this;
        
        $(this.el).empty();
        
        this.helperRenderHelpGroup(value);
        
        // cach engine
        var arg = this.helperCheckCache(value);
        if(arg !== false) {
            if(this.helperStatus[arg] != 'load') {
            
                if(this.collections[arg]) {
                    this.helperRenderHelp(arg, value);
                } else {
                    this.helperFetchHelp(arg);
                }
                
            } else {
                
                // return this;
                // wait!!!
                
            }
        } else {
            
            this.helperFetchHelp(value);
            
        }
        
        this.helperCurrentQuery = value;
        
        return this;
    },
    eventEndRequest: undefined,
    helperGetCollection: function(value) {
        for(var i in this.collections) {
            if(new RegExp(i, 'i').test(value)) {
                return this.collections[i];
            }
        }
        return null;
    },
    helperCheckCache: function(value) {
        for(var i in this.helperStatus) {
            if(new RegExp(i, 'i').test(value)) {
                return i;
            }
        }
        return false;
    },
    helperRenderHelp: function(arg, value) {
        var self = this;
        this.collections[arg].each(function(model) {
            if(new RegExp(value, 'i').test(model.get('name')) 
              || new RegExp(value, 'i').test(model.get('phone_main')) 
              || new RegExp(value, 'i').test(model.get('email'))) {
                self.eventAdd(model);
            }
        });
    },
    helperRenderHelpGroup: function(arg) {
        var self = this;
        this.collection.each(function(model) {
            if(new RegExp(arg, 'i').test(model.get('title'))) {
                self.eventAddGroup(model);
            }
        });
    },
    helperFetchHelp: function(arg) {
        var self = this;
        this.helperStatus[arg] = 'load';
        this.collections[arg] = new window.Invoices.CollectionItemInvoiceBuyersFind();
        this.collections[arg].fetch({
            data: {all: arg},
            success: function(collection) {
                
                self.helperStatus[arg] = 'loaded';
                
                if(typeof self.eventEndRequest == 'function') self.eventEndRequest.call(self, arg);
                
            },
            error: function(collection) {
                console.warn('ERROR');
            }
        });
    },
    helperCurrentQuery: undefined,
    helperStatus: {}// key: collectionBuyersFind status
});
