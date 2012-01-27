/*
 * add options "expUnique"
 */
Backbone.Collection.prototype._add = function(model, options) {
    options || (options = {});
    model = this._prepareModel(model, options);
    if (!model) return false;
    if (options.expUnique) {
        var already = this.getByCid(model) || this.get(model.id) || this.get(options.expUnique, model.get(options.expUnique));
        //if (already) throw new Error(["Can't add the same model to a set twice", already.id]);
        if(already) {
            if (options.error) {
                options.error(model, {errno: 'add', msg: "Can't add the same model to a set twice"}, options);
            } else {
                this.trigger('error', model, {errno: 'add', msg: "Can't add the same model to a set twice"}, options);
            }
            return false;
        }
    }
    this._byId[model.id] = model;
    this._byCid[model.cid] = model;
    var index = options.at != null ? options.at :
        this.comparator ? this.sortedIndex(model, this.comparator) :
        this.length;
    this.models.splice(index, 0, model);
    model.bind('all', this._onModelEvent);
    this.length++;
    options.index = index;
    if (!options.silent) model.trigger('add', model, this, options);
    return model;
}
