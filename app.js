var app = angular.module('lunch-booker', ['ngRoute']);
var menus = [{
    dish_name: '宫保鸡丁饭',
    image: 'gongbaojidingfan.jpeg',
    price: 10
}, {
    dish_name: '秘制鸡排饭',
    image: 'mizhijipaifan.jpeg',
    price: 10
}, {
    dish_name: '扁豆焖面',
    image: 'biandoumenmian.jpg',
    price: 10
}, {
    dish_name: '香肠炒饭',
    image: 'xiangchangchaofan.jpeg',
    price: 10
}];

app.service('checkDishesService', function() {
    var checked_dishes = [];
    var set_checked_dishes = function(dishes) {
        checked_dishes = dishes;
    };
    var get_checked_dishes = function() {
        return checked_dishes;
    };

    return {
        set_checked_dishes: set_checked_dishes,
        get_checked_dishes: get_checked_dishes
    };
});

app.controller('MenuController', ['$scope', 'checkDishesService', '$location',
    function($scope, checkDishesService, $location) {
        $scope.total = 0;
        $scope.dishes = menus;
        $scope.checked_dishes = [];
        $scope.updateCheckedDishes = function(index) {
            var clicked_dish = $scope.dishes[index];
            var idx = $scope.checked_dishes.indexOf(clicked_dish);
            if (idx == -1) {
                $scope.checked_dishes.push(clicked_dish);
            } else {
                $scope.checked_dishes.splice(idx, 1);
            }
            checkDishesService.set_checked_dishes($scope.checked_dishes);
        };

        $scope.go = function(path) {
            console.log(123);
            $location.path(path);
        };
    }
]);
app.controller('ConfirmController', ['$scope', 'checkDishesService', '$location',
    function($scope, checkDishesService, $location) {
        $scope.checked_dishes = checkDishesService.get_checked_dishes();
        var sum = 0;
        $scope.checked_dishes.forEach(function(dish) {
            sum += dish.price;
        });
        $scope.total = sum;
    }
]);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'menu.html',
                controller: 'MenuController'
            })
            .when('/confirm', {
                templateUrl: 'confirm.html',
                controller: 'ConfirmController'
            });
    }
])
