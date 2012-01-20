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
    idAttribute: 'gds_uid',
    validate: function(attrs) {
        if(attrs.units !== undefined && !(/^[a-zA-Z0-9а-яА-ЯёЁ\.,-_;:]{1,5}$/i.test(attrs.units || ''))) return {attr: 'units', msg: 'Attribute "units" - incorrect'};
        if(attrs.price !== undefined && !(/^([0-9]+)|([0-9]+\.[0-9]{0,2})$/i.test(attrs.price))) return {attr: 'price', msg: 'Attribute "price" - incorrect'};
        if(attrs.quantity !== undefined && !(/^[0-9]+$/i.test(attrs.quantity))) return {attr: 'quantity', msg: 'Attribute "quantity" - incorrect'};
        if(attrs.title !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title', msg: 'Attribute "title" - incorrect'};
    }
});
