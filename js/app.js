angular.module('flickrSearchApp', []).controller('MainCtrl', function($http, $scope) {
    var vm = this;

    // Initialize variables
    vm.searchTag = ''; // Search tag
    vm.numResults = 0; // Number of search results
    vm.formIsValid = false; // Determines what to show/hide based on validity of submitted form

    // Gets images based on user input for search tag
    vm.getImages = function() {
        // Parameters for HTTP request
        var flickrKey = '489f5baad9bf710b1d99af3959dae4e3';
        var tag = vm.searchTag;
        var params = {
            method: 'flickr.photos.search',
            api_key: flickrKey,
            tags: tag,
            format: 'json',
            nojsoncallback: 1
        };

        $http({
            method: 'GET',
            url: 'https://api.flickr.com/services/rest/',
            params: params
        })
        // If the request is successful, populate images
        .then(function(response) {
            vm.numResults = response.data.photos.photo.length;
            vm.photos = response.data.photos.photo;
            console.log(vm.photos);
        },
        // Else, display error message
        function(response) {
            console.log('error');
        });
    };

    // Submits form and performs validation
    vm.submit = function() {
        // If the form is valid, make the HTTP request and get the images
        if ($scope.flickrSearchForm.$valid) {
            vm.formIsValid = true;
            vm.getImages();
        // Else, display error message asking the user for valid input
        } else {
            vm.formIsValid = false;
            console.log('Please fill in the search field');
        }
    };
});
