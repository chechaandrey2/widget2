window.Invoices.ModelClientsContacts = Backbone.Model.extend({
    defaults: {
        b_uid: 0,
        img_url: '',
        name: 'user name',
        phone_main: '+000000000000',
        email: 'user@emial.com',
        addr: '',
        comment: ''
    },
    syncArg: {
        'read': null,
        'create': 'new_buyers',
        'update': 'edit_buyers',
        'delete': 'del_buyers'
    },
    validate: function(attrs) {
        if(attrs.name !== undefined && !(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.name))) return 'Attribute "name" - incorrect';
        if(attrs.phone_main !== undefined && !(/^\+[0-9]{12,12}$/i.test(attrs.phone_main))) return 'Attribute "phone_main" - incorrect';
        if(attrs.email !== undefined && !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attrs.email))) return 'Attribute "email" - incorrect';
    }
});
