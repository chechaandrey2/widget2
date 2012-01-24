window.Invoices.ModelMerchant = Backbone.Model.extend({
    defaults: {
       id: null,
       
       title: null,
       phone: null,
       email: null,
       addr: null,
       logo_url: null,
       
       currency: "UAH",
       is_vat_payer: 0,
       to_notify: 0,
       notivy_via: null,
       descr: null,
       
       pref_payment: null,
       card: null,
       mfo: null,
       okpo: null
       
    },
    syncArg: {
        'read': 'all_data_inv',
        'update': 'set_merch_edit'
    },
    syncFilter: {
        'update': {there: ['email', 'logo_url', 'pref_payment', 'notivy_via', 'to_notify', 'is_vat_payer', 'descr', 'addr', 'currency', 'card']}
    }
});
