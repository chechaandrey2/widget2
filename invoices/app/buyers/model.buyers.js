window.Invoices.ModelBuyers = Backbone.Model.extend({
    defaults: {
        b_uid: null,
        img_url: '',
        name: '',
        phone_main: null,
        email: null,
        addr: null,
        comment: null
    },
    idAttribute: 'b_uid',
    syncArg: {
        'read': null,
        'create': 'new_buyers',
        'update': 'edit_buyers',
        'delete': 'del_buyers'
    },
    syncFilter: {
        'create': {there: ['name', 'phone_main', 'email', 'addr', 'comment', 'gr_id']},
        'update': {there: ['b_uid', 'name', 'phone_main', 'email', 'addr', 'comment']},
        'delete': {there: ['b_uid']}
    },
    validate: function(attrs) {
        if(attrs.name !== undefined) {
            if(!(/^[\w\sа-яА-ЯёЁ\.,\(\)]+$/i.test(attrs.name || ''))) return {attr: 'name'};
        }
        
        if(this.unvalid(attrs.email) && this.unvalid(attrs.phone_main)) {
            if((this.forInLength(attrs) === 1 && attrs['b_uid'] > 0) || attrs['error'] == 0) {// fix
                // true
            } else {
                if(!(/^\+[0-9]{12,12}$/i.test(attrs.phone_main))) return {attr: 'phone_main'};
                if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attrs.email))) return {attr: 'email'};
            }
        } else if(this.unvalid(attrs.email) && !this.unvalid(attrs.phone_main)) {
            if(!(/^\+[0-9]{12,12}$/i.test(attrs.phone_main))) return {attr: 'phone_main'};;
        } else if(!this.unvalid(attrs.email) && this.unvalid(attrs.phone_main)) {
            if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attrs.email))) return {attr: 'email'};
        } else if(!this.unvalid(attrs.email) && !this.unvalid(attrs.phone_main)) {
            if(!(/^\+[0-9]{12,12}$/i.test(attrs.phone_main))) return {attr: 'phone_main'};;
            if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attrs.email))) return {attr: 'email'};
        }
        
    },
    unvalid: function(arg) {
        return (arg === undefined || arg === null);
    },
    forInLength: function(arg) {
        var j = 0;
        for(var i in arg) j++;
        return j;
    }
});
