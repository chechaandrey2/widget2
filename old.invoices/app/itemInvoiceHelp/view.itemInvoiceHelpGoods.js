window.Invoices.ViewItemInvoiceHelpGoods = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collectionGroups = new window.Invoices.CollectionItemInvoiceHelpGroupGoods();
        this.collectionItems = new window.Invoices.CollectionItemInvoiceHelpItem();
        
    },
    eventEndedRequest: undefined,
    render: function(key) {
    
        var data = {groups: null, items: null}, self = this;
        
        if(this.collectionGroups.length < 1 && !this.collectionGroups.load) {
            this.collectionGroups.fetch({
                success: function() {
                    if(typeof self.eventEndedRequest == 'function') self.eventEndedRequest.call(self, key);
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
            this.collectionItems.add({id: key, selection: new window.Invoices.CollectionItemInvoiceHelpSelectionGoods()});
            var model = this.collectionItems.get(key);
            model.get('selection').fetch({
                data: {name: key},
                success: function(collection) {
                    model.set({status: 'loaded'});
                    if(typeof self.eventEndedRequest == 'function') self.eventEndedRequest.call(self, key);
                }
            });
            model.set({status: 'load'});
        }
        
        return data;
    }
});
