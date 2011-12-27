window.Invoices.ViewPs = Backbone.View.extend({
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
        $('#invoicesPsTabsList #invoicesPsNewGroup', this.el)
            .before(this.statsTemplate['psItemGroup'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesPsTabsList > [data-id="item-'+model.get('gr_id')+'"]', this.el).remove();
        delete this._views[model.get('gr_id')];
        $('#invoicesPsTabs [id="invoicesPsItem-'+model.get('gr_id')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesPsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['psItemGroup'](model.toJSON()));
    },
    el: $('#invoicesPs'),
    statsTemplate: {
        'ps': _.template(window.Invoices.TEMPLATE['invoices/app/ps/template.ps.tpl']),
        'psItemGroup': _.template(window.Invoices.TEMPLATE['invoices/app/ps/template.psItemGroup.tpl']),
        'psItemGroupEdit': _.template(window.Invoices.TEMPLATE['invoices/app/ps/template.psItemGroupEdit.tpl']),
        'psAddGroup': _.template(window.Invoices.TEMPLATE['invoices/app/ps/template.psAddGroup.tpl']),
        'psDelGroup': _.template(window.Invoices.TEMPLATE['invoices/app/ps/template.psDelGroup.tpl'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['ps']());
        this.collection.fetch({add: true});
        
        this.helperDialogAdd();
        
        this.helperDialogDel();
        
        return this;
        
    },
    renderItem: function(group) {console.warn('PS GROUP: %o', group);
        
        if(!$('#invoicesPsTabs > #invoicesPsItem-'+group).size()) 
            $('#invoicesPsTabs').append($('<div></div>').attr('id', 'invoicesPsItem-'+group));
        /*
        if(!this.isObject(this._views[group])) {            
            this._views[group] = new window.Invoices.viewPsContacts({
                router: this.router,
                el: $('#invoicesPsItem-'+group),
                collection: new window.Invoices.CollectionPsContacts()
            });
            this._views[group].render(group);
        } else {
            //this._views[group].render(group);
        }
        
        
        // selected
        this.helperSelected(group);
        */
    },
    events: {
        'click #invoicesPsAddGroup': 'eventGroupAdd',
        'click #invoicesPsTabsList [name="edit"]': 'eventGroupEdit',
        'click #invoicesPsTabsList [name="delete"]': 'eventGroupDel',
        'blur #invoicesPsTabsList [name^="name-edit-"]':'eventGroupEditBlur',
        'presskey #invoicesPsTabsList [name^="name-edit-"]':'eventGroupEditEnter'
    },
    eventGroupAdd: function(e) {
        $('#invoicesPsDialogAdd [name="groupName"]').val('');
        $('#invoicesPsDialogAdd').dialog("open");
    },
    eventGroupEdit: function(e) {
        if($(e.target).attr('data-id') == 1) return;// General NOT EDITOR
        var model = this.collection.get('gr_id', $(e.target).attr('data-id'));
        $('#invoicesPsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['psItemGroupEdit'](model.toJSON()));
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
        $('#invoicesPsDialogDel [name="groupDelForce"]').get(0).checked = false;
        $('#invoicesPsDialogDel').dialog("open");
    },
    helperDialogAdd: function() {
        this.el.append(this.statsTemplate['psAddGroup']());
        var collection = this.collection;
        $('#invoicesPsDialogAdd', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Add: function() {
					var res = collection.create({
					    title: $('#invoicesPsDialogAdd [name="groupName"]').val()
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
        this.el.append(this.statsTemplate['psDelGroup']());
        var collection = this.collection;
        var self = this;
        $('#invoicesPsDialogDel', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var del_force = $('#invoicesPsDialogDel [name="groupDelForce"]:checked').size();
				    var dialog = this;
				    
				    self.helperGroupDelModel.id = self.helperGroupDelModel.get('gr_id');// hack
				    self.helperGroupDelModel.set({'goods': del_force});
				    self.helperGroupDelModel.destroy({success: function(model) {
				        $(dialog).dialog('close');
				        // move to General & remove contacts current group at "del_force"
				        if(self.helperSelectedNumber == model.id) {
				            self.router.navigate('ps/1/', true);				            
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
        $('#invoicesPsTabs #invoicesPsTabsList', this.el).children().each(function() {
            if($(this).attr('data-id') != 'item-'+id) $(this).removeAttr('data-selected');
        });
        $('#invoicesPsTabs [id^="invoicesPsItem-"]', this.el).hide();
        $('#invoicesPsTabs #invoicesPsTabsList [data-id="item-'+id+'"]', this.el).attr('data-selected', 'selected');
        $('#invoicesPsTabs [id="invoicesPsItem-'+id+'"]', this.el).show();
        this.helperSelectedNumber = id;
    },
    helperSelectedNumber: 0
});
