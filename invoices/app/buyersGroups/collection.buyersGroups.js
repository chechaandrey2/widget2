window.Invoices.CollectionBuyersGroups = Backbone.Collection.extend({
    model: window.Invoices.ModelBuyersGroups,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_group_brs'
    }
});
