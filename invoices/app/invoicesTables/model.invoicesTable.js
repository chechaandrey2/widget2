window.Invoices.ModelInvoicesTable = Backbone.Model.extend({
    defaults: {
        inv_uid: 0,
        currency: 'UAH',
        b_uid: 0,
        byers: [],// {id, name, email, phone}
        total: '0.00',
        descr: '',
        status: null,
        closed_at: null,
        created_at: null,
        paid_at: null,
        issued_at: null,
        expired_at: null
    },
    syncArg: {
        'read': null,
        'create': null,
        'update': null,
        'delete': null
    }
});
