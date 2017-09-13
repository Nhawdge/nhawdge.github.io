function AdminViewModel () {
    var self = this;

    self.AdminContent = ko.observable({name: 'AdminBlogPost'});

    self.Load = function() {
        
    }

    self.Load();
}

function AdminBlogPostViewModel () {
    var self = this;

    self.BlogPost = ko.observable(new Blog());

    self.Load = function() {

    }

    self.SavePost = function() {
        var data = ko.toJSON(self.BlogPost);
        
        console.log(data);
        var request = new XMLHttpRequest();
        request.open("POST", 'http://nhawdge.net:1122', true)        
        request.setRequestHeader( "Content-type", "application/json");
        request.send(data);
    }

    self.Load();
}

ko.components.register('Admin', {
    viewModel: AdminViewModel,
    template: {element: 'AdminTemplate'}
});

ko.components.register('AdminBlogPost', {
    viewModel: AdminBlogPostViewModel,
    template: { element: 'AdminBlogTemplate' }
});