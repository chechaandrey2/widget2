window.Invoices.CollectionGoods = Backbone.Collection.extend({
    model: window.Invoices.ModelGoods,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_goods'
    }
});
