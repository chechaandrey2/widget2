window.Invoices.ModelGoods = Backbone.Model.extend({
    defaults: {
        gds_uid: null,
        title: '',
        price: '0.00',
        units: '',
        img_url: null,
        desc_url: null
    },
    idAttribute: 'gds_uid',
    syncArg: {
        'read': null,
        'create': 'new_goods',
        'update': 'edit_goods',
        'delete': 'del_goods'
    },
    validate: function(attrs) {
        if(attrs.title !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title', msg: 'Attribute "title" - incorrect'};
        if(attrs.units !== undefined && !(/^[a-zA-Z0-9а-яА-ЯёЁ\.,-_;:]{1,5}$/i.test(attrs.units || ''))) return {attr: 'units', msg: 'Attribute "units" - incorrect'};
        if(attrs.price !== undefined && !(/^([0-9]+)|([0-9]+\.[0-9]{0,2})$/i.test(attrs.price))) return {attr: 'price', msg: 'Attribute "price" - incorrect'};
    }
});
