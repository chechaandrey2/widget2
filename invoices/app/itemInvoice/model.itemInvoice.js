window.Invoices.ModelItemInvoice = Backbone.Model.extend({
    defaults: {
        // read
        inv_uid: 0,
        status: 'draft',
        total: '0.00',// general
        msg: '',// general
        descr: '',// general
        currency: 'UAH',// general
        b_uid: 0,
        content: '[]',
        closed_at: null,
        created_at: null,
        expired_at: null,
        issued_at: null,
        paid_at: null,
        // write
        goods: [],// collection
        buyers: [],// collection
        is_issued: 0
    },
    syncArg: {
        'update': 'new_invoice'
    }
});
