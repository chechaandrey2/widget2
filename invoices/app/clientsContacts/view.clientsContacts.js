window.Invoices.viewClientsContacts = Backbone.View.extend({
    initialize: function(opt) {
        
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesClientsTbody', this.el).append(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    eventRemove: function(model) {
        
    },
    eventChange: function(model) {
        
    },
    statsTemplate: {
        'clientsContacts': _.template(window.Invoices.TEMPLATE['invoices/app/clientsContacts/template.clientsContacts.tpl']),
        'clientsContactsItem': _.template(window.Invoices.TEMPLATE['invoices/app/clientsContacts/template.clientsContactsItem.tpl'])
    },
    render: function(group) {
        
        this.el.html(this.statsTemplate['clientsContacts']());
        this.collection.fetch({data: {gr_id: group}, add: true, success: function() {
            console.warn('END FETCH 1');
        }});
        
    },
    events: {
        
    }
});
