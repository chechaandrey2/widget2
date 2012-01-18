window.Invoices.CollectionPsTables = Backbone.Collection.extend({
    model: window.Invoices.ModelPsTable,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_goods'
    }
});
