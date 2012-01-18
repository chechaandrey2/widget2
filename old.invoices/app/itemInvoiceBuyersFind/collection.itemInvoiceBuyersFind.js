window.Invoices.CollectionItemInvoiceBuyersFind = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceBuyersFind,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'find_buyers'
    }
});
