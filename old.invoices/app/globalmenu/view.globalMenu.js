window.Invoices.ViewGlobalMenu = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionGlobalMenu();
        
    },
    el: $('#invoicesGlobalMenu'),
    statsTemplate: {
        'globalmenu': _.template(window.Invoices.TEMPLATE['invoices/app/globalmenu/template.globalMenu.tpl'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['globalmenu'](this.collection));
        
        return this;
        
    }
});
