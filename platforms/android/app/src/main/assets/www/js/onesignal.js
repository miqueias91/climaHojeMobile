document.addEventListener('deviceready', function () {
        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
        
        var notificationOpenedCallback = function(jsonData) {
           
           alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal
          .startInit('4eafd905-0ac3-40d3-816a-c8124086a4e1')
          .handleNotificationOpened(notificationOpenedCallback  )
          .endInit();
      }, false);