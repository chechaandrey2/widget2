window.Invoices.ModelItemInvoiceHelpSelectionGoods = Backbone.Model.extend({
    defaults: {
        gds_uid: null,
        title: '',
        price: '0.00',
        units: '',
        img_url: null,
        desc_url: null
    },
    idAttribute: 'gds_uid',
    validate: function(attrs) {
        if(attrs.title !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title'};
        if(attrs.units !== undefined && !(/^[a-zA-Z0-9а-яА-ЯёЁ\.,-_;:]{1,5}$/i.test(attrs.units || ''))) return {attr: 'units'};
        if(attrs.price !== undefined && !(/^([0-9]+|[0-9]+\.[0-9]{0,2})$/i.test(attrs.price+'')) || attrs.price == 0) return {attr: 'price'};
    }
});
