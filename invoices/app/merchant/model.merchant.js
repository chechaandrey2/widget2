window.Invoices.ModelMerchant = Backbone.Model.extend({
    defaults: {
       
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
        'update': 'set_merch_edit',
        'create': 'set_merch_edit'
    },
    syncFilter: {
        'update': {there: ['email', 'logo_url', 'pref_payment', 'notivy_via', 'to_notify', 'is_vat_payer', 'descr', 'addr', 'currency', 'card']},
        'create': {there: ['email', 'logo_url', 'pref_payment', 'notivy_via', 'to_notify', 'is_vat_payer', 'descr', 'addr', 'currency', 'card']}
    },
    validate: function(attrs) {
        if(attrs.title !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title', msg: 'Attribute "title" - incorrect'};
        if(attrs.email !== undefined && !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attrs.email))) return {attr: 'email', msg: 'Attribute "email" - incorrect'};
        if(attrs.is_vat_payer !== undefined && !(/^(0|1)$/i.test(attrs.is_vat_payer))) return {attr: 'is_vat_payer', msg: 'Attribute "title" - incorrect'};
        if(attrs.to_notify !== undefined && !(/^(0|1)$/i.test(attrs.to_notify))) return {attr: 'to_notify', msg: 'Attribute "to_notify" - incorrect'};
        if(attrs.notivy_via !== undefined && !(/^(sms|email)$/i.test(attrs.notivy_via))) return {attr: 'notivy_via', msg: 'Attribute "notivy_via" - incorrect'};
        if(attrs.pref_payment !== undefined && !(/^(liqpay|p24|cash)$/i.test(attrs.pref_payment))) return {attr: 'pref_payment', msg: 'Attribute "pref_payment" - incorrect'};
        if(attrs.card !== undefined && !(/^[0-9]{12}$/i.test(attrs.card))) return {attr: 'card', msg: 'Attribute "card" - incorrect'};
    }
});
