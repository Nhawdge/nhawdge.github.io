function Coords() {
    var self = this;
    self.OverWorldX = ko.observable(0);
    self.OverWorldZ = ko.observable(0);

    self.NetherX = ko.computed(function () {
        return self.OverWorldX() / 8;
    })
    self.NetherZ = ko.computed(function () {
        var out = 0;
        return self.OverWorldZ() / 8;
    })
    self.Note = ko.observable("");
}

function NetherCalcViewModel() {
    var self = this;

    self.Coords = ko.observableArray();



    self.NewRow = function () {
        self.Coords.push(new Coords());
    }

    self.Save = function () {
        try {
            let data = JSON.stringify(ko.toJS(self.Coords));
            document.cookie = "NetherCalc=" + data;
            console.log(data);
            //throw  "Not yet implemented"
        }
        catch (ex) {
            alert(ex)
        }
    }

    self.Load = function () {
        // Check cookies for data 

        //else 
        self.Coords.push(new Coords());
    }
    self.Load();
}

ko.components.register('NetherCalc', {
    viewModel: NetherCalcViewModel,
    template: { element: 'NetherCalcTemplate' }
});
