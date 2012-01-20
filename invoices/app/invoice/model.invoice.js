window.Invoices.ModelInvoice = Backbone.Model.extend({
    defaults: {
        // read
        inv_uid: null,
        status: null,
        total: null,// general
        msg: '',// general
        descr: '',// general
        currency: 'UAH',// general
        closed_at: null,
        created_at: null,
        expired_at: null,
        issued_at: null,
        paid_at: null,
        
        content: null,
        b_info: null,
        
        // write
        goods: null,// collection
        buyers: null,// collection
        is_issued: 0
    },
    idAttribute: 'inv_uid',
    syncArg: {
        'create': 'new_invoice'
    }
});
