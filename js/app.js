angular.module('flickrSearchApp', ['ngAnimate']).controller('MainCtrl', function($http, $scope) {
    // TODO: How do I know which variables I should declare globally?
    // Initialize variables
    var vm = this;
    vm.searchTag = ''; // Search tag
    // TODO: Like, it doesn't really seem like I need to declare vm.numResults globally, because I only use it within one function and it could just be defined there, right? What's better?
    vm.numResults = 0; // Number of search results
    vm.formInvalid = false; // If true, display error message; if false, hide error message
    vm.showResults = false; // If false, hide results; if true, show results
    vm.failure = false; // If false, get request was successful; if true, get request failed

    // Gets images based on user input for search tag
    vm.getImages = function() {
        // Parameters for HTTP request
        var flickrKey = '489f5baad9bf710b1d99af3959dae4e3';
        vm.searchTag = vm.searchInput;
        var params = {
            method: 'flickr.photos.search',
            api_key: flickrKey,
            tags: vm.searchTag,
            format: 'json',
            nojsoncallback: 1
        };

        $http({
            method: 'GET',
            url: 'https://api.flickr.com/services/rest/',
            params: params
        })
        // If the request is successful, populate results
        .then(function(response) {
            vm.numResults = response.data.photos.photo.length;
            vm.photos = response.data.photos.photo;
            vm.showResults = true;
        },
        // Else, display error message and don't populate or show results
        function(response) {
            vm.failure = true;
            vm.showResults = false;
        });
    };

    // Submits form and performs form validation
    vm.submit = function() {
        // If the form is valid, make the HTTP request and get the images
        if ($scope.flickrSearchForm.$valid) {
            vm.formInvalid = false;
            vm.getImages();
            vm.searchInput = ''; // Clears input field
        // Else, display error message asking the user for valid input
        } else {
            vm.formInvalid = true;
        }
    };
});
