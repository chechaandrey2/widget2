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
    syncFilter: {
        'create': {there: ['title', 'price', 'units', 'desc_url', 'gr_id']},
        'update': {there: ['gds_uid', 'title', 'price', 'units', 'desc_url']},
        'delete': {there: ['gds_uid']}
    },
    validate: function(attrs) {
        if(attrs.title !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title'};
        if(attrs.units !== undefined && !(/^[a-zA-Z0-9а-яА-ЯёЁ\.,-_;:]{1,5}$/i.test(attrs.units || ''))) return {attr: 'units'};
        if(attrs.price !== undefined && !(/^([0-9]+|[0-9]+\.[0-9]{0,2})$/i.test(attrs.price+'')) || attrs.price == 0) return {attr: 'price'};
        //if(attrs.desc_url && !(/^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/.test(attrs.desc_url))) return {attr: 'desc_url', msg: 'Attribute "desc_url" - incorrect'};
        if(attrs.desc_url && !(/^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?$/.test(attrs.desc_url))) return {attr: 'desc_url'};
    }
});
