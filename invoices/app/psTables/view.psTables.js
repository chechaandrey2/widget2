window.Invoices.viewPsTables = Backbone.View.extend({
    initialize: function(opt) {
        
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesPsTbody', this.el).append(this.statsTemplate['psTablesItem'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesPsTbody > [data-id="'+model.get('gds_uid')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesPsTbody > [data-id="'+model.get('gds_uid')+'"]')
            .replaceWith(this.statsTemplate['psTablesItem'](model.toJSON()));
    },
    statsTemplate: {
        'psTables': _.template(window.Invoices.TEMPLATE['invoices/app/psTables/template.psTables.tpl']),
        'psTablesItem': _.template(window.Invoices.TEMPLATE['invoices/app/psTables/template.psTablesItem.tpl']),
        'psTablesItemEdit': _.template(window.Invoices.TEMPLATE['invoices/app/psTables/template.psTablesItemEdit.tpl']),
        'psTablesItemNew': _.template(window.Invoices.TEMPLATE['invoices/app/psTables/template.psTablesItemNew.tpl']),
        'psTablesDel': _.template(window.Invoices.TEMPLATE['invoices/app/psTables/template.psTablesDel.tpl'])
    },
    render: function(group) {
    
        var self = this;
        
        this.el.html(this.statsTemplate['psTables']());
        this.collection.fetch({
            data: {gr_id: group}, 
            add: true,
            success: function(collection, response) {
                $('#invoicesPsTbody', self.el).append(self.statsTemplate['psTablesItemNew']());
            },
            error: function(collection, response) {
                console.log('collection: %o; response: %o;', collection, response)
            }
        });
        
        this.helperGroup = group;
        
        this.helperDialogDel();
        
        return this;
    },
    events: {
        'click [name="save"]':'eventSaveItem',
        'click [name="del"]':'eventDeleteItem',
        'click [name="edit"]':'eventEditItem',
        'blur [data-label="edit"]':'eventSaveItemModel'
    },
    helperGroup: 0,
    eventDeleteItem: function(e) {
        this.helperItemDelModel = this.collection.get('gds_uid', $(e.target).attr('data-id'));
        $('#invoicesPsTablesDialogDel-'+this.helperGroup).dialog("open");
    },
    eventEditItem: function(e) {
        var model = this.collection.get('gds_uid', $(e.target).attr('data-id'));
        $('[data-id="'+model.get('gds_uid')+'"]', this.el)
            .replaceWith(this.statsTemplate['psTablesItemEdit'](model.toJSON()));
    },
    eventSaveItem: function(e) {
        var model = this.collection.get('gds_uid', $(e.target).attr('data-id'));
        if(model) {
            model.id = model.get('gds_uid');
            model.save(null, {error: function(model, res) {
                console.log('ERROR: %o; %o', model, res);
            }});
        } else {
            this.helperNewModel.call(this, e.target);
        }
    },
    eventSaveItemModel: function(e) {
        var model = this.collection.get('gds_uid', $(e.target).attr('data-id'));
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
            title: $('[name="title"]', cel.get(0)).val(),
            gr_id: id
		}, {
		    error: function(model, e) {console.log('model: %o; e: %o;', model, e)},
		    success: function(model) {
		        // remove appendChild model(Backbone collection add)
		        self.collection.trigger('remove', model);
		        // mod current element
		        cel.removeAttr('data-new');
		        cel.attr('data-id', model.get('gds_uid'));
		        $('input, textarea', cel.get(0)).each(function() {
		            if($(this).attr('data-id')) $(this).attr('data-id', model.get('gds_uid'));
		        });
		        $('input', cel.get(0)).removeAttr('disabled');
		        // append new new
		        $('#invoicesPsTbody', self.el).append(self.statsTemplate['psTablesItemNew']());
		    }
		});
		
		if(!res) cel.attr('data-state', 'new');
    },
    helperSearchNewModel: function(el) {
        if(el.attr('data-state')) return el; else return this.helperSearchNewModel(el.parent());
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['psTablesDel']({id: this.helperGroup}));
        var collection = this.collection;
        var self = this;
        $('#invoicesPsTablesDialogDel-'+this.helperGroup, this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var dialog = this;
				    
				    self.helperItemDelModel.id = self.helperItemDelModel.get('gds_uid');// hack
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
