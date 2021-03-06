var app = angular.module("app",["ui.router","pagination"]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "admin/home.html"
        }).state("brand", {
            url:"/brand",
            templateUrl: "admin/brand.html"
        }).state("specification", {
        url:"/specification",
        templateUrl: "admin/specification.html"
        }).state("typeTemplate", {
        url:"/typeTemplate",
        templateUrl: "admin/type_template.html"
        }).state("sellerAudit", {
        url:"/sellerAudit",
        templateUrl: "admin/seller_1.html"
        }).state("itemCat", {
        url:"/itemCat",
        templateUrl: "admin/item_cat.html"
        }).state("goods", {
        url:"/goods",
        templateUrl: "admin/goods.html"
        }).state("content", {
        url: "/content",
        templateUrl: "admin/content.html"
    });
});
