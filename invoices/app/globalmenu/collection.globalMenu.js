window.Invoices.CollectionGlobalMenu = Backbone.Collection.extend({
    model: window.Invoices.ModelGlobalMenuItem,
    initialize: function() {
        this.add([
            {name: 'products/services', hash: 'ps/'},
            {name: 'clients', hash: 'clients/'},
            {name: 'invoices', hash: 'invoices/'},
            {name: 'new invoice', hash: 'iteminvoice/'}
        ]);
    }
});
