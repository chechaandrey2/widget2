window.Invoices.CollectionItemInvoiceBuyersRemote = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceBuyersRemote,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_buyers'
    }
});
