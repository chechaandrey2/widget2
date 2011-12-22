window.Invoices.VIEWGLOBALMENU = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    el: $('#invoices_globalmenu'),
    statsTemplate: {
        'globalmenu': _.template(window.Invoices.TEMPLATE['invoices/app/globalmenu/template.globalmenu.tpl'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['globalmenu'](this.collection));
        
        return this;
        
    }
});
