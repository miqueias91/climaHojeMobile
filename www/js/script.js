var clima = {ec:'Encoberto com Chuvas Isoladas',ci:'Chuvas Isoladas',c:'Chuva',in:'Instável',pp:'Poss. de Pancadas de Chuva',cm:'Chuva pela Manhã',cn:'Chuva a Noite',pt:'Pancadas de Chuva a Tarde',pm:'Pancadas de Chuva pela Manhã',np:'Nublado e Pancadas de Chuva',pc:'Pancadas de Chuva',pn:'Parcialmente Nublado',cv:'Chuvisco',ch:'Chuvoso',t:'Tempestade',ps:'Predomínio de Sol',e:'Encoberto',n:'Nublado',cl:'Céu Claro',nv:'Nevoeiro',g:'Geada',ne:'Neve',nd:'Não Definido',pnt:'Pancadas de Chuva a Noite',psc:'Possibilidade de Chuva',pcm:'Possibilidade de Chuva pela Manhã',pct:'Possibilidade de Chuva a Tarde',pcn:'Possibilidade de Chuva a Noite',npt:'Nublado com Pancadas a Tarde',npn:'Nublado com Pancadas a Noite',ncn:'Nublado com Poss. de Chuva a Noite',nct:'Nublado com Poss. de Chuva a Tarde',ncm:'Nubl. c/ Poss. de Chuva pela Manhã',npm:'Nublado com Pancadas pela Manhã',npp:'Nublado com Possibilidade de Chuva',vn:'Variação de Nebulosidade',ct:'Chuva a Tarde',ppn:'Poss. de Panc. de Chuva a Noite',ppt:'Poss. de Panc. de Chuva a Tarde',ppm:'Poss. de Panc. de Chuva pela Manhã'};
var semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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
		    //url: "http://localhost/webservice/climahojemobile/buscaClimaMunicipio.php",
		    dataType: 'json',
		    type: 'GET',
		    data: {
		      'estado': estado,
		      'municipio': municipio
		    },
		    error: function(a) {
		      $('#aguarde').dialog('close');
		      ons.notification.alert("Erro na comunicação, tente novamente. Se o erro persistir verifique sua conexão com a internet.");
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
					var temp_media0 = (parseFloat(obj['previsao'][0]['maxima']) + parseFloat(obj['previsao'][0]['minima'])) / 2;

					//RETORNA O RESULTADO E EXIBE NA TELA PRINCIPAL
					$('#resultadoTempo h2 span').html(obj['nome']+' - '+obj['uf']+', '+'BR');
					$('.dadosTemperatura h1').html(temp_media0+'ºC');
					$('.dadosTemperatura h2 .situacao').html(clima[obj['previsao'][0]['tempo']]);
					$('.dadosTemperatura h4 .maxima').html(obj['previsao'][0]['maxima']);
					$('.dadosTemperatura h4 .minima').html(obj['previsao'][0]['minima']);

					var data = new Date();
					// Guarda cada pedaço em uma variável
					var hora    = data.getHours();          // 0-23
					var min     = data.getMinutes();        // 0-59
					var seg     = data.getSeconds();        // 0-59
					if (parseInt(hora) < 10) {
						hora = "0"+hora;
					}
					if (parseInt(min) < 10) {
						min = "0"+min;
					}
					if (parseInt(seg) < 10) {
						seg = "0"+seg;
					}

					var dia     = data.getDate();           // 1-31
					var mes     = data.getMonth();          // 0-11 (zero=janeiro)
					mes = mes + 1;
					var ano    = data.getFullYear();       // 4 dígitos

					if (parseInt(dia) < 10) {
						dia = "0"+dia;
					}
					if (parseInt(mes) < 10) {
						mes = "0"+mes;
					}

					var data_atualizacao = dia+"/"+mes+"/"+ano;

					var str_hora = hora + ':' + min + ':' + seg;
					$('#resultadoTempo h3 .data').html(data_atualizacao+" "+str_hora);
					$('.dadosTemperatura h2 .diaSemana').html(buscaDiaSemana(obj['previsao'][0]['dia'])+", "+formataDia(obj['previsao'][0]['dia']));

					window.localStorage.setItem('estado', estado);
					window.localStorage.setItem('municipio', municipio);
					window.localStorage.setItem('nome', obj['nome']);
					window.localStorage.setItem('uf', obj['uf']);
					window.localStorage.setItem('temp_media0', temp_media0);
					window.localStorage.setItem('maxima0', obj['previsao'][0]['maxima']);
					window.localStorage.setItem('minima0', obj['previsao'][0]['minima']);
					window.localStorage.setItem('tempo0', obj['previsao'][0]['tempo']);
					window.localStorage.setItem('data_atualizacao', data_atualizacao+" "+str_hora);

					//OUTROS DIAS
					$('#dia1').html(buscaDiaSemana(obj['previsao'][0]['dia'])+","+formataDia(obj['previsao'][0]['dia']));
					window.localStorage.setItem('dia1', (buscaDiaSemana(obj['previsao'][0]['dia'])+", "+formataDia(obj['previsao'][0]['dia'])));
					$('#temp1').html(temp_media0+'ºC');
					window.localStorage.setItem('temp1', temp_media0);
					$('#previsaodia1').html(clima[obj['previsao'][0]['tempo']]);
					window.localStorage.setItem('previsaodia1', clima[obj['previsao'][0]['tempo']]);


					var temp_media1 = (parseFloat(obj['previsao'][1]['maxima']) + parseFloat(obj['previsao'][1]['minima'])) / 2;
					$('#dia2').html(buscaDiaSemana(obj['previsao'][1]['dia'])+","+formataDia(obj['previsao'][1]['dia']));
					window.localStorage.setItem('dia2', (buscaDiaSemana(obj['previsao'][1]['dia'])+", "+formataDia(obj['previsao'][1]['dia'])));
					$('#temp2').html(temp_media1+'ºC');
					window.localStorage.setItem('temp2', temp_media1);
					$('#previsaodia2').html(clima[obj['previsao'][1]['tempo']]);
					window.localStorage.setItem('previsaodia2', clima[obj['previsao'][1]['tempo']]);

					var temp_media2 = (parseFloat(obj['previsao'][2]['maxima']) + parseFloat(obj['previsao'][2]['minima'])) / 2;
					$('#dia3').html(buscaDiaSemana(obj['previsao'][2]['dia'])+","+formataDia(obj['previsao'][2]['dia']));
					window.localStorage.setItem('dia3', (buscaDiaSemana(obj['previsao'][2]['dia'])+", "+formataDia(obj['previsao'][2]['dia'])));
					$('#temp3').html(temp_media2+'ºC');
					window.localStorage.setItem('temp3', temp_media2);
					$('#previsaodia3').html(clima[obj['previsao'][2]['tempo']]);
					window.localStorage.setItem('previsaodia3', clima[obj['previsao'][2]['tempo']]);

					var temp_media3 = (parseFloat(obj['previsao'][3]['maxima']) + parseFloat(obj['previsao'][3]['minima'])) / 2;
					$('#dia4').html(buscaDiaSemana(obj['previsao'][3]['dia'])+","+formataDia(obj['previsao'][3]['dia']));
					window.localStorage.setItem('dia4', (buscaDiaSemana(obj['previsao'][3]['dia'])+", "+formataDia(obj['previsao'][3]['dia'])));
					$('#temp4').html(temp_media3+'ºC');
					window.localStorage.setItem('temp4', temp_media3);
					$('#previsaodia4').html(clima[obj['previsao'][3]['tempo']]);
					window.localStorage.setItem('previsaodia4', clima[obj['previsao'][3]['tempo']]);

					var temp_media4 = (parseFloat(obj['previsao'][4]['maxima']) + parseFloat(obj['previsao'][4]['minima'])) / 2;
					$('#dia5').html(buscaDiaSemana(obj['previsao'][4]['dia'])+","+formataDia(obj['previsao'][4]['dia']));
					window.localStorage.setItem('dia5', (buscaDiaSemana(obj['previsao'][4]['dia'])+", "+formataDia(obj['previsao'][4]['dia'])));
					$('#temp5').html(temp_media4+'ºC');
					window.localStorage.setItem('temp5', temp_media4);
					$('#previsaodia5').html(clima[obj['previsao'][4]['tempo']]);
					window.localStorage.setItem('previsaodia5', clima[obj['previsao'][4]['tempo']]);

					var temp_media5 = (parseFloat(obj['previsao'][5]['maxima']) + parseFloat(obj['previsao'][5]['minima'])) / 2;
					$('#dia6').html(buscaDiaSemana(obj['previsao'][5]['dia'])+","+formataDia(obj['previsao'][5]['dia']));
					window.localStorage.setItem('dia6', (buscaDiaSemana(obj['previsao'][5]['dia'])+", "+formataDia(obj['previsao'][5]['dia'])));
					$('#temp6').html(temp_media5+'ºC');
					window.localStorage.setItem('temp6', temp_media5);
					$('#previsaodia6').html(clima[obj['previsao'][5]['tempo']]);
					window.localStorage.setItem('previsaodia6', clima[obj['previsao'][5]['tempo']]);

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

function buscaDiaSemana(data) {
        var arr = data.split("-");
        var auxData = new Date(arr[0], arr[1] - 1, arr[2]);
        var dia = auxData.getDay();
        return semana[dia];
}

function formataDia(data) {
    var arr = data.split("-");
    return arr[2]+"/"+arr[1];
}