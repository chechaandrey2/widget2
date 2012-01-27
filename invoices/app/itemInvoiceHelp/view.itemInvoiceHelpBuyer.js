window.Invoices.ViewItemInvoiceHelpBuyer = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collectionGroups = new window.Invoices.CollectionItemInvoiceHelpGroupBuyer();
        this.collectionItems = new window.Invoices.CollectionItemInvoiceHelpItem();
        
    },
    eventEndedRequest: undefined,
    render: function(key, loader) {
    
        var lg = false, li = false, lsi = false;
    
        var data = {groups: null, items: null}, self = this;
        
        if(this.collectionGroups.length < 1 && !this.collectionGroups.load) {
            this.collectionGroups.fetch({
                error: function(model, err) {
                    if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                },
                success: function() {
                    self.helperLSG = true;
                    if(lsi && typeof self.eventEndedRequest == 'function') self.eventEndedRequest.call(self, key);
                },
                loader: function(progress) {
                    if(progress == 0) {
                        lg = true;
                        if(!li && typeof loader == 'function') loader.call(self, progress);
                    } else if(progress == 1) {
                        lg = false;
                        if(!li && typeof loader == 'function') loader.call(self, progress);
                    }
                }
            });
            this.collectionGroups.load = true;
        } else {
            // select
            data.groups = this.collectionGroups.findExp(key);
        }
        
        var sel = this.collectionItems.getExp(key);
        if(sel) {
            if(sel.get('status') == 'loaded') {
                // select
                data.items = sel.get('selection').findExp(key);
            } else if(sel.get('status') == 'unloaded') {
                
            } else if(sel.get('status') == 'load') {
                
            }
        } else {
            // add, fetch
            this.collectionItems.add({id: key, selection: new window.Invoices.CollectionItemInvoiceHelpSelectionBuyer()});
            var model = this.collectionItems.get(key);
            model.get('selection').fetch({
                data: {all: key},
                error: function(model, err) {
                    if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                },
                success: function(collection) {
                    model.set({status: 'loaded'});
                    lsi = true;
                    if(self.helperLSG && typeof self.eventEndedRequest == 'function') self.eventEndedRequest.call(self, key);
                },
                loader: function(progress) {
                    if(progress == 0) {
                        li = true;
                        if(!lg && typeof loader == 'function') loader.call(self, progress);
                    } else if(progress == 1) {
                        li = false;
                        if(!lg && typeof loader == 'function') loader.call(self, progress);
                    }
                }
            });
            model.set({status: 'load'});
        }
        
        return data;
    },
    helperLSG: false
});
