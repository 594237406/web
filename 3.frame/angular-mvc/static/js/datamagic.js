/**
 * Created by lihongji on 2015/7/29.
 */

var datamagic=angular.module('datamagic',['ngRoute']);
datamagic.config(function($routeProvider){
    $routeProvider.when('/a',{
        templateUrl:'../tmpl/a.html',
        controller:'Aaaa'
    }).when('/b',{
        templateUrl:'../tmpl/b.html',
        controller:'Bbbb'
    }).when('/c',{
        templateUrl:'../tmpl/c.html',
        controller:'Cccc'
    }).when('/d',{
        templateUrl:'../tmpl/d.html',
        controller:'Dddd'
    }).otherwise({
        redirectTo:'/'
    });
})