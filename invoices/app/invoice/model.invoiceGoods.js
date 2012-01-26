window.Invoices.ModelInvoiceGoods = Backbone.Model.extend({
    defaults: {
        nid: 0,
        gds_uid: null,
        title: null,
        price: '0.00',
        total: 0,
        units: null,
        quantity: 1
    },
    syncFilter: {
        'new': {there: ['quantity', 'total', 'price', 'units', 'title', 'gr_id']},
        'item': {there: ['quantity', 'total', 'gds_uid']}
    },
    idAttribute: 'gds_uid',
    validate: function(attrs) {
        if(attrs.units !== undefined && !(/^[a-zA-Z0-9а-яА-ЯёЁ\.,-_;:]{1,5}$/i.test(attrs.units || ''))) return {attr: 'units'};
        if(attrs.price !== undefined && !(/^([0-9]+|[0-9]+\.[0-9]{0,2})$/i.test(attrs.price+'')) || attrs.price == 0) return {attr: 'price'};
        if(attrs.quantity !== undefined && !(/^[0-9]+$/i.test(attrs.quantity)) || attrs.quantity == 0) return {attr: 'quantity'};
        if(attrs.title !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title'};
    }
});
