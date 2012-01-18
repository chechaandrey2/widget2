window.Invoices.CollectionInvoices = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoice,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_invoice'
    }
});
