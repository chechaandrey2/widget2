window.Invoices.ModelInvoices = Backbone.Model.extend({
    defaults: {
        inv_uid: null,
        currency: 'UAH',
        b_uid: 0,
        total: '0.00',
        descr: null,
        msg: null,
        status: null,
        closed_at: null,
        created_at: null,
        paid_at: null,
        issued_at: null,
        expired_at: null,
        buyers: []
    },
    idAttribute: 'inv_uid',
    syncArg: {
        'update': 'issue_invoice'
    }
});
