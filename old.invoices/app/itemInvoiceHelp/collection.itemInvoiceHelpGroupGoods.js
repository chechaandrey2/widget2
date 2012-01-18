window.Invoices.CollectionItemInvoiceHelpGroupGoods = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceHelpGroupGoods,
    initialize: function(opt) {
        
    },
    syncArg: {
        read: 'data_group_gds'
    },
    findExp: function(arg) {
        var res = new window.Invoices.CollectionItemInvoiceHelpGroupGoods();
        var exp = new RegExp(arg,'i');
        this.each(function(model) {
            if(exp.test(model.get('title'))) res.add(model);
        });
        return res;
    }
});
