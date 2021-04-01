var AImageB = new Image();
AImageB.src = "/img_sim/botoessim.png";
var canvas1;
var context1;
var valor_chave = new Array(14);
var simEdicao = 0; 
//desenha os botoes
function draw_botoessim() {
    canvas1 = document.getElementById("tela1");
    context1 = canvas1.getContext("2d");
    canvas1.width = 75;
    canvas1.height = 570;

    for(i=1; i<13; i++) {
        if (valor_chave[i] === undefined)
		valor_chave[i] = 0;
        context1.drawImage(AImageB, 70*valor_chave[i]+(140*simEdicao), 45*(i-1), 70, 45, 5,(i-1)*47, 70, 45);
    }
}

//Verifica QUAL botao foi acionado
//Separa em tres grupos: 0 a 10: comandos do software, 11 a 20: edicao do ladder, 21 a 30: funcoes do ladder
function tBotao() {
	var posicaoy= parseInt((window.event.clientY-30)/47);

	if ((posicaoy >=0) && (posicaoy < 12))
	{
		for(i=1; i<13; i++)
			valor_chave[i] = 0;
		valor_chave[posicaoy+1]=1;
	}

	if (valor_chave[12]==1){
    		window.open("/Abouten", "About SCriWeb", "height=600,width=600");
	    	valor_chave[12]=0;
	}
	if (valor_chave[11]==1){
        	window.open("/helpsimen", "Help SCriWeb", "height=800,width=1000");
	    	valor_chave[11]=0;
	}
	if (valor_chave[10]==1){
        	var modal1 = document.getElementById("myModal1");
		var t_modal = modal1.getElementsByTagName("h2");
		t_modal[0].innerHTML = "Config";	
		var modalb1 = document.getElementById("myBody1");
		modalb1.innerHTML = "<p>PLC Number <input type='number' id='input1' name='input1' max=30 min=0 /></p>";
		modalb1.innerHTML += "<p>Size Screen Length:<input type='number' id='input2' max=2000 min=200/></p>";
		modalb1.innerHTML += "<p>Height:<input type='number' id='input3' name='input3' max=2000 min=0/> </p>";
		document.getElementById('input1').value = localStorage.num_clp1;
		document.getElementById('input2').value = localStorage.tela_largura;
		document.getElementById('input3').value = localStorage.tela_altura;
		// Create <OK> element that closes the modal
		var btn = document.createElement('button');
		btn.setAttribute('type','button');
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			Config_Socket(document.getElementById('input1').value);
			localStorage.setItem("tela_largura", document.getElementById('input2').value);
			localStorage.setItem("tela_altura", document.getElementById('input3').value);
			modal1.style.display = "none";
		};
		modalb1.appendChild(btn);
		
		modal1.style.display = "block";
		// Get the <Close> element that closes the modal
		var span1 = document.getElementById("close1");
		span1.onclick = function() {
			modal1.style.display = "none";
		}
		
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal1) {
				modal1.style.display = "none";
			}
		}

	    	valor_chave[10]=0;
	}
	if (simEdicao==0 && valor_chave[2]==1){
        	var inputCSV = document.createElement('input');
	 	inputCSV.type = 'file';
		inputCSV.accept = '.CSV';
		inputCSV.click();
		inputCSV.onchange = function() {
	    		var file = this.files[0];
			leitorDeCSV.readAsText(file);
			simPath = simPathInicial + file.name.slice(0,file.name.length -4) + '/';
			//alert(file.name);
		};
		comandos = 0;	
		valor_chave[5]=0;
		valor_chave[6]=1;
	}
	if (simEdicao==0 && valor_chave[3]==1){
	    	let texto = '0_id, 1_tipo, 2_nome, 3_var_1, 4_var_2, 5_pos_x_inicial, 6_dpos_x, 7_pos_x_final, 8_pos_y_inicial, 9_dpos_y, 10_pos_y_final, 11_inc_x1, 12_inc_x2, 13_inc_y1, 14_inc_y2, 15_var1_dependente, 16_var2_dependente, 17_piscar, 18_tempo_pisca, 19_figura, 20_funcao, 21_reserva, 22_reserva, 23_reserva, 24_reserva \n';
	    	for (var i=0; i<(ArrayObjStatic.length/20); i++) {
			texto += i +','+ArrayObjStatic[i*20+17]+',';
			for (var j=0; j<17; j++)
			    texto += ArrayObjStatic[(i*20)+j]+',';
			if (ArrayObjStatic[(i*20)+17]>1 && ArrayObjStatic[(i*20)+17]<5) 
				texto += ArrayImagens[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			if (ArrayObjStatic[(i*20)+17]==1) 
				texto += ArrayLabel[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			if (ArrayObjStatic[(i*20)+17]==6 || ArrayObjStatic[(i*20)+17]==7) 
				texto += ArrayObjDinamic[i*10+5]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			//texto += ArrayObjDinamic[i*10+5] +',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			texto += '\n';
		}
        	let titulo ='SimScriWeb';
        	var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        	saveAs(blob, titulo + ".csv");
        	valor_chave[3]=0;
	}
	if (simEdicao==0 && valor_chave[5]==1){
		comandos = 1;
	}
	if (simEdicao==0 && valor_chave[6]==1){
		comandos = 0;
	}
	if (simEdicao==0 && valor_chave[4]==1){
		var modal1 = document.getElementById("myModal1");
		var t_modal = modal1.getElementsByTagName("h2");
		t_modal[0].innerHTML = "Download";	
		var modalb1 = document.getElementById("myBody1");
		modalb1.innerHTML = "<p><a href='http://scriweb.herokuapp.com/ftp/Alarme/Alarmes.csv'>Alarm</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao/Classificacao.csv'>Classification</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Corte_Vinco/Corte_Vinco.csv'>Cut and Crease</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador/Elevador.csv'>Elevator(3 floor)</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador5/Elevador5.csv'>Elevator(5 floor)</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Expedicao/Expedicao.csv'>Expedition</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Envase/Envase.csv'>Filling</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Semaforo/Semaforo.csv'>Traffic Ligth</a></p>";

		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Matheus/Classificacao_Matheus.csv'>Classification Matheus</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Amalia/Classificacao_Amalia.csv'>Classification Amalia</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Arthur/Classificacao_Arthur.csv'>Classification Arthur</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Luiz/Classificacao_Luiz.csv'>Classification Luiz</a></p>"; 
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Nicolas/Classificacao_Nicolas.csv'>Classification Nicolas</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Nicole/Classificacao_Nicole.csv'>Classification Nicole</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Saymon/Classificacao_Saymon.csv'>Classification Saymon</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Teixeira/Classificacao_Teixeira.csv'>Classification Gabriel Teixeira</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Classificacao_Vinicius/Classificacao_Vinicius.csv'>Classification Vinicius</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Corte_Vinco_Leonardo/Corte_Vinco_Leonardo.csv'>Cut and Crease Leonardo</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Corte_Vinco_Pedro/Corte_Vinco_Pedro.csv'>Cut and Crease Pedro</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Corte_Vinco_Carlos/Corte_Vinco_Carlos.csv'>Cut and Crease Carlos</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Corte_Vinco_Gustavo/Corte_Vinco_Gustavo.csv'>Cut and Crease Luiz Gustavo</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Corte_Vinco_Lucas/Corte_Vinco_Lucas.csv'>Cut and Crease Lucas</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Corte_Vinco_Rafael/Corte_Vinco_Rafael.csv'>Cut and Crease Rafael</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Matheus/Elevador_Matheus.csv'>Elevator Matheus</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Alvaro/Elevador_Alvaro.csv'>Elevator Alvaro</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Amalia/Elevador_Amalia.csv'>Elevator Amalia</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Artur/Elevador_Artur.csv'>Elevator Arthur</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Leonardo/Elevador_Leonardo.csv'>Elevator Leonardo</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Luiz/Elevador_Luiz.csv'>Elevator Luiz</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Nicolas/Elevador_Nicolas.csv'>Elevator Nicolas</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Nicole/Elevador_Nicole.csv'>Elevator Nicole</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Pedro/Elevador_Pedro.csv'>Elevator Pedro</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Savi/Elevador_Savi.csv'>Elevator Savi</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Saymon/Elevador_Saymon.csv'>Elevator Saymon</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Teixeira/Elevador_Teixeira.csv'>Elevator Teixeira</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Carlos/Elevador_Carlos.csv'>Elevator Carlos</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Gustavo/Elevador_Gustavo.csv'>Elevator Luiz Gustavo</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Israel/Elevador_Israel.csv'>Elevator Israel</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Lucas/Elevador_Lucas.csv'>Elevator Lucas</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Rafael/Elevador_Rafael.csv'>Elevator Rafael</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Vinicius/Elevador_Vinicius.csv'>Elevator Vinicius</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevator_Thales/Elevador_Thales.csv'>Elevator Thales</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/Elevador_Arturo/Elevador_Arturo.csv'>Elevator Arturo</a></p>";
		// Create <OK> element that closes the modal
		var btn = document.createElement('button');
		btn.setAttribute('type','button');
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			modal1.style.display = "none";
		};
		modalb1.appendChild(btn);
		
		modal1.style.display = "block";
		// Get the <Close> element that closes the modal
		var span1 = document.getElementById("close1");
		span1.onclick = function() {
			modal1.style.display = "none";
		}
		
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal1) {
				modal1.style.display = "none";
			}
		}
		comandos = 0;	
		valor_chave[4]=0;
		valor_chave[5]=1;
	}
	if (simEdicao==0 && valor_chave[1]==1){
		valor_chave[1]=0;
		comandos = 0;
		simEdicao = 1;
	}
	if (simEdicao==1 && valor_chave[1]==1){
		valor_chave[1]=0;
		comandos = 0;
		simEdicao = 0;
	}
	if (simEdicao==1 && valor_chave[2]==1){
		comandos = 2;
	}
	if (simEdicao==1 && valor_chave[3]==1){
		simFuncao1();
	}
	if (simEdicao==1 && valor_chave[4]==1){
		simFuncao2();
	}
	if (simEdicao==1 && valor_chave[5]==1){
		simFuncao3();
	}
	if (simEdicao==1 && valor_chave[6]==1){
		simFuncao4();
	}
	if (simEdicao==1 && valor_chave[7]==1){
		simFuncao5();
	}
	if (simEdicao==1 && valor_chave[8]==1){
		simFuncao6();
	}
	if (simEdicao==1 && valor_chave[9]==1){
		simFuncao7();
	}

	draw_botoessim();		
}


//leitura de arquivos
//Fonte https://tableless.com.br/file-api-trabalhando-com-arquivos-locais-usando-javascript/
var leitorDeCSV = new FileReader();
leitorDeCSV.addEventListener('load', leCSV);


function pegaCSV(inputFile) {
	var file = inputFile.files[0];
	leitorDeCSV.readAsText(file);
}

function leCSV(evt) {
	var fileArr = evt.target.result.split('\n');
	draw_processo(fileArr);
}
