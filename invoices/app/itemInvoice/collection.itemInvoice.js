window.Invoices.CollectionItemInvoice = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoice,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_invoice'
    }
});
