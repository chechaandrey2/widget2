window.Invoices.VIEWCLIENTS = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        
    },
    eventAdd: function(model) {
        $('#invoices_clients_tabs-list #invoices_clients_new_group', this.el)
            .before(this.statsTemplate['clients_item_group'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoices_clients_tabs-list [data-id="'+model.get('gr_id')+'"]').remove();
    },
    el: $('#invoices_clients'),
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients.tpl']),
        'clients_add_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_add_group.tpl']),
        'clients_del_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_del_group.tpl']),
        'clients_item_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_item_group.tpl'])
    },
    l10nHash: {
        'ru':JSON.parse(window.Invoices.L10N['invoices/app/clients/l10n.ru.json'])
    },
    render: function(group) {
        // test l10n
        this.l10nLang = 'ru';
        console.log(this.l10n('Hello world'));
        // test l10n
    
        if(group === undefined) {
            console.log('main group');
            this.el.html(this.statsTemplate['clients']());
            this.collection.fetch({add: true});
        } else {
            
        }
        
        this.helperDialogAdd();
        
        this.helperDialogDel();
        
        return this;
        
    },
    events: {
        'click #invoices_clients_add_group': 'eventGroupAdd',
        'dblclick #invoices_clients_tabs-list [data-name="edit"]': 'eventGroupEdit',
        'click #invoices_clients_tabs-list [name="delete"]': 'eventGroupDel'
    },
    eventGroupAdd: function(e) {
        $('#invoices_clients_dialog').dialog("open");
    },
    eventGroupEdit: function(e) {
        var value = $(e.target).html();
        var collection = this.collection;
        var helper = function(el) {
            var model = collection.get('gr_id', $(el).attr('data-id'));
            //model.set({'title': $(el).val()}, {
            //    error: function(model, e) {console.log(e)}
            //});
            console.log(model.get('title'));
            if(model.changedAttributes('title')) {
                model.save({'title': $(el).val()});
                console.log('change');
            } else {
                // render
                console.log('no change');
            }
        }
        $(e.target).replaceWith(
            $('<input type="text" />')
                .attr('data-id', $(e.target).attr('data-id'))
                .attr('name', $(e.target).attr('data-name'))
                .val(value)
                .bind('blur', function(e) {
                    helper(e.target);
                })
                .bind('keypress', function(e) {
                    if(e.which != 13) return;
                    helper(e.target);
                })
        );
        $('[name="'+$(e.target).attr('data-name')+'"]', e.target.parentNode).focus();
    },
    eventGroupDel: function(e) {
        this.helperGroupDelModel = this.collection.get('gr_id', $(e.target).attr('data-id'));
        $('#invoices_clients_dialog_del').dialog("open");
    },
    helperDialogAdd: function() {
        this.el.append(this.statsTemplate['clients_add_group']());
        var collection = this.collection;
        $('#invoices_clients_dialog', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Add: function() {
					var res = collection.create({
					    title: $('#invoices_clients_dialog [name="group_name"]').val()
					}, {
					    error: function(model, e) {console.log(e)}
					});
					
					if(res) { $(this).dialog("close"); }
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['clients_del_group']());
        var collection = this.collection;
        var self = this;
        $('#invoices_clients_dialog_del', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var del_force = $('#invoices_clients_dialog_del [name="group_del_force"]:checked').size();
				    var dialog = this;
				    
				    self.helperGroupDelModel.id = self.helperGroupDelModel.get('gr_id');// hack
				    self.helperGroupDelModel.set({'buyers': del_force});
				    self.helperGroupDelModel.destroy({success: function() {
				        $(dialog).dialog('close');
				        // move to General
				        // remove contacts current group at "del_force"
				    }});
                    
                    self.helperGroupDelModel = undefined;
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    helperGroupDelModel: undefined
});
