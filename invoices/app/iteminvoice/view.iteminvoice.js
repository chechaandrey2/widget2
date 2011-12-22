window.Invoices.VIEWITEMINVOICE = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    el: $('#invoices_iteminvoice'),
    statsTemplate: {
        'iteminvoice': _.template(window.Invoices.TEMPLATE['invoices/app/iteminvoice/template.iteminvoice.tpl']),
        'iteminvoice_new_ps': _.template(window.Invoices.TEMPLATE['invoices/app/iteminvoice/template.iteminvoice_new_ps.tpl'])
    },
    render: function(id) {
    
        if(id === undefined) {
            console.log('new invoice');
            this.el.html(this.statsTemplate['iteminvoice']({title: 'title'}));
            $('#invoices_iteminvoice_pss', this.el).html(this.statsTemplate['iteminvoice_new_ps']());
        } else {
            console.log('view/edit invoice');
        }
        
        $('#invoices_iteminvoice_tabs', this.el).tabs();
        
        return this;
        
    }
});
