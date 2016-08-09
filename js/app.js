angular.module('flickrSearchApp', []).controller('MainCtrl', function($http) {
    var vm = this;
    vm.searchTag = '';

    vm.submit = function() {
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
            // TODO: not sure if 'data' or 'params' here
            params: params
        })
        .then(function(response) {
            console.log(response.data.photos.photo);
        },
        function(response) {
            console.log(response);
        });
    };
});
