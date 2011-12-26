window.Invoices.ViewClients = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    isObject: function(arg) {
        return (arg && typeof arg == 'object');
    },
    _views: {},// name: View
    eventAdd: function(model) {
        $('#invoicesClientsTabsList #invoicesClientsNewGroup', this.el)
            .before(this.statsTemplate['clientsItemGroup'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]', this.el).remove();
        delete this._views[model.get('gr_id')];
        $('#invoicesClientsTabs [id="invoicesClientsItem-'+model.get('gr_id')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroup'](model.toJSON()));
    },
    el: $('#invoicesClients'),
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clients.tpl']),
        'clientsItemGroup': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clientsItemGroup.tpl']),
        'clientsItemGroupEdit': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clientsItemGroupEdit.tpl']),
        'clientsAddGroup': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clientsAddGroup.tpl']),
        'clientsDelGroup': _.template(window.Invoices.TEMPLATE['invoices/app/clients/template.clientsDelGroup.tpl'])
    },
    l10nHash: {
        'ru':JSON.parse(window.Invoices.L10N['invoices/app/clients/l10n.ru.json'])
    },
    render: function() {
        // test l10n
        this.l10nLang = 'ru';
        console.log(this.l10n('Hello world'));
        // test l10n
        
        this.el.html(this.statsTemplate['clients']());
        this.collection.fetch({add: true});
        
        this.helperDialogAdd();
        
        this.helperDialogDel();
        
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
        'click #invoicesClientsTabsList [name="edit"]': 'eventGroupEdit',
        'click #invoicesClientsTabsList [name="delete"]': 'eventGroupDel',
        'blur #invoicesClientsTabsList [name^="name-edit-"]':'eventGroupEditBlur',
        'presskey #invoicesClientsTabsList [name^="name-edit-"]':'eventGroupEditEnter'
    },
    eventGroupAdd: function(e) {
        $('#invoicesClientsDialogAdd [name="groupName"]').val('');
        $('#invoicesClientsDialogAdd').dialog("open");
    },
    eventGroupEdit: function(e) {
        if($(e.target).attr('data-id') == 1) return;// General NOT EDITOR
        var model = this.collection.get('gr_id', $(e.target).attr('data-id'));
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroupEdit'](model.toJSON()));
    },
    eventGroupEditBlur: function(e) {console.log(e.target);
        // optimize
        e.target.disabled = true;
        
        var model = this.collection.get('gr_id', $(e.target).attr('data-id'));
        model.id = model.get('gr_id');
        
        model.set({'title': $(e.target).val()}, {silent:true, error: function(model, e) {console.error(e)}});
        
        model.save();
    },
    eventGroupEditEnter: function(e) {
        if(e.which != 13) return;
        this.eventGroupEditBlur.call(this,e);
    },
    eventGroupDel: function(e) {
        this.helperGroupDelModel = this.collection.get('gr_id', $(e.target).attr('data-id'));
        $('#invoicesClientsDialogDel [name="groupDelForce"]').get(0).checked = false;
        $('#invoicesClientsDialogDel').dialog("open");
    },
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
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['clientsDelGroup']());
        var collection = this.collection;
        var self = this;
        $('#invoicesClientsDialogDel', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var del_force = $('#invoicesClientsDialogDel [name="groupDelForce"]:checked').size();
				    var dialog = this;
				    
				    self.helperGroupDelModel.id = self.helperGroupDelModel.get('gr_id');// hack
				    self.helperGroupDelModel.set({'buyers': del_force});
				    self.helperGroupDelModel.destroy({success: function(model) {
				        $(dialog).dialog('close');
				        // move to General & remove contacts current group at "del_force"
				        if(self.helperSelectedNumber == model.id) {
				            self.router.navigate('clients/1/', true);				            
				        }
				    }});
                    
                    self.helperGroupDelModel = undefined;
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    helperGroupDelModel: undefined,
    helperSelected: function(id) {
        $('#invoicesClientsTabs #invoicesClientsTabsList', this.el).children().each(function() {
            if($(this).attr('data-id') != 'item-'+id) $(this).removeAttr('data-selected');
        });
        $('#invoicesClientsTabs [id^="invoicesClientsItem-"]', this.el).hide();
        $('#invoicesClientsTabs #invoicesClientsTabsList [data-id="item-'+id+'"]', this.el).attr('data-selected', 'selected');
        $('#invoicesClientsTabs [id="invoicesClientsItem-'+id+'"]', this.el).show();
        this.helperSelectedNumber = id;
    },
    helperSelectedNumber: 0
});
