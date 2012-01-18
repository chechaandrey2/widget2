window.Invoices.CollectionInvoicess = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoices,
    initialize: function() {
        this.add([
            {id: 1, name: 'created', title: 'draft'},
            {id: 2, name: 'issued', title: 'issued'},
            {id: 3, name: 'paid', title: 'paid'},
            {id: 4, name: 'expired', title: 'expired'},
            {id: 5, name: 'closed', title: 'closed'}
        ]);
    }
});
