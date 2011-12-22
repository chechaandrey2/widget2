window.Invoices.VIEWCLIENTS = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        
    },
    eventAdd: function(model) {
        $('#invoices_clients_tabs-list #invoices_clients_new_group', this.el)
            .before(this.statsTemplate['clients_item_group'](model.toJSON()));
    },
    el: $('#invoices_clients'),
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients.tpl']),
        'clients_add_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_add_group.tpl']),
        'clients_del_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_del_group.tpl']),
        'clients_item_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_item_group.tpl'])
    },
    l10nHash: {
        'en':JSON.parse(window.Invoices.L10N['invoices/app/clients/l10n.en.json'])
    },
    render: function(group) {
        // test l10n
        this.l10nLang = 'en';
        console.log(this.l10n('Привет мир'));
        // test l10n
    
        if(group === undefined) {
            console.log('main group');
            this.el.html(this.statsTemplate['clients']());
            this.collection.fetch({add: true});
        } else {
            
        }
        
        this.dialog_add();
        
        this.dialog_del();
        
        return this;
        
    },
    events: {
        'click #invoices_clients_add_group': 'group_add',
        'dblclick #invoices_clients_tabs-list [data-name="edit"]': 'group_edit',
        'click #invoices_clients_tabs-list [name="delete"]': 'group_del'
    },
    group_add: function(e) {
        $('#invoices_clients_dialog').dialog("open");
    },
    group_edit: function(e) {
        console.log(e.target);
        
    },
    group_del: function(e) {
        $('#invoices_clients_dialog_del').dialog("open");
    },
    dialog_add: function() {
        this.el.append(this.statsTemplate['clients_add_group']());
        var collection = this.collection;
        $('#invoices_clients_dialog', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Add: function() {
					var title = $('#invoices_clients_dialog [name="group_name"]').val();
					if(title.length < 1) {
					    console.warn('group name - empty');
					    return;
					}
					collection.create({
					    title: title
					});
					
					$(this).dialog("close");
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    dialog_del: function() {
        this.el.append(this.statsTemplate['clients_del_group']());
        var collection = this.collection;
        $('#invoices_clients_dialog_del', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    /*
					var title = $('#invoices_clients_dialog [name="group_name"]').val();
					if(title.length < 1) {
					    console.warn('group name - empty');
					    return;
					}
					collection.create({
					    title: title
					});
					*/
					
					$(this).dialog("close");
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    }
});
