;(function (angular, btoa) {
  'use strict'

  angular
    .module('scaffold.app')
    .factory('Auth', Service)

  function Service ($q, $http, $location, Settings, Notificator, PublicApi, $base64, localStorageService) {

    var baseUrl = "{baseURL}"
    var route = "{subroute}"
    var user = {}
    var account = {}

    var service = {
      user: user,
      getUser: getUser,
      account: account,
      login: login,
      logout: logout,
      signup: signup,
      requestResetPassword: requestResetPassword,
      resetPassword: resetPassword,
      verifyAccount: verifyAccount,
      setCredentials: setCredentials,
      findUserByPasswordResetToken: findUserByPasswordResetToken,
      findUserByInvitationToken: findUserByInvitationToken,
      clearCookie: clearCookie
    }

    return service

    // //////////////////////////////

    /**
     * Authenticates user and saves access token
     *
     * @param  {Object} credentials
     * @return {Promise}
     */
    function login (credentials) {

      var cred = angular.copy(credentials)

      cred.body.password = $base64.encode(credentials.body.password)

      if(cred.body.domainRef !== undefined && cred.body.domainRef !==""){
          cred.url = "/users/user/login"
      }else{
          cred.url = "/users/user/admin-login"
      }

      cred.method = "POST"
      var deferred = $q.defer()
       $http({
        url: Settings.url + "iam-orchestration-service/iam",
        method: 'POST',
        data: cred,
        headers: { 'Content-Type': 'application/json'}
      }).then(function (data) {

         if( data.data.error !==undefined && (data.data.error.errorCode === "ERR-SCR-03" || data.data.error.errorCode === "ERR-SCR-04")) {
             deferred.reject();
             $location.path('/admin/others/user-locked');
         }

        deferred.resolve(data)
      }).catch(function (error) {
        console.error(error)
        deferred.reject()
      });

      return deferred.promise
    }

    /**
     * Clears user data and cookies
     */
    function logout () {
      clearCookie()
      service.user = {}
      service.account = {}
      $location.path('/admin/login')
    }

    function clearCookie() {
      localStorageService.remove(Settings.tokenName, Settings.tokenName + "-user")
      PublicApi.removeHeaders()
    }

    /**
     * Creates a new account
     * @param  {Object} account
     * @return {Promise}
     */
    function signup (account) {
      var deferred = $q.defer()
      $http
        .post('/api/registration/signup', account)
        .success(function () {
          deferred.resolve()
        })
        .error(function (data, status, headers, config) {
          var error = 'server'
          if (status >= 500) {
            Notificator.errors.server()
          }

          if (status === 409) {
            if (data.type === 'LoginEmailAlreadyExists') {
              error = 'duplicateEmail'
            }
          }
          if (status === 400) {
            if (data.type === 'IllegalArgument') {
              error = 'duplicateOrganization'
            }
          }

          deferred.reject(error)
        })

      return deferred.promise
    }

    /**
     * Sends request to reset user's password
     * @param  {String} email
     * @return {Promise}
     */
    function requestResetPassword (email) {
        var payload = {}
        payload.body = email.body

        payload.url = route + "/forget-password"
        payload.method = "POST"

        return PublicApi
            .all(baseUrl)
            .post(payload)
    }

    /**
     * Changes user's password to a new one
     * @param  {String} email
     * @return {Promise}
     */
    function resetPassword (password) {
        var payload = {}
        payload.body = password.body

        payload.url = route + "/forget-password-change"
        payload.method = "POST"

        return PublicApi
            .all(baseUrl)
            .post(payload)
    }

    /**
     * Verifies account by token
     * @param  {String} token
     * @return {Promise}
     */
    function verifyAccount (token) {
      var deferred = $q.defer()
      $http
        .post('/api/registration/verify-account', { token: token })
        .success(function () {
          deferred.resolve()
        })
        .error(function (data, status, headers, config) {
          if (status >= 500) {
            Notificator.errors.server()
          }

          deferred.reject()
        })

      return deferred.promise
    }

    /**
     * Finds user by password reset token
     * @param  {String} token
     * @return {Promise}
     */
    function findUserByPasswordResetToken (token) {
      var deferred = $q.defer()
      $http
        .get('/api/registration/users', { params: { 'password-reset-token': token } })
        .success(function (data) {
          deferred.resolve(data)
        })
        .error(function (data, status, headers, config) {
          if (status >= 500) {
            Notificator.errors.server()
          }

          deferred.reject()
        })

      return deferred.promise
    }

    /**
     * Finds user by user invitation token
     * @param  {String} token
     * @return {Promise}
     */
    function findUserByInvitationToken (token) {
      var deferred = $q.defer()
      $http
        .get('/api/registration/users', { params: { 'activation-token': token } })
        .success(function (data) {
          deferred.resolve(data)
        })
        .error(function (data, status, headers, config) {
          if (status >= 500) {
            Notificator.errors.server()
          }

          deferred.reject()
        })

      return deferred.promise
    }

    function setCredentials (result, selectedDomainId) {

      if (result && result !== {}) {
        localStorageService.set(Settings.tokenName, result.data.result.token);
        localStorageService.set(Settings.tokenName+"-user", result.data.result);
        localStorageService.set(Settings.tokenName+"-domainId", selectedDomainId);
        PublicApi.refreshHeaders()
        Settings.user = result.data.result
        Settings.selectedDomain = selectedDomainId
        service.user = result.data.result
      }
    }

    function getUser(){
      return localStorageService.get(Settings.tokenName)
    }

  }
})(window.angular, window.btoa)
