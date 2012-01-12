window.Invoices.CollectionClientsContacts = Backbone.Collection.extend({
    model: window.Invoices.ModelClientsContacts,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_buyers'
    }
});
