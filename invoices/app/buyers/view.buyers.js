window.Invoices.viewClientsContacts = Backbone.View.extend({
    initialize: function(opt) {
        
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionClientsContacts();
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesClientsTbody [data-state="new"]', this.el).before(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]')
            .replaceWith(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    statsTemplate: {
        'clientsContacts': _.template(window.Invoices.TEMPLATE['invoices/app/buyers/template.buyers.tpl']),
        'clientsContactsItem': _.template(window.Invoices.TEMPLATE['invoices/app/buyers/template.buyersItem.tpl']),
        'clientsContactsItemEdit': _.template(window.Invoices.TEMPLATE['invoices/app/buyers/template.buyersItemEdit.tpl']),
        'clientsContactsItemNew': _.template(window.Invoices.TEMPLATE['invoices/app/buyers/template.buyersItemNew.tpl']),
        'clientsContactsDel': _.template(window.Invoices.TEMPLATE['invoices/app/buyers/template.buyersDel.tpl'])
    },
    render: function(group) {
        
        var self = this;
        
        this.el.html(this.statsTemplate['clientsContacts']());
        
        $('#invoicesClientsTbody', this.el).append(this.statsTemplate['clientsContactsItemNew']());
        
        this.collection.fetch({
            data: {gr_id: group}, 
            add: true,
            error: function(collection, response) {
                console.log('collection: %o; response: %o;', collection, response)
            }
        });
        
        this.helperGroup = group;
        
        this.helperDialogDel();
        
        return this;
    },
    events: {
        //'click [name="save"]':'eventSaveItem',
        //'click [name="del"]':'eventDeleteItem',
        //'click [name="edit"]':'eventEditItem',
        'blur [data-label="edit"]':'eventSaveItemModel'
    },
    helperGroup: 0,
    eventSaveItemModel: function() {
        
    }
    /*
    eventDeleteItem: function(e) {
        if(this.helperItemDelModel) return;
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
        if(model) {
            model.id = model.get('b_uid');
            model.save(null, {error: function(model, res) {
                console.log('ERROR: %o; %o', model, res);
            }});
        } else {
            this.helperNewModel.call(this, e.target);
        }
    },
    eventSaveItemModel: function(e) {
        var model = this.collection.get('b_uid', $(e.target).attr('data-id'));
        if(model) {
            var arg = model.attributes;
            arg[$(e.target).attr('name')] = $(e.target).val();
            model.set(arg, {error: function(model, e) {console.error(e)}});
        } else {
            this.helperNewModel.call(this, e.target);
        }
    },
    helperNewModel: function(el) {
        var self = this;
        var id = this.helperGroup;
        var cel = this.helperSearchNewModel($(el));
        
        // lock
        if(cel.attr('data-state') == 'saving') {
            // call backbone error
            return;
        }
        
        cel.attr('data-state', 'saving');
        
        var res = this.collection.create({
            name: $('[name="name"]', cel.get(0)).val(),
            phone_main: $('[name="phone_main"]', cel.get(0)).val(),
            email: $('[name="email"]', cel.get(0)).val(),
            gr_id: id
		}, {
		    silent: true,
		    error: function(model, e) {console.log('model: %o; e: %o;', model, e)},
		    success: function(model) {
		        // remove appendChild model(Backbone collection add)
		        //self.collection.trigger('remove', model);
		        // mod current element
		        cel.removeAttr('data-state');
		        cel.attr('data-id', model.get('b_uid'));
		        $('input, textarea', cel.get(0)).each(function() {
		            if($(this).attr('data-id')) $(this).attr('data-id', model.get('b_uid'));
		        });
		        $('input', cel.get(0)).removeAttr('disabled');
		        // append new new
		        $('#invoicesClientsTbody', self.el).append(self.statsTemplate['clientsContactsItemNew']());
		    }
		});
		
		if(!res) cel.attr('data-state', 'new');
    },
    helperSearchNewModel: function(el) {
        if(el.attr('data-state')) return el; else return this.helperSearchNewModel(el.parent());
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
    helperItemDelModel: undefined*/
});
