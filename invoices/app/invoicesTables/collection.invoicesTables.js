window.Invoices.CollectionInvoicesTables = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoicesTable,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_invoice'
    }
});
