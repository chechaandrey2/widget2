window.Invoices.ModelItemInvoiceHelpSelectionGoods = Backbone.Model.extend({
    defaults: {
        gds_uid: 0,
        title: '',
        price: '0.00',
        units: '',
        img_url: null,
        desc_url: null
    },
    idAttribute: 'gds_uid'
});
