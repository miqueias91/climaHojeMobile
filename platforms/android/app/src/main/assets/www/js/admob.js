  var admobid = {}
  if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-7091486462236476/5015752600',
      interstitial: 'ca-app-pub-7091486462236476/7586075629',
    }
  }

  document.addEventListener('deviceready', function () {
    window.plugins.insomnia.keepAwake();
    admob.banner.config({ 
      id: admobid.banner, 
      isTesting: false, 
      autoShow: true, 
    })
    admob.banner.prepare()
    
    admob.interstitial.config({
      id: admobid.interstitial,
      isTesting: false,
      autoShow: false,
    })
    admob.interstitial.prepare()

    document.getElementsByClassName('showAd').disabled = true
    document.getElementsByClassName('showAd').onclick = function() {
      admob.interstitial.show()
    }
  }, false);

  document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
    //alert(JSON.stringify(event))
  })

  document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
    //alert(JSON.stringify(event))
  })

  document.addEventListener('admob.interstitial.events.LOAD', function(event) {
    //alert(JSON.stringify(event))
    document.getElementsByClassName('showAd').disabled = false
  })

  document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
    //alert(JSON.stringify(event))
    admob.interstitial.prepare()
  })