window.Invoices.ModelClientsContacts = Backbone.Model.extend({
    defaults: {
        b_uid: 0,
        img_url: '',
        name: '',
        phone_main: null,
        email: null,
        addr: null,
        comment: null
    },
    syncArg: {
        'read': null,
        'create': 'new_buyers',
        'update': 'edit_buyers',
        'delete': 'del_buyers'
    },
    validate: function(attrs) {console.log(attrs);
        if(attrs.name !== undefined && !(/^[\w\sа-яА-ЯёЁ\.,\(\)]+$/i.test(attrs.name))) return 'Attribute "name" - incorrect';
        
        if((attrs.email || attrs.email === '') && (attrs.phone_main || attrs.phone_main === '')) {
            if(!(/^\+[0-9]{12,12}$/i.test(attrs.phone_main))) return 'Attribute "phone_main" - incorrect';
            if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attrs.email))) return 'Attribute "email" - incorrect';
        } else if(!(attrs.email || attrs.email === '') && (attrs.phone_main || attrs.phone_main === '')) {
            if(!(/^\+[0-9]{12,12}$/i.test(attrs.phone_main))) return 'Attribute "phone_main" - incorrect';
        } else if((attrs.email || attrs.email === '') && !(attrs.phone_main || attrs.phone_main === '')) {
            if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attrs.email))) return 'Attribute "email" - incorrect';
        } else if(!(attrs.email || attrs.email === '') && !(attrs.phone_main || attrs.phone_main === '')) {
            //return 'Attribute "email" & "phone_main" - incorrect';
        }
        
    }
});
