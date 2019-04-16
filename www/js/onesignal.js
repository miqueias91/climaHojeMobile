document.addEventListener('deviceready', function () {
	console.log('aqui')
	// Enable to debug issues.
	// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
	// window.plugins.OneSignal.getUserId(function(id){alert(id)});
	var notificationOpenedCallback = function(jsonData) {
		//alert('Funcionou!!!!');
	};

	window.plugins.OneSignal.getPermissionSubscriptionState(function(status) {
		status.permissionStatus.hasPrompted; // Bool
		status.permissionStatus.status; // iOS only: Integer: 0 = Not Determined, 1 = Denied, 2 = Authorized
		status.permissionStatus.state; //Android only: Integer: 1 = Authorized, 2 = Denied

		status.subscriptionStatus.subscribed; // Bool
		status.subscriptionStatus.userSubscriptionSetting; // Bool
		status.subscriptionStatus.userId; // String: OneSignal Player ID
		status.subscriptionStatus.pushToken; // String: Device Identifier from FCM/APNs
		alert(status.subscriptionStatus.userId)
	});

	window.plugins.OneSignal
	.startInit('4eafd905-0ac3-40d3-816a-c8124086a4e1')
	.handleNotificationOpened(notificationOpenedCallback  )
	.endInit();
	
}, false);

