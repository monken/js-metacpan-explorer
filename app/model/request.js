define(["model", "store/gist"], function(Model, Store) {
	return Model.extend({
		store: new Store(),
		defaults: {
			endpoint: null,
			body: null,
			response: null
		},
		request: function(options) {
			options = options || {};
			var self = this;
			var body = this.get("body");
			return $.ajax({
				url: "//api.metacpan.org" + this.get("endpoint"),
				dataType: "text",
				type: body ? "POST" : "GET",
				data: body ? body : null
			}).then(function(res) {
				self.set({
					response: res,
					success: true
				});
				return self;
			}, function(res) {
				self.set({
					response: res.responseText,
					success: false
				});
				return self;
			}).always(function(model) {
				if(options.gist !== false)
					model.save().done(function(model) {
						location.hash = "/" + model.id
					});
			});
		}
	});
});