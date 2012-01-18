window.Invoices.ModelInvoiceBuyer = Backbone.Model.extend({
    defaults: {
        nid: 0,
        b_uid: null,
        img_url: '',
        name: null,
        phone_main: null,
        email: null
    },
    idAttribute: 'b_uid'
});
