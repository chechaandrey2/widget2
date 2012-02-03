window.Invoices.CollectionItemInvoiceHelpItem = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceHelpItem,
    initialize: function() {
        
    },
    getExp: function(arg) {
        var m = null;
        this.each(function(model) {
            var exp = new RegExp(model.id, 'i');
            if(exp.test(arg)) { m = model; return false; }
        });
        return m;
    }
});
