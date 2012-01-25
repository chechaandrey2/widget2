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
        goods: null,
        buyers: null,
        _goods: null,// collection
        _buyers: null,// collection
        is_issued: 0
    },
    idAttribute: 'inv_uid',
    syncArg: {
        'create': 'new_invoice',
        'update': 'new_invoice'// hack
    },
    syncFilter: {
        'create': {there: ['goods', 'buyers', 'total', 'currency', 'descr', 'msg', 'pref_system_id', 'created_at', 'expired_at', 'is_regular', 'is_issued']},
        'update': {there: ['goods', 'buyers', 'total', 'currency', 'descr', 'msg', 'pref_system_id', 'created_at', 'expired_at', 'is_regular', 'is_issued']}
    },
    validate: function(attrs) {
        if(attrs.goods && attrs.goods.length < 1) return {attr: 'goods', msg: 'Attribute "goods" - incorrect'};
        if(attrs.buyers && attrs.buyers.length < 1) return {attr: 'buyers', msg: 'Attribute "buyers" - incorrect'};
    }
});
