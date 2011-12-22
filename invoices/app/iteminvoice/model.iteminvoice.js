window.Invoices.MODELITEMINVOICE = Backbone.Model.extend({
    defaults: {
        goods: [],// [{quantity:N, total:SUMM position, gds_uid:id}, ...]
        buyers: [],// [{b_uid:id}]
        total: 0,
        currency: 'UAH'
    }
});
