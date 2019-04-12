document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  // OneSignal.getUserId(function(id){alert(id)});
OneSignal.push(function() {
  OneSignal.on('subscriptionChange', function(isSubscribed) {
    alert(isSubscribed)
    if (isSubscribed) {
      // The user is subscribed
      //   Either the user subscribed for the first time
      //   Or the user was subscribed -> unsubscribed -> subscribed
      alert(userId)
      OneSignal.getUserId( function(userId) {
        // Make a POST call to your server with the user ID
      });
    }
  });
});
  
  var notificationOpenedCallback = function(jsonData) {
    //alert('Funcionou!!!!');
  };

  window.plugins.OneSignal
    .startInit('4eafd905-0ac3-40d3-816a-c8124086a4e1')
    .handleNotificationOpened(notificationOpenedCallback  )
    .endInit();
}, false);