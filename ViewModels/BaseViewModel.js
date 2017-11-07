function BaseViewModel() {
    var self = this;

    self.Content = ko.observable({ name: "BlogTemplate" });

    self.ChangeContent = function (content,vm) {
        return function () {
            self.Content({
                name: content + "Template",
                data: vm
            });
        }
    }

    self.ShowBlog = self.ChangeContent("Blog", new BlogViewModel());
    self.ShowGymTracker = self.ChangeContent("GymTracker", new GymTrackerViewModel());
    self.ShowAdmin = self.ChangeContent("Admin", new AdminViewModel());
    self.ShowBreakout = self.ChangeContent("Breakout", new BreakoutViewModel());
    self.ShowNetherCalc = self.ChangeContent("NetherCalc", new NetherCalcViewModel());
    self.ShowRecipeTool = self.ChangeContent("RecipeTool");

    self.Load = function () {
        self.ChangeContent("Blog");

    }

    self.Load();

}


