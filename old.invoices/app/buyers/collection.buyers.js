window.Invoices.CollectionBuyers = Backbone.Collection.extend({
    model: window.Invoices.ModelBuyers,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_buyers'
    }
});
