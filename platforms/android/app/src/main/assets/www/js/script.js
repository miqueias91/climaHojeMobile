// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

/*document.addEventListener('deviceready', function () {
	console.log('aqui')

  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("4eafd905-0ac3-40d3-816a-c8124086a4e1")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
  console.log("User accepted notifications: " + accepted);
});
}, false);*/



$('#aguarde').dialog({
    modal: true,
    autoOpen: false,
    resizable: false,
    draggable: false,
    dialogClass: "no-close",
});

function buscaClimaMunicipio(municipio, estado) {
	$.ajax({
	    url: "https://climahoje.000webhostapp.com/buscaClimaMunicipio.php",
	    dataType: 'JSON',
	    type: 'GET',
	    data: {
	      'estado': estado,
	      'municipio': municipio,
	    },
	    error: function() {
	      $('#aguarde').dialog('close');
	      ons.notification.alert("Erro na comunicação, tente novamente.");
	      //window.location.reload();
	    },
	    success: function(valorRetornado) {
	      if (valorRetornado == "ERROR") {
	        ons.notification.alert("Atenção! Não foi possível buscar o clima na localidade.");
	        $('#aguarde').dialog('close');
	      }
	      else{  
	        var obj = valorRetornado;         
	        if (obj) {
	          //RETORNA O RESULTADO E EXIBE NA TELA
	          $('#resultadoTempo h2 span').html(obj['name']+' - '+obj['state']+', '+obj['country']);
	          $('.dadosTemperatura h1').html(obj['data']['temperature']+'ºC');
	          $('.dadosTemperatura h2').html(obj['data']['condition']);
	          $('.dadosTemperatura h4 .direcao').html(obj['data']['wind_direction']);
	          $('.dadosTemperatura h4 .vento').html(obj['data']['wind_velocity']);
	          $('.dadosTemperatura h4 .umidade').html(obj['data']['humidity']);
	          $('.dadosTemperatura h4 .pressao').html(obj['data']['pressure']);
	          $('.dadosTemperatura h4 .sensacao').html(obj['data']['sensation']);
	          var date = new Date(obj['data']['date']);
	          $('#resultadoTempo h3 .data').html(date);
	          window.localStorage.setItem('estado', estado);
	          window.localStorage.setItem('municipio', municipio);
	          window.localStorage.setItem('name', obj['name']);
	          window.localStorage.setItem('state', obj['state']);
	          window.localStorage.setItem('country', obj['country']);
	          window.localStorage.setItem('temperature', obj['data']['temperature']);
	          window.localStorage.setItem('condition', obj['data']['condition']);
	          window.localStorage.setItem('wind_direction', obj['data']['wind_direction']);
	          window.localStorage.setItem('wind_velocity', obj['data']['wind_velocity']);
	          window.localStorage.setItem('humidity', obj['data']['humidity']);
	          window.localStorage.setItem('pressure', obj['data']['pressure']);
	          window.localStorage.setItem('sensation', obj['data']['sensation']);
	          window.localStorage.setItem('date', obj['data']['date']);
	          $("div#vaziaPesquisa.container").html('');
	          window.fn.loadView(0);
	          $('#resultadoTempo').css('display', '');                           
	          $('#aguarde').dialog('close');
	        }
	      }
	    },
	});
}