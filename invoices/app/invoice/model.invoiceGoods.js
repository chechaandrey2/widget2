window.Invoices.ModelInvoiceGoods = Backbone.Model.extend({
    defaults: {
        nid: 0,
        gds_uid: null,
        title: null,
        price: null,
        total: 0,
        units: null,
        quantity: 0
    },
    idAttribute: 'gds_uid'
});
