window.Invoices.ModelClientsContacts = Backbone.Model.extend({
    defaults: {
        b_uid: 0,
        img_url: '#',
        name: 'user name',
        phone_main: '000000000000',
        email: 'user@emial.com',
        addr: '',
        comment: ''
    },
    syncArg: {
        'read': null,
        'create': 'new_buyers',
        'update': 'edit_buyers',
        'delete': 'del_buyers'
    }
});
