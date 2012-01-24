window.Invoices.CollectionGlobalMenu = Backbone.Collection.extend({
    model: window.Invoices.ModelGlobalMenuItem,
    initialize: function() {
        this.add([
            {name: 'goodss', hash: 'goods/'},
            {name: 'buyers', hash: 'buyers/'},
            {name: 'invoices', hash: 'invoices/'},
            {name: 'new invoice', hash: 'invoice/'},
            {name: 'merchant', hash: 'merchant/'}
        ]);
    }
});
