window.Invoices.ModelInvoice = Backbone.Model.extend({
    defaults: {
        // read
        inv_uid: 0,
        status: 'draft',
        total: '0.00',// general
        msg: '',// general
        descr: '',// general
        currency: 'UAH',// general
        b_uid: 0,
        content: null,
        closed_at: null,
        created_at: null,
        expired_at: null,
        issued_at: null,
        paid_at: null,
        // write
        goods: new window.Invoices.CollectionInvoiceGoodss(),// collection
        buyers: new window.Invoices.CollectionInvoiceBuyers(),// collection
        is_issued: 0
    },
    syncArg: {
        'update': 'new_invoice'
    }
});
