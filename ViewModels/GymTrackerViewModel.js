function GymTrackerViewModel () {
    var self = this;

    self.Load = function() {

    }

    self.Load();
}

ko.components.register('GymTracker', {
    viewModel: GymTrackerViewModel,
    template: {element: 'GymTrackerTemplate'}
})