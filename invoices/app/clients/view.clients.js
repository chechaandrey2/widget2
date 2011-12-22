window.Invoices.VIEWCLIENTS = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        
        this.collection.fetch({add: true});
        
    },
    eventAdd: function(model) {
        
    },
    el: $('#invoices_clients'),
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients.tpl']),
        'clients_add_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_add_group.tpl'])
    },
    render: function(group) {
    
        if(group === undefined) {
            console.log('main group');
            this.el.html(this.statsTemplate['clients']({groups: []}));
            
        } else {
            
        }
    
        $('#invoices_clients_tabs', this.el).tabs();
        
        // dialog
        this.el.append(this.statsTemplate['clients_add_group']());
        var self = this;
        $('#invoices_clients_dialog', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Add: function() {					
					// add group
					var title = $('#invoices_clients_dialog [name="group_name"]').val();
					if(title.length < 1) {
					    console.warn('group name - empty');
					    return;
					}
					self.collection.create({
					    title: title
					});
					
					$(this).dialog("close");
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
        // dialog
        
        return this;
        
    },
    events: {
        'click #invoices_clients_add_group': 'group_add'
    },
    group_add: function(e) {
        $('#invoices_clients_dialog').dialog("open");
    }
});
