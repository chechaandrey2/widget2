window.Invoices.ModelPsTable = Backbone.Model.extend({
    defaults: {
        gds_uid: 0,
        title: 'product/service name',
        price: '0.00',
        units: 'pcs.',
        img_url: null,
        desc_url: null
    },
    syncArg: {
        'read': null,
        'create': 'new_goods',
        'update': 'edit_goods',
        'delete': 'del_goods'
    },
    validate: function(attrs) {
        if(attrs.title !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return 'Attribute "title" - incorrect';
        //if(attrs.price > 0 && !(/^\d+\.\d{2}$/i.test(attrs.price))) return 'Attribute "price" - incorrect';
    }
});
