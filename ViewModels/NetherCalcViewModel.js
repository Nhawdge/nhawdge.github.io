function FromOverWorldCoords(data) {
    var self = this;
    self.OverWorld = ko.observable(true);
    self.OverWorldX = ko.observable(data ? data.OverWorldX : 0);
    self.OverWorldZ = ko.observable(data ? data.OverWorldZ : 0);

    self.NetherX = ko.computed(function () {
        return self.OverWorldX() / 8;
    })
    self.NetherZ = ko.computed(function () {
        var out = 0;
        return self.OverWorldZ() / 8;
    })
    self.Note = ko.observable(data ? data.Note : "");
}

function FromNetherCoords(data) {
    var self = this;
    self.OverWorld = ko.observable(false);
    self.NetherX = ko.observable(data ? data.NetherX : 0);
    self.NetherZ = ko.observable(data ? data.NetherX : 0);

    self.OverWorldX = ko.computed(function () {
        return self.NetherX() * 8;
    })
    self.OverWorldZ = ko.computed(function () {
        var out = 0;
        return self.NetherZ() * 8;
    })
    self.Note = ko.observable(data ? data.Note : "");
}

function NetherCalcViewModel() {
    var self = this;

    self.Coords = ko.observableArray();

    self.NewOverWorldRow = function () {
        self.Coords.push(new FromOverWorldCoords());
    }
    self.NewNetherRow = function () {
        self.Coords.push(new FromNetherCoords());
    }

    self.RemoveRow = function (row) {
        self.Coords.remove(row);
    }

    self.Save = function () {
        try {
            let data = JSON.stringify(ko.toJS(self.Coords));
            document.cookie = "NetherCalc=" + data;
            alert("Saved!");
        }
        catch (ex) {
            alert(ex)
        }
    }

    self.Load = function () {
        // Check cookies for data 
        var cookies = document.cookie.split(';')
        var nethercalc = cookies.find(function (e) { return e.split('=')[0] == ' NetherCalc' })
        if (nethercalc) {
            var coords = eval(nethercalc.split("=")[1]);
            for (i in coords) {
                if (coords[i].OverWorld) {
                    self.Coords.push(new FromOverWorldCoords(coords[i]))
                }
                else {
                    self.Coords.push(new FromNetherCoords(coords[i]))
                }
            }
        }
        else {
            self.Coords.push(new FromOverWorldCoords());
        }
    }
    self.Load();
}

ko.components.register('NetherCalc', {
    viewModel: NetherCalcViewModel,
    template: { element: 'NetherCalcTemplate' }
});
