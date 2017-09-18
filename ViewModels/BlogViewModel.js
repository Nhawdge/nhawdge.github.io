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