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
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]')
            .replaceWith(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    statsTemplate: {
        'clientsContacts': _.template(window.Invoices.TEMPLATE['invoices/app/clientsContacts/template.clientsContacts.tpl']),
        'clientsContactsItem': _.template(window.Invoices.TEMPLATE['invoices/app/clientsContacts/template.clientsContactsItem.tpl']),
        'clientsContactsItemEdit': _.template(window.Invoices.TEMPLATE['invoices/app/clientsContacts/template.clientsContactsItemEdit.tpl']),
        'clientsContactsDel': _.template(window.Invoices.TEMPLATE['invoices/app/clientsContacts/template.clientsContactsDel.tpl'])
    },
    render: function(group) {
        
        this.el.html(this.statsTemplate['clientsContacts']());
        this.collection.fetch({data: {gr_id: group}, add: true});
        
        this.helperGroup = group;
        
        this.helperDialogDel();
        
        return this;
    },
    events: {
        'blur #invoicesClientsContactsNew [name^="new_"]':'eventNewClientContacts',
        'keypress #invoicesClientsContactsNew [name^="new_"]':'eventNewClientContactsEnter',
        'click [name="save"]':'eventSaveItem',
        'click [name="del"]':'eventDeleteItem',
        'click [name="edit"]':'eventEditItem',
        'blur [data-label="edit"]':'eventSaveItemModel'
    },
    eventNewClientContactsEnter: function(e) {
        if(e.which != 13) return;
        this.eventNewClientContacts.call(this, e);
    },
    eventNewClientContacts: function(e) {
        var id = this.helperGroup;
        var res = this.collection.create({
            name: $('#invoicesClientsContactsNew [name="new_name"]', this.el).val(),
            phone_main: $('#invoicesClientsContactsNew [name="new_phone"]', this.el).val(),
            email: $('#invoicesClientsContactsNew [name="new_email"]', this.el).val(),
            gr_id: id
		}, {
		    error: function(model, e) {console.log('model: %o; e: %o;', model, e)},
		    success: function(model) {
		        $('#invoicesClientsContactsNew [name^="new_"]', this.el).each(function() {
		            $(this).val('');
		        });
		    }
		});		
    },
    helperGroup: 0,
    eventDeleteItem: function(e) {
        this.helperItemDelModel = this.collection.get('b_uid', $(e.target).attr('data-id'));
        $('#invoicesClientsContactsDialogDel-'+this.helperGroup).dialog("open");
    },
    eventEditItem: function(e) {
        var model = this.collection.get('b_uid', $(e.target).attr('data-id'));
        $('[data-id="'+model.get('b_uid')+'"]', this.el)
            .replaceWith(this.statsTemplate['clientsContactsItemEdit'](model.toJSON()));
    },
    eventSaveItem: function(e) {
        var model = this.collection.get('b_uid', $(e.target).attr('data-id'));
        model.id = model.get('b_uid');
        model.save(null, {error: function(model, res) {
            console.log('ERROR: %o; %o', model, res);
        }});
    },
    eventSaveItemModel: function(e) {
        var model = this.collection.get('b_uid', $(e.target).attr('data-id'));
        var arg = model.attributes;
        arg[$(e.target).attr('name')] = $(e.target).val();
        model.set(arg, {error: function(model, e) {console.error(e)}});
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['clientsContactsDel']({id: this.helperGroup}));
        var collection = this.collection;
        var self = this;
        $('#invoicesClientsContactsDialogDel-'+this.helperGroup, this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var dialog = this;
				    
				    self.helperItemDelModel.id = self.helperItemDelModel.get('b_uid');// hack
				    self.helperItemDelModel.destroy({success: function(model) {
				        $(dialog).dialog('close');
				    }});
                    
                    self.helperItemDelModel = undefined;
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
		});
    },
    helperItemDelModel: undefined
});
