function KoModelViewModel() {
    var self = this;

    self.Input = ko.observable("Id\nFirst Name\n LastName");

    self.InputList = ko.observableArray();

    self.ConvertInput = function() {
        var input = self.Input();
        console.log(input);
        var inputArray = input.split(/r/)
    }


    self.Load = function() {


    }

    self.Load();
}