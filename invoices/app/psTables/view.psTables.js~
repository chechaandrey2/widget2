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
        'psTablesDel': _.template(window.Invoices.TEMPLATE['invoices/app/psTables/template.psTablesDel.tpl'])
    },
    render: function(group) {
        
        this.el.html(this.statsTemplate['psTables']());
        this.collection.fetch({data: {gr_id: group}, add: true});
        
        this.helperGroup = group;
        
        this.helperDialogDel();
        
        return this;
    },
    events: {
        'blur #invoicesPsTablesNew [name^="new_"]':'eventNewPsTables',
        'keypress #invoicesPsTablesNew [name^="new_"]':'eventNewPsTablesEnter',
        'click [name="save"]':'eventSaveItem',
        'click [name="del"]':'eventDeleteItem',
        'click [name="edit"]':'eventEditItem',
        'blur [data-label="edit"]':'eventSaveItemModel'
    },
    eventNewPsTablesEnter: function(e) {
        if(e.which != 13) return;
        this.eventNewPsTables.call(this, e);
    },
    eventNewPsTables: function(e) {
        var id = this.helperGroup;
        var res = this.collection.create({
            title: $('#invoicesPsTablesNew [name="new_title"]', this.el).val(),
            gr_id: id
		}, {
		    error: function(model, e) {console.log('model: %o; e: %o;', model, e)},
		    success: function(model) {
		        $('#invoicesPsTablesNew [name^="new_"]', this.el).each(function() {
		            $(this).val('');
		        });
		    }
		});		
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
        model.id = model.get('gds_uid');
        model.save(null, {error: function(model, res) {
            console.log('ERROR: %o; %o', model, res);
        }});
    },
    eventSaveItemModel: function(e) {
        var model = this.collection.get('gds_uid', $(e.target).attr('data-id'));
        var arg = model.attributes;
        arg[$(e.target).attr('name')] = $(e.target).val();
        model.set(arg, {error: function(model, e) {console.error(e)}});
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
