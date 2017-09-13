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
}

function Blog(data) {
    var self = this;

    if (data == null ) data = {};

    self.Title = ko.observable(data.Title);
    self.Text = ko.observable(data.Text);
    self.Author = ko.observable(data.Author);
    
    var date = new Date();
    var d = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    self.Date = ko.observable(d);
    

}

function BlogViewModel () {
    var self = this;

    self.BlogPostList = ko.observableArray();

    self.Load = function() {
        // Get posts
        self.BlogPostList.push(new Blog({
            Text: "Test blog post",
            Author: "John",
            Date: "07/04/17"
        }))
    }

    self.Load();
}

ko.components.register('Blog', {
    viewModel: BlogViewModel,
    template: {element: 'BlogTemplate'}
})