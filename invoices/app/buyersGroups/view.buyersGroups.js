window.Invoices.ViewBuyersGroups = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionBuyersGroups();
        
        this.collectionBuyers = new window.Invoices.CollectionRouters();
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        //this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesClientsTabsList #invoicesClientsNewGroup', this.el)
            .before(this.statsTemplate['clientsItemGroup'].call(this, model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]', this.el).remove();
        this.collectionBuyers.remove(this.collectionBuyers.get(model.get('gr_id')));
    },
    eventChange: function(model) {
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroup'].call(this, model.toJSON()));
    },
    eventAddLoadre: function() {
        $('#invoicesClientsTabsList', this.el).prepend(this.statsTemplate['buyersGroupsLoader'].call(this));
        $('#invoicesClientsTabsList #invoicesClientsNewGroup', this.el).hide();
        $('#invoicesClientsTabsList #invoicesClientsImportBuyers', this.el).hide();
    },
    eventRemoveLoadre: function() {
        $('#invoicesClientsTabsList [data-sync="buyersGroups"]', this.el).remove();
        $('#invoicesClientsTabsList #invoicesClientsNewGroup', this.el).show();
        $('#invoicesClientsTabsList #invoicesClientsImportBuyers', this.el).show();
    },
    eventAddLoaderDialog: function() {
        $('#invoicesClientsDialogAdd').addClass('creating').append(this.statsTemplate['buyersGroupsLoaderDialog'].call(this));
    },
    eventRemoveLoaderDialog: function() {
        $('#invoicesClientsDialogAdd [data-sync="buyersGroups"]').remove();
        $('#invoicesClientsDialogAdd').removeClass('creating');
    },
    eventAddLoaderImport: function() {
        $('#invoicesBuyersImportDialog').addClass('upload').append(this.statsTemplate['buyersGroupsLoaderDialog'].call(this));
    },
    eventRemoveLoaderImport: function() {
        $('#invoicesBuyersImportDialog [data-sync="buyersGroups"]').remove();
        $('#invoicesBuyersImportDialog').removeClass('upload');
    },
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersGroups']),
        'clientsItemGroup': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersGroupsItem']),
        'clientsItemGroupEdit': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersGroupsItemEdit']),
        'clientsAddGroup': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersGroupsAdd']),
        'clientsDelGroup': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersGroupsDel']),
        'buyersGroupsLoader': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersGroupsLoader']),
        'buyersGroupsLoaderDialog': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersGroupsLoaderDialog']),
        'buyersDialogImport': _.template(window.Invoices.TEMPLATE['buyersGroups.buyersDialogImport'])
    },
    l10nHash: {
        'ru':JSON.parse(window.Invoices.L10N['buyersGroups.ru'])
    },
    render: function(group) {
        var self = this;
        
        this.el.html(this.statsTemplate['clients'].call(this));
        
        this.collection.fetch({
            add: true,
            error: function(collection, err) {
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
            },
            success: function() {
                self.helperSelected(group);
            },
            loader: function(progress) {
                if(progress == 0) self.eventAddLoadre.call(self);
                else if(progress == 1) self.eventRemoveLoadre.call(self);
            }
        });
        
        $('#invoicesClientsTabs', this.el).itabs({
            elTabs: $('#invoicesClientsTabs #invoicesClientsTabsList', this.el),
            selectorItem: '[data-id^="item-"]'
        });
        
        this.helperDialogAdd();
        
        this.helperDialogDel();
        
        this.helperDialogImport();
        
        return this;
        
    },
    renderItem: function(group) {
    
        var self = this;
        
        $('#invoicesClientsTabs', this.el).itabs('get', 'buyers/'+group+'/', function(el) {
            if(!self.collectionBuyers.get(group)) {
                self.collectionBuyers.add({
                    id: group,
                    view: new window.Invoices.viewBuyers({
                        router: self.router,
                        el: $(el)
                    })
                });
                self.collectionBuyers.get(group).get('view').render(group);
            }
        });
        
        this.helperSelected(group);
        
        return this;
    },
    events: {
        'click #invoicesClientsAddGroup': 'eventGroupAdd',
        'click #invoicesClientsTabsList [data-name="edit"]': 'eventGroupEdit',
        'click #invoicesClientsTabsList [data-name="delete"]': 'eventGroupDel',
        'blur #invoicesClientsTabsList [name^="name-edit-"]': 'eventGroupEditBlur',
        'keypress #invoicesClientsTabsList [name^="name-edit-"]': 'eventGroupEditEnter',
        'click #invoicesBuyersImportDialogOpen': 'eventDOMImport'
    },
    eventGroupAdd: function(e) {
        $('#invoicesClientsDialogAdd [name="groupName"]').val('');
        $('#invoicesClientsDialogAdd').dialog("open");
    },
    eventGroupEdit: function(e) {
        if($(e.target).attr('data-id') == 1) return;// General NOT EDITOR
        var model = this.collection.get('gr_id', $(e.target).attr('data-id'));
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroupEdit'].call(this, model.toJSON()));
        $('#invoicesClientsTabsList [data-id="'+model.get('gr_id')+'"]').focus();
    },
    eventGroupEditBlur: function(e) {
        if(e.target.done) return;
        
        var self = this;
        e.target.done = true;
        
        var model = this.collection.get($(e.target).attr('data-id'));
        
        var $c = $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]');
        
        $(e.target).attr('data-state', 'load');
        
        model.save({'title': $(e.target).val()}, {
            error: function(model, err) {
                
                if(err.attr) {// client
                    $(e.target).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                }
                
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
			    
			    if(e.target) e.target.done = false;
            },
            success: function(model) {
                
                self.eventChange.call(self, model);
                
                self.helperSelected.call(self, self.helperSelectedNumber);// fix bug
                
                if(e.target) e.target.done = false;
                
            },
            loader: function(progress) {
                if(progress == 0) {
                    $c.addClass('saving');
                } else if(progress == 1) {
                    $c.removeClass('saving');
                }
            }
       });
    },
    eventGroupEditEnter: function(e) {
        if(e.which != 13) return;
        this.eventGroupEditBlur.call(this,e);
    },
    eventGroupDel: function(e) {
        if(this.helperGroupDelModel) return;
        
        this.helperGroupDelModel = this.collection.get($(e.target).attr('data-id'));
        
        $('#invoicesClientsDialogDel [name="groupDelForce"]').get(0).checked = false;
        
        $('#invoicesClientsDialogDel').dialog("open");
    },
    eventDOMImport: function(e) {
        $('#invoicesBuyersImportDialog [type="file"]').ierror('remove').val('');
        $('#invoicesBuyersImportDialog').dialog('open');
    },
    helperDialogAdd: function() {
        this.el.append(this.statsTemplate['clientsAddGroup'].call(this));
        var self = this;
        
        var $e = $('#invoicesClientsDialogAdd [name="groupName"]');
        
        $('#invoicesClientsDialogAdd', this.el)
        .iplaceholder()
        .dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			draggable: false,
			buttons: {
				Add: function() {
				    var dialog = this;
			        self.collection.create({
			                title: $e.val()
			            }, {
			            error: function(model, err) {
			                if(err.attr) {// client
                                $e.ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                            }
                            
                            if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                            
				        },
				        success: function(model) {
				            $(dialog).dialog("close");
				        },
				        loader: function(progress) {
                            if(progress == 0) self.eventAddLoaderDialog.call(self);
                            else if(progress == 1) self.eventRemoveLoaderDialog.call(self);
                        }
			        });
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['clientsDelGroup'].call(this));
        var collection = this.collection;
        var self = this;
        $('#invoicesClientsDialogDel', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			draggable: false,
			buttons: {
				Remove: function() {
				    var del_force = $('#invoicesClientsDialogDel [name="groupDelForce"]:checked').size();
				    var dialog = this;
				    
				    var $c = $('#invoicesClientsTabsList > [data-id="item-'+self.helperGroupDelModel.get('gr_id')+'"]', self.el);
				    
				    self.helperGroupDelModel.set({'buyers': del_force});
				    self.helperGroupDelModel.destroy({
				        error: function(model, err) {
				            
				            if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
				            
				        }, success: function(model) {
				        
				            // move to General & remove buyers current group at "del_force"
				            if(self.helperSelectedNumber == model.id) {
				                // remove "General" selection
				                if(del_force) self.collectionBuyers.remove(self.collectionBuyers.get(1));
				                self.router.navigate('buyers/1/', true);				            
				            }
				        
				        },
				        loader: function(progress) {
                            if(progress == 0) {
                                $c.addClass('removing');
                            } else if(progress == 1) {
                                $c.removeClass('removing');
                            }
                        }
				    });
				    
                    self.helperGroupDelModel = undefined;
                    $(dialog).dialog('close');
				},
				Cancel: function() {
				    self.helperGroupDelModel = undefined;
					$(this).dialog("close");
				}
			}
        });
    },
    helperGroupDelModel: undefined,
    helperSelected: function(id) {
        $('#invoicesClientsTabs', this.el).itabs('select', 'buyers/'+id+'/');
        this.helperSelectedNumber = id;
    },
    helperSelectedNumber: 0,
    helperDialogImport: function() {
        this.el.append(this.statsTemplate['buyersDialogImport'].call(this));
        var self = this;
        
        var $form = $('#invoicesUpload').clone(true)
            .show().appendTo($('[data-id="form"]', $dialog)).attr('id', 'invoicesBuyersImportForm');
        
        var $dialog = $('#invoicesBuyersImportDialog', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			draggable: false,
			buttons: [
			    {text: 'Import', click: function() {
			        
			        // --async upload--
			        
			        var dialog = this;
			        
			        // check exp file
			        var val = $('[type="file"]', $form).val() || '', ftype = (val.substr(val.length-4, 4) || '').toLowerCase();
			        
			        if(ftype != '.csv' && ftype != '.vcf') {
			            $('[type="file"]', $form).ierror({wrap: true, msg: self.helperGetError.call(self, null, {attr: 'import'})});
			            return;
			        }
			        
			        // start loader
                    self.eventAddLoaderImport.call(self);
                    
                    $.ajax({
                        url: 'https://pulyaev.test.liqpay.com/?do=invoices&act=ajax',
                        fileInput: $('[type="file"]', $form),
                        formData: [{name: 'json', value: JSON.stringify({
                            subname: "import_buyers",
                            inputfile: $('[type="file"]', $form).attr('name'),
                            data: {
                                encoding: $('[name="encoding"]', dialog).val(),
                                filetype: ftype.substr(ftype.length-3, 3)
                            }
                        })}],
                        paramName: 'file',
                        type: 'POST',
                        dataType: "iframe",
                        success: function(data) {
                        
                            try {
                                data = JSON.parse($(data).text()) || {};
                            } catch(E) {
                                alert(E);
                                return;
                            }
                            
                            data.data = data.data || {};
                            if(data.data.error || data.data.errors) {
                                // error
                                $('[type="file"]', $form).ierror({wrap: true, msg: data.data.msg || data.data.errors});
                            } else {
                                // success
                                // reload & redirect buyers group General(1)
                                self.collectionBuyers.remove(self.collectionBuyers.get(1));
                                self.router.navigate('buyers/1/', true);
                            }
                            
                        },
                        error: function(jqXHR) {
                            console.error('ERROR: %o', jqXHR);
                        },
                        complete: function() {
                            // end loader
                            $('[type="file"]', $form).val('');
                            self.eventRemoveLoaderImport.call(self);
                        }
                    });
                    
                    // --async upload--
			        
			    }},
			    {text: 'Cancel', click: function() {
			        $dialog.dialog('close');
			    }}
			]
        });
        
    },
    helperGetError: function(model, err) {
        if(err.attr == 'title') {
            if(err.arg) {
                return 'Buyer group duplication';
            } else {
                return 'Buyer group title - incorrect';
            }
        } else if(err.attr == 'import') {
            return 'File import buyers - incorrect';
        }
    }
});
