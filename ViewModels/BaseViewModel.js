function BaseViewModel() {
    var self = this;

    self.Content = ko.observable({ name: "BlogTemplate" });

    self.ChangeContent = function (content) {
        return function () {
            self.Content({ name: content + "Template", data: content + "ViewModel" });
        }
    }

    self.ShowBlog = self.ChangeContent("Blog");
    self.ShowGymTracker = self.ChangeContent("GymTracker");
    self.ShowAdmin = self.ChangeContent("Admin");
    self.ShowBreakout = self.ChangeContent("Breakout");
    self.ShowNetherCalc = self.ChangeContent("NetherCalc");
    self.ShowRecipeTool = self.ChangeContent("RecipeTool");

    self.Load = function(){
        self.ChangeContent("Blog");

    }

    self.Load();

}


