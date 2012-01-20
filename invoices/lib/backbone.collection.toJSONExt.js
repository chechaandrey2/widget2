Backbone.Collection.prototype.toJSONExt = function(opts) {
    return this.map(function(model){ return model.toJSONExt(opts); });
}
