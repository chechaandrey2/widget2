window.Invoices.CollectionInvoices = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoices,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_invoice_ex'
    }
});
