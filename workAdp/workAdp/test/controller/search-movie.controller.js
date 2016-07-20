describe("searchMovieController", function () {
    var $rootscope,
        $scope,
        controller;
    beforeEach(function () {
        module('adphorusWork');

        inject(function ($injector) {
            $rootscope = $injector.get('$rootScope');
            $scope = $rootscope.new();
            controller = $injector.get('controller')("searchMovieController", { $scope: $scope })
        });
    });

    describe("Testing scope", function () {
        it("Should instantiate author to Sevgi Cakmak", function () {
            expect($scope.author).toEqual("Sevgi Cakmak")
        });
    });
});