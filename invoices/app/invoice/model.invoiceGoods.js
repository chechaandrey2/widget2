window.Invoices.ModelInvoiceGoods = Backbone.Model.extend({
    defaults: {
        nid: 0,
        gds_uid: 0,
        title: '',
        price: '0.00',
        total: 0,
        units: '',
        quantity: 0
    }
});
