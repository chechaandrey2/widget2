window.Invoices.ViewClients = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
        //var self = this;
        
        // group list
        //this.el.html(this.statsTemplate['clients']());
        //this.collection.fetch({add: true, success: function() {
        //    self.helperSelected(1);
        //}});
        
        //this.helperDialogAdd();
        
        //this.helperDialogDel();
        
    },
    //_contacts: {},// {id: CollectionContacts}
    isObject: function(arg) {
        return (arg && typeof arg == 'object');
    },
    _views: {},// name: View
    eventAdd: function(model) {
        $('#invoicesClientsTabsList #invoicesClientsNewGroup', this.el)
            .before(this.statsTemplate['clientsItemGroup'](model.toJSON()));
    },
    eventRemove: function(model) {
        //$('#invoices_clients_tabs-list > [data-id="item-'+model.get('gr_id')+'"]').remove();
        //$('#invoices_clients_tabs [data-id="content-'+model.get('gr_id')+'"]').remove();
    },
    eventChange: function(model) {
        //$('#invoices_clients_tabs-list > [data-id="item-'+model.get('gr_id')+'"]')
        //    .replaceWith(this.statsTemplate['clients_item_group'](model.toJSON()));
    },
    el: $('#invoicesClients'),
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients.tpl']),
        'clientsItemGroup': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clientsItemGroup.tpl']),
        'clientsAddGroup': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clientsAddGroup.tpl']),
        
        //
        //'clients_del_group': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_del_group.tpl']),
        //
        //'clients_contacts': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients_table.tpl'])
    },
    l10nHash: {
        'ru':JSON.parse(window.Invoices.L10N['invoices/app/clients/l10n.ru.json'])
    },
    render: function() {
        // test l10n
        this.l10nLang = 'ru';
        console.log(this.l10n('Hello world'));
        // test l10n
        
        // contact list
        //if(this._contacts[group]) {
        //    self.helperSelected(group);
        //} else {
        //    this._contacts[group] = new window.Invoices.CollectionClientsContacts();
        //    $('[data-id="content-'+group+'"]', this.el).html(this.statsTemplate['clients_contacts']({id: group}));
        //    
        //}
        
        this.el.html(this.statsTemplate['clients']());
        this.collection.fetch({add: true, success: function() {
            console.warn('END FETCH');
        }});
        
        this.helperDialogAdd();
        
        return this;
        
    },
    renderItem: function(group) {
        
        if(!$('#invoicesClientsTabs > #invoicesClientsItem-'+group).size()) 
            $('#invoicesClientsTabs').append($('<div></div>').attr('id', 'invoicesClientsItem-'+group));
        
        if(!this.isObject(this._views[group])) {            
            this._views[group] = new window.Invoices.viewClientsContacts({
                router: this.router,
                el: $('#invoicesClientsItem-'+group),
                collection: new window.Invoices.CollectionClientsContacts()
            });
            this._views[group].render(group);
        } else {
            //this._views[group].render(group);
        }
        // selected
        this.helperSelected(group);
    },
    events: {
        'click #invoicesClientsAddGroup': 'eventGroupAdd',
        //'dblclick #invoices_clients_tabs-list [data-name="edit"]': 'eventGroupEdit',
        //'click #invoices_clients_tabs-list [name="delete"]': 'eventGroupDel'
        //'click #invoices_clients_tabs-list [data-id^="item-"]':'eventGroupSelected'
    },/*
    eventGroupSelected: function(e) {
        this.helperSelected($(e.target).attr('data-id'));
    },*/
    eventGroupAdd: function(e) {
        $('#invoicesClientsDialogAdd').dialog("open");
    },/*
    eventGroupEdit: function(e) {
        if($(e.target).attr('data-id') == 1) return
        var value = $(e.target).text();
        var collection = this.collection;
        var helper = function(el) {
            // optimize
            el.disabled = true;
        
            var model = collection.get('gr_id', $(el).attr('data-id'));
            model.id = model.get('gr_id');
            
            model.set({'title': $(el).val()}, {silent:true, error: function(model, e) {console.error(e)}});
            
            model.save();
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
    },*/
    helperDialogAdd: function() {
        this.el.append(this.statsTemplate['clientsAddGroup']());
        var collection = this.collection;
        $('#invoicesClientsDialogAdd', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Add: function() {
					var res = collection.create({
					    title: $('#invoicesClientsDialogAdd [name="groupName"]').val()
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
    },/*
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
				        // move to General & remove contacts current group at "del_force"
				        //self.helperSelected(1);
				    }});
                    
                    self.helperGroupDelModel = undefined;
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    helperGroupDelModel: undefined,*/
    helperSelected: function(id) {
        $('#invoicesClientsTabs #invoicesClientsTabsList', this.el).children().each(function() {
            if($(this).attr('data-id') != 'item-'+id) $(this).removeAttr('data-selected');
        });
        $('#invoicesClientsTabs [id^="invoicesClientsItem-"]', this.el).hide();
        $('#invoicesClientsTabs #invoicesClientsTabsList [data-id="item-'+id+'"]', this.el).attr('data-selected', 'selected');
        $('#invoicesClientsTabs [id="invoicesClientsItem-'+id+'"]', this.el).show();        
    }
});
