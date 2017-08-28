;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('smartcity.app')
        .controller('leftNavBarCtrl', Controller)

    function Controller (Menu, Auth) {

        var vm = this
        vm.menu = getMenu()
        vm.active = Menu.active

        activate()

        ////////////////////////////////


        function activate () {

        }


        function getMenu () {
            return [
                { title: 'Ana Sayfa', link: '/admin/dashboard', route: '/admin/dashboard', authorization:'VIEW_MENU_DASHBOARD' },
                { title: 'Kullanıcılar', link:'/admin/users', route:'/admin/users', authorization:'VIEW_MENU_USERS' },
                { title: 'Uygulamalar', link: '/admin/apps', route: '/admin/apps', authorization:'VIEW_MENU_APPS' },
                { title: 'Uygulama Tipleri', link: '/admin/app-type', route: '/admin/app-type', authorization:'VIEW_MENU_APPTYPE' },
                { title: 'Cihazlar', link: '/admin/devices', route: '/admin/devices', authorization:'VIEW_MENU_DEVICES' },
                { title: 'Domainler', link: '/admin/domains', route: '/admin/domains', authorization:'VIEW_MENU_DOMAINS' },
                { title: 'Yetkiler', link: '/admin/authorization', route: '/admin/authorization', authorization:'VIEW_MENU_AUTHORIZATION' },
                { title: 'Roller', link: '/admin/roles', route: '/admin/roles', authorization:'VIEW_MENU_ROLES' },
                { title: 'Alarmlar', link: '/admin/alarms', route: '/admin/alarms', authorization:'VIEW_MENU_ALARMS' },
                { title: 'Widget Havuzu', link:'/admin/widget', route:'/admin/widget', authorization:'VIEW_MENU_WIDGET' },
                { title: 'Custom Widget', link:'/admin/custom-widget', route:'/admin/custom-widget', authorization:'VIEW_MENU_WIDGET' },
                { title: 'Sayfalar', link:'/admin/pages', route:'/admin/pages', authorization:'VIEW_MENU_PAGES' },
                { title: 'İrtibat', link:'/admin/contacts', route:'/admin/contacts', authorization:'VIEW_MENU_CONTACTS' },
            ]
        }

    }

})()
