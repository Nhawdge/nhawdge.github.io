function BaseViewModel () {
    var self = this;

    self.Content = ko.observable({name: "Blog"});

    self.ChangeContent = function(content) {
        return function() {
            self.Content({name: content});
        }
    }

    self.ShowBlog = self.ChangeContent("Blog");
    self.ShowGymTracker = self.ChangeContent("GymTracker");
    self.ShowAdmin = self.ChangeContent("Admin");
    self.ShowBreakout = self.ChangeContent("Breakout");
    self.ShowNetherCalc = self.ChangeContent("NetherCalc");
    self.ShowRecipeTool=self.ChangeContent("RecipeTool")
}	


