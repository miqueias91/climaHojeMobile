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