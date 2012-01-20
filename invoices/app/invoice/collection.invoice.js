window.Invoices.CollectionInvoice = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoice,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_invoice_ex'
    }
});
