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

clima = {ec:'Encoberto com Chuvas Isoladas',ci:'Chuvas Isoladas',c:'Chuva',in:'Instável',pp:'Poss. de Pancadas de Chuva',cm:'Chuva pela Manhã',cn:'Chuva a Noite',pt:'Pancadas de Chuva a Tarde',pm:'Pancadas de Chuva pela Manhã',np:'Nublado e Pancadas de Chuva',pc:'Pancadas de Chuva',pn:'Parcialmente Nublado',cv:'Chuvisco',ch:'Chuvoso',t:'Tempestade',ps:'Predomínio de Sol',e:'Encoberto',n:'Nublado',cl:'Céu Claro',nv:'Nevoeiro',g:'Geada',ne:'Neve',nd:'Não Definido',pnt:'Pancadas de Chuva a Noite',psc:'Possibilidade de Chuva',pcm:'Possibilidade de Chuva pela Manhã',pct:'Possibilidade de Chuva a Tarde',pcn:'Possibilidade de Chuva a Noite',npt:'Nublado com Pancadas a Tarde',npn:'Nublado com Pancadas a Noite',ncn:'Nublado com Poss. de Chuva a Noite',nct:'Nublado com Poss. de Chuva a Tarde',ncm:'Nubl. c/ Poss. de Chuva pela Manhã',npm:'Nublado com Pancadas pela Manhã',npp:'Nublado com Possibilidade de Chuva',vn:'Variação de Nebulosidade',ct:'Chuva a Tarde',ppn:'Poss. de Panc. de Chuva a Noite',ppt:'Poss. de Panc. de Chuva a Tarde',ppm:'Poss. de Panc. de Chuva pela Manhã'};

$('#aguarde').dialog({
    modal: true,
    autoOpen: false,
    resizable: false,
    draggable: false,
    dialogClass: "no-close",
});

function buscaClimaMunicipio(municipio, estado) {
	if (municipio !== null && estado !== null) {
		$.ajax({
		    url: "https://climahoje.000webhostapp.com/webservice/climahojemobile/buscaClimaMunicipio.php",
		    dataType: 'json',
		    type: 'GET',
		    data: {
		      'estado': estado,
		      'municipio': municipio
		    },
		    error: function(a) {
		      $('#aguarde').dialog('close');
		      ons.notification.alert("Erro na comunicação, tente novamente: "+a);
		      //window.location.reload();
		    },
		    success: function(valorRetornado) {
	    		console.log(valorRetornado)
		      if (valorRetornado == "ERROR") {
		        ons.notification.alert("Atenção! Não foi possível buscar o clima na localidade.");
		        $('#aguarde').dialog('close');
		      }
		      else{  
		        var obj = valorRetornado;         
		        if (obj) {
		        	var temp_media0 = (parseFloat(obj['previsao'][0]['maxima']) + parseFloat(obj['previsao'][0]['minima'])) / 2;
		        
		          //RETORNA O RESULTADO E EXIBE NA TELA
		          $('#resultadoTempo h2 span').html(obj['nome']+' - '+obj['uf']+', '+'BR');
		          $('.dadosTemperatura h1').html(temp_media0+'ºC');
		          $('.dadosTemperatura h2').html(clima[obj['previsao'][0]['tempo']]);
		          $('.dadosTemperatura h4 .maxima').html(obj['previsao'][0]['maxima']);
		          $('.dadosTemperatura h4 .minima').html(obj['previsao'][0]['minima']);

		          var aux_data = obj['atualizacao'].split("-");
		          var data_atualizacao = aux_data[2]+"/"+aux_data[1]+"/"+aux_data[0];

					var data = new Date();

					// Guarda cada pedaço em uma variável
					var hora    = data.getHours();          // 0-23
					var min     = data.getMinutes();        // 0-59
					var seg     = data.getSeconds();        // 0-59
					var str_hora = hora + ':' + min + ':' + seg;

		          $('#resultadoTempo h3 .data').html(data_atualizacao+" "+str_hora);

		          window.localStorage.setItem('estado', estado);
		          window.localStorage.setItem('municipio', municipio);
		          window.localStorage.setItem('nome', obj['nome']);
		          window.localStorage.setItem('uf', obj['uf']);
		          window.localStorage.setItem('temp_media0', temp_media0);
		          window.localStorage.setItem('maxima0', obj['previsao'][0]['maxima']);
		          window.localStorage.setItem('minima0', obj['previsao'][0]['minima']);
		          window.localStorage.setItem('tempo0', obj['previsao'][0]['tempo']);
		          window.localStorage.setItem('dia0', data_atualizacao+" "+str_hora);
		          
		          $("div#vaziaPesquisa.container").html('');
		          window.fn.loadView(0);
		          $('#resultadoTempo').css('display', '');                           
		          $('#aguarde').dialog('close');
		        }
		      }
		    },
		});
	}else {		
		$('#aguarde').dialog('close');
		ons.notification.alert("Erro na comunicação, utilize o filtro.");
	}
}