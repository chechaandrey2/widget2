Backbone.Collection.prototype.get = function(index, value) {
    if(arguments.length === 1) {
        return this.get(index);
    } else if(arguments.length == 2) {
        for(var i=0; i<this.models.length; i++) {
            if(this.models[i].get(index) == value) return this.models[i];
        }
    }
}
