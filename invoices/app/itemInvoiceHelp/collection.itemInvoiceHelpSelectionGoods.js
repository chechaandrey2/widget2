window.Invoices.CollectionItemInvoiceHelpSelectionGoods = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceHelpSelectionGoods,
    initialize: function(opt) {
        
    },
    syncArg: {
        read: 'find_goods'
    },
    findExp: function(arg) {
        var res = new window.Invoices.CollectionItemInvoiceHelpSelectionGoods();
        var exp = new RegExp(arg,'i');
        this.each(function(model) {
            if(exp.test(model.get('title'))) res.add(model);
        });
        return res;
    }
});
