window.Invoices.ViewItemInvoiceBuyersFind = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.fetch();
        
    },
    eventAdd: function(model) {
        this.el.append();
    },
    eventAddGroup: function(model) {
        this.el.append();
    },
    collections: {},// key: collectionBuyersFind
    statsTemplate: {
        //'itemInvoice': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoice.tpl'])
    },
    render: function(value, el) {
    
        this.collection.each(function(model) {
            // draw for value
        });
        
        
        
        return this;
    },
    helperStatus: {}// key: collectionBuyersFind status
});
