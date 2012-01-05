window.Invoices.CollectionInvoiceBuyers = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoiceBuyer,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_buyers'
    }
});
