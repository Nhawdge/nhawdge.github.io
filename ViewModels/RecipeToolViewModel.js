function IngredientModel(data) {
    var self = this;

    if (data == null) data = {};

    self.Id = ko.observable(data.Id);
    self.Name = ko.observable(data.Name);
    self.Quantity = ko.observable(data.Quantity);

}

function MenuItemModel(data) {
    var self = this;
}

function RecipeToolViewModel() {
    var self = this;


    self.Load = function () {


    }

    self.Load();

}
