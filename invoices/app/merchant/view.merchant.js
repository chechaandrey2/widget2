window.Invoices.ViewMerchant = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.model = new window.Invoices.ModelMerchant();
        
    },
    eventChange: function(model) {
        var jsonModel = model.toJSON();
        this.el.prepend($(this.statsTemplate['merchant'].call(this, jsonModel)).iplaceholder());
        $('#invoicesMerchantDialogLogo [name="logo_url"]').val(jsonModel['logo_url'] || '');
    },
    eventAddLoader: function() {
        this.el.append(this.statsTemplate['merchantLoader'].call(this));
    },
    eventRemoveLoader: function() {
        $('[data-sync="merchant"]', this.el).remove();
    },
    statsTemplate: {
        'merchant': _.template(window.Invoices.TEMPLATE['invoices/app/merchant/template.merchant.tpl']),
        'merchantLoader': _.template(window.Invoices.TEMPLATE['invoices/app/merchant/template.merchantLoader.tpl']),
        'merchantDialogLogo': _.template(window.Invoices.TEMPLATE['invoices/app/merchant/template.merchantDialogLogo.tpl'])
    },
    render: function(opt) {// loader, success, error
    
        opt = opt || {};
    
        if(!this.model.get('id')) {
            this.model.fetch({
                data: {filter: ["s","s_set"]},
                error: opt.error,
                success: function(model) {
                    model.set(model.get('s')).set(model.get('s_set'));
                    if(typeof opt.success == 'function') opt.success.call(this, model);
                },
                loader: opt.loader
            });
        } else {
            if(typeof opt.success == 'function') opt.success.call(this.model, this.model);
        }
        
        return this;
        
    },
    renderDisplay: function(tab) {
        
        var self = this;
        
        if(_.indexOf(['contacts', 'pay', 'general'], tab) < 0) tab = 'contacts';
        
        this.render({
            success: function(model) {
                
                self.eventChange.call(self, model);
                
                $('#invoicesMerchantTabs', self.el).itabs({
                    elTabs: $('#invoicesMerchantTabs #invoicesMerchantTabsList', self.el),
                    selectorItem: '[data-id^="#"]',
                    selected: 'merchant/'+tab+'/'
                });
                
                $('[name="is_vat_payer"]', this.el).trigger('change');
                $('[name="to_notify"]', this.el).trigger('change');
                $('[name="pref_payment_id"]', this.el).trigger('change');
                
            },
            loader: function(progress) {
                if(progress == 0) {
                    self.eventAddLoader.call(self);
                } else if(progress == 1) {
                    self.eventRemoveLoader.call(self);
                }
            }
        });
        
        this.helperDialogLogo();
        
        return this;
        
    },
    renderDisplayItem: function(tab) {
        
        if(_.indexOf(['contacts', 'pay', 'general'], tab) < 0) tab = 'contacts';
        $('#invoicesMerchantTabs', self.el).itabs('select', 'merchant/'+tab+'/');
        
        $('[name="is_vat_payer"]', this.el).trigger('change');
        $('[name="to_notify"]', this.el).trigger('change');
        $('[name="pref_payment_id"]', this.el).trigger('change');
        
        return this;
        
    },
    events: {
        'click #invoicesMerchantEditLogo': 'eventDOMDialogLogo',
        'change [name="title"]': 'eventDOMChange',
        'change [name="email"]': 'eventDOMChange',
        'change [name="addr"]': 'eventDOMChange',
        'change [name="card"]': 'eventDOMChange',
        'change [name="to_sms"]': 'eventDOMChange',
        'change [name="is_vat_payer"]': 'eventDOMChangeCheckbox',
        'change [name="to_notify"]': 'eventDOMChangeCheckbox',
        'change [name="pref_payment_id"]': 'eventDOMChangeSelect',
        'click #invoicesMerchantSave': 'eventDOMSave'
    },
    eventDOMDialogLogo: function(e) {
        $('#invoicesMerchantDialogLogo').dialog('open');
    },
    eventDOMChange: function(e) {
        var data = {};
        data[$(e.target).attr('name')] = $(e.target).val();
        this.model.set(data, {error: function(model, err) {
            $(e.target).ierror({wrap: true, msg: err.msg});
        }});
    },
    eventDOMChangeCheckbox: function(e) {
        
        this.helperChangeCheckbox.call(this, e.target);
        
        this.eventDOMChange.call(this, e);
        
    },
    eventDOMChangeSelect: function(e) {
    
        this.helperChangeSelect.call(this, e.target);
        
        this.eventDOMChange.call(this, e);
        
    },
    eventDOMSave: function(e) {
        
        this.model.save(null, {
            error: function(model, err) {
                console.error('model: %o; err: %o', model, err);
            },
            loader: function(progress) {
                
            }
        });
        
    },
    helperDialogLogo: function() {
        var self = this;
    
        this.el.append(this.statsTemplate['merchantDialogLogo'].call(this));
        
        $('#invoicesMerchantDialogLogo', this.el)
        .iplaceholder()
        .dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: [
			    {text: "Ok", click: function() {
			        
			        var value = $('[name="logo_url"]', this).val();
			        self.model.set({logo_url: value});
			        $('#invoicesMerchantLogo', self.el).css("background-image", "url("+value+")");
			        $(this).dialog("close");
			        
			    }},
			    {text: "Cancel", click: function() { $(this).dialog("close"); }}
			]
        });
    },
    helperChangeSelect: function(el) {
        var value = $(el).val();
        
        $('#invoicesMerchantPayTable [data-id]').hide();
        $('#invoicesMerchantPayTable [data-id="'+value+'"]').show();
    },
    helperChangeCheckbox: function(el) {
        var name = $(el).attr('name');
        
        if($(el).attr('checked')) {
            $('#invoicesMerchantGeneralTable [data-id="'+name+'"]', this.el).removeClass('disabled');
            $(el).val(1);
        } else if(!$(el).attr('checked')) {
            $('#invoicesMerchantGeneralTable [data-id="'+name+'"]', this.el).addClass('disabled');
            $(el).val(0);
        }
    }
});
