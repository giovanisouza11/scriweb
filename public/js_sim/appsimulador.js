//=====================================================================================
//Inicializa variaveis
//=====================================================================================
var Scanvas;
var Scontext; 
var SM = [];
var SI = [];
var SR = [];
var SQ = [];
var ST = [];
var SC = [];

var Scomandos = 0; // 0:stop, 1: run 2: edicao
var simulacao_set_inicial = 0;

var Imagens =[];
var Imagens1 =[];
var Imagens2 =[];
var Imagens_Real =[];
var Imagens1_Real =[];
var Imagens2_Real =[];
var LoadedImages = 0;
var Extensao = ['','_off','_on1','_on2','3','4','5'];
var ArrayImagens = [];
var ArrayLabel = [];
var ArrayObjDinamic = [];
var ArrayObjStatic =[];
var simPath;
var simPathInicial = '/scriweb/simulacao/';
var FuncaoMatriz =[];
var tempo = window.setInterval(AtualizaPorTempo, 500);
var variavel;
//=====================================================================================
//Inicializa Canvas
//Desenha area de trabalho em branco
//=====================================================================================
function draw_simulador_inicio() {
	Scanvas = document.getElementById("tela6");
	Scontext = Scanvas.getContext("2d");
	
	Scanvas.width = 650;//localStorage.tela_largura + 200; 
	Scanvas.height = 525; // localStorage.tela_altura + 150;
	draw_simulador_fundo();
	simulacao_set_inicial = 1;
}

//=====================================================================================
//Inicializa Canvas
//Click com omouse
//=====================================================================================
function cSimulador() {
	var posicaoy = parseInt(window.event.clientY-40);//-5);
	var posicaox = parseInt(window.event.clientX-110);//-75);
  	if (LoadedImages>0) {
    	for(var index_var=0; index_var<( parseInt(ArrayObjDinamic.length / 10)+1); index_var++){ 
			if (Scomandos ==0 || Scomandos == 1) {
				if (ArrayObjStatic[index_var*20+17]==1 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					if (Sim_endereco(ArrayObjStatic[index_var*20+1])==1) {
						Sim_escreve_endereco(ArrayObjStatic[index_var*20+1],0);
					}
					else {
						Sim_escreve_endereco(ArrayObjStatic[index_var*20+1],1);
					}
				}
 
				if (ArrayObjStatic[index_var*20+17]==4 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					if (Sim_endereco(ArrayObjStatic[index_var*20+1])==1) {
						Sim_escreve_endereco(ArrayObjStatic[index_var*20+1],0);
					}
					else {
						Sim_escreve_endereco(ArrayObjStatic[index_var*20+1],1);
					}
				}
				if (ArrayObjStatic[index_var*20+17]==6) {
					if (verificaTexto(posicaox, -4*ArrayObjStatic[index_var*20+10], 'X'+index_var)==1 && verificaTexto(posicaoy, ArrayObjStatic[index_var*20+10], 'Y'+index_var)==1)
					{
						variavel = index_var;
						var ICampo = document.getElementById('CampoS');
						var CInput = document.getElementById('input_ladder');
						ICampo.style.left = " "+ArrayObjDinamic[index_var*10+3] + "px";
						ICampo.style.top = " "+ArrayObjDinamic[index_var*10+4]  + "px";
						document.getElementById('label_input').innerHTML = ArrayObjStatic[index_var*20+1];
						document.getElementById('input_ladder').value = Sim_enderecoCT(ArrayObjStatic[index_var*20+1],0);
						CInput.focus();
					}
				}
				if (ArrayObjStatic[index_var*20+17]==7 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
					ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
				}			
				if (ArrayObjStatic[index_var*20+17]==2 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
					ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
					if (ArrayObjStatic[(index_var+1)*20+17]==2) {
						var auxiliar = ArrayObjStatic[index_var*20+4];
						ArrayObjStatic[index_var*20+4] = ArrayObjStatic[(index_var+1)*20+4];
						ArrayObjStatic[(index_var+1)*20+4] = auxiliar;
					}
					if (ArrayObjStatic[(index_var-1)*20+17]==2) {
						var auxiliar = ArrayObjStatic[index_var*20+4];
						ArrayObjStatic[index_var*20+4] = ArrayObjStatic[(index_var-1)*20+4];
						ArrayObjStatic[(index_var-1)*20+4] = auxiliar;
					}
				}			
			}
			//ENtra em modo ediçao
			if ((Scomandos==2) && ((ArrayObjStatic[index_var*20+17]!=1 && ArrayObjStatic[index_var*20+17]!=6 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1) ||
			(ArrayObjStatic[index_var*20+17]==1 && verificaTexto(posicaox, -1*ArrayObjStatic[index_var*20+10]*ArrayImagens[ArrayObjDinamic[index_var*10+5]].length, 'X'+index_var)==1 && verificaTexto(posicaoy, ArrayObjStatic[index_var*20+10], 'Y'+index_var)==1) ||
			(ArrayObjStatic[index_var*20+17]==6 && verificaTexto(posicaox, -5*ArrayObjStatic[index_var*20+10], 'X'+index_var)==1 && verificaTexto(posicaoy, ArrayObjStatic[index_var*20+10], 'Y'+index_var)==1))) {
				simApontador(index_var);
			}
		}
  	} 
}
//=====================================================================================
// Monitora a tecla ENTER
// Quando aparece o campo INPUT
// Para entrada TAG e ENDERECO
//=====================================================================================
function eInputS(event){
	if (event.keyCode == 13) { //Tecla enter
		var ICampo = document.getElementById('CampoS');
		var CInput = document.getElementById('input_ladder');
		Sim_escreveCT(ArrayObjStatic[variavel*20+1], CInput.value, 0);
		if(Sim_enderecoCT(ArrayObjStatic[variavel*20+1],0) > ArrayObjStatic[variavel*20+16])
			Sim_escreveCT(ArrayObjStatic[variavel*20+1],parseInt(ArrayObjStatic[variavel*20+16]),0);
		if(Sim_enderecoCT(ArrayObjStatic[variavel*20+1],0) < 0)
			Sim_escreveCT(ArrayObjStatic[variavel*20+1],0,0);

		ICampo.style.left = "1100px";
		ICampo.style.top = "600px";
		CInput.blur();
	}
}

//Interrupção de tempo
function AtualizaPorTempo() {
	if (LoadedImages>0) {
		atualiza_simulador();
	}
}

//=====================================================================================
//Atualiza variãveis e canvas
//Disparado ao receber SocketIO
//==============================================		=======================================
function atualiza_simulador() {
	//simIhm();
	            	
	for(var ij=0; ij < parseInt((ArrayObjDinamic.length / 10)+1); ij++){
		if (Scomandos == 1) {
			simTimer(ij);
			simFigura(ij);
		}
		else {
			ArrayObjDinamic[ij*10+3] = ArrayObjStatic[ij*20+3];
			ArrayObjDinamic[ij*10+4] = ArrayObjStatic[ij*20+6];
			ApagaImagem(ij);
		}

		if ((ArrayObjStatic[ij*20+17] != 1) && (ArrayObjStatic[ij*20+17] < 5)) {
			LoadImageIndexX1(ArrayObjDinamic[ij*10+1], ij);
			//LoadImageIndexX1(simPath + ArrayImagens[ArrayObjDinamic[ij*10+5]] + Extensao[ArrayObjDinamic[ij*10+1]]+'.png', ij);
			//LoadImageIndex(simPath + ArrayImagens[ArrayObjDinamic[ij*10+5]] + Extensao[ArrayObjDinamic[ij*10+1]]+'.png', ij);
		}
		if (ArrayObjStatic[ij*20+17] == 6) {
			Scontext.font = ArrayObjStatic[ij*20+10]+'pt Arial';
			Scontext.fillStyle = 'white';
			Scontext.fillRect(ArrayObjStatic[ij*20+3] ,ArrayObjStatic[ij*20+6], 4*ArrayObjStatic[ij*20+10], -ArrayObjStatic[ij*20+10]);
  			Scontext.fillStyle = ArrayObjStatic[ij*20+9];
			Scontext.fillText(Sim_enderecoCT(ArrayObjStatic[ij*20+1],0),ArrayObjStatic[ij*20+3] ,ArrayObjStatic[ij*20+6]);
		}
		if (ArrayObjStatic[ij*20+17] == 7) {
			Scontext.fillStyle = ArrayObjStatic[ij*20+10];
			var percentual = parseInt(Sim_enderecoCT(ArrayObjStatic[ij*20+1],0)*ArrayObjStatic[ij*20+7]/ ArrayObjStatic[ij*20+16]);
			Scontext.fillRect(parseInt(ArrayObjDinamic[ij*10+3]), parseInt(ArrayObjDinamic[ij*10+4]), parseInt(ArrayObjStatic[ij*20+4]), parseInt(ArrayObjStatic[ij*20+7])-percentual);
			Scontext.fillStyle = ArrayObjStatic[ij*20+12];
			Scontext.fillRect(ArrayObjDinamic[ij*10+3], parseInt(ArrayObjDinamic[ij*10+4])+parseInt(ArrayObjStatic[ij*20+7])-parseInt(percentual), ArrayObjStatic[ij*20+4], percentual);
		} 
		if (ArrayObjStatic[ij*20+17] == 1) {
			funcaoLabel(ij);
		}
	};
}
//----------------------------------------------------------
//Funcao de label
// Desenha o label e o quadro em volta
//----------------------------------------------------------
function funcaoLabel(apontador){
	Scontext.font = ArrayObjStatic[apontador*20+10]+'pt Arial';
	var Llabel = ArrayLabel[ArrayObjDinamic[apontador*10+5]];
	if (ArrayObjStatic[apontador*20+1] != '') {
		if (Sim_endereco(ArrayObjStatic[apontador*20+1]) != 0)
			Scontext.fillStyle = ArrayObjStatic[apontador*20+12];
		else
			Scontext.fillStyle = ArrayObjStatic[apontador*20+11];
		Scontext.fillRect(ArrayObjDinamic[apontador*10+3], ArrayObjDinamic[apontador*10+4],ArrayObjStatic[apontador*20+4],ArrayObjStatic[apontador*20+7]);	
		Scontext.fillStyle = ArrayObjStatic[apontador*20+9];
		//var LlabelX = parseInt(ArrayObjStatic[apontador*20+3]) + (parseInt(ArrayObjStatic[apontador*20+4])-(Llabel.length * parseInt(ArrayObjStatic[apontador*20+10])))/2;
		var LlabelX = parseInt(ArrayObjStatic[apontador*20+3]) + (parseInt(ArrayObjStatic[apontador*20+4])-getTextWidth(Llabel,Scontext.font))/2;
		var LlabelY = parseInt(ArrayObjStatic[apontador*20+6])+parseInt(ArrayObjStatic[apontador*20+10])+(parseInt(ArrayObjStatic[apontador*20+7])-parseInt(ArrayObjStatic[apontador*20+10]))/2;
		Scontext.fillText(Llabel,LlabelX,LlabelY);	
	}	
	else {
		Scontext.fillStyle = ArrayObjStatic[apontador*20+9];
		Scontext.fillText(Llabel,ArrayObjStatic[apontador*20+3] ,ArrayObjStatic[apontador*20+6]);
	}
}
//------------------------------------------------------------------
//Calcula o tamnho do label
//https://www.it-swarm.dev/pt/javascript/calcular-largura-do-texto-com-javascript/958395213/
//---------------------------------------------------------------------
function getTextWidth(text, font) {
    Scontext.font = font;
    var metrics = Scontext.measureText(text);
    return metrics.width;
}
//=====================================================================================
//Apaga Imagens se posicao X ou Y forem diferentes
//
//=====================================================================================
function ApagaImagem(index){
	Scontext.fillStyle = 'white';
	if ((ArrayObjDinamic[index*10+3] != ArrayObjDinamic[index*10+7]) || (ArrayObjDinamic[index*10+4] != ArrayObjDinamic[index*10+8])){
		Scontext.fillRect(ArrayObjDinamic[index*10+7], ArrayObjDinamic[index*10+8], ArrayObjStatic[index*20+4], ArrayObjStatic[index*20+7]);
		ArrayObjDinamic[index*10+7] = ArrayObjDinamic[index*10+3];
		ArrayObjDinamic[index*10+8] = ArrayObjDinamic[index*10+4];
	}
}

//=====================================================================================
//Mostra um painel com todas as variáveis do sistema
//Visualiza as variáveis do sistema
//=====================================================================================
function simIhm() {
	var tamanho_array = 0;
	var tipo_funcao = ['I','Q','M','T','C','R'];
	var linha = 70;
	Scontext.lineWidth = 2;
  	Scontext.fillStyle = 'white';
  	Scontext.fillRect(780, 5, 310, 560);
  	Scontext.font = '36pt Arial';
  	Scontext.fillStyle = 'red';
	Scontext.fillText(localStorage.num_clp1, 795, 60);
	Scontext.fillStyle = 'black';
  	Scontext.strokeRect(785, 10, 305, 555);
  	Scontext.font = '16pt Arial';
  	Scontext.fillStyle = 'black';
  	Scontext.fillText('Mapa de Memória', 860, 40);
  	Scontext.font = '9pt Arial';
  	var num_linhas;
  	for (var funcao=0; funcao<6; funcao++) {
    		switch (parseInt(funcao)){
      		case 0:
        		Scontext.fillStyle = 'black';
        		Scontext.fillRect(790, linha-5, 60, 5);
        		Scontext.fillText('ENTRADAS', 870, linha);
        		Scontext.fillRect(955, linha-5, 60, 5);
        		Scontext.fillRect(1025, linha-5, 60, 5);
        		tamanho_array = SI.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Scontext.fillText('MSB', 790,linha);
        		Scontext.fillText('Valor binário', 870,linha);
        		Scontext.fillText('LSB', 990,linha);
        		Scontext.fillText('Decimal', 1035,linha);
			linha = linha + 15;
        		break;
      		case 1:
        		Scontext.fillStyle = 'black';
        		Scontext.fillRect(790, linha-5, 60, 5);
        		Scontext.fillText('SAIDAS', 880, linha);
        		Scontext.fillRect(955, linha-5, 60, 5);
        		Scontext.fillRect(1025, linha-5, 60, 5);
        		tamanho_array = SQ.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Scontext.fillText('MSB', 790,linha);
        		Scontext.fillText('Valor binário', 870,linha);
        		Scontext.fillText('LSB', 990,linha);
        		Scontext.fillText('Decimal', 1035,linha);
        		linha = linha + 15;
        		break;
      		case 2:
        		Scontext.fillStyle = 'black';
        		Scontext.fillRect(790, linha-5, 60, 5);
        		Scontext.fillText('MEMÓRIAS', 870, linha);
        		Scontext.fillRect(955, linha-5, 60, 5);
        		Scontext.fillRect(1025, linha-5, 60, 5);
        		tamanho_array = SM.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Scontext.fillText('MSB', 790,linha);
        		Scontext.fillText('Valor binário', 870,linha);
        		Scontext.fillText('LSB', 990,linha);
        		Scontext.fillText('Decimal', 1035,linha);
        		linha = linha + 15;
        		break;
      		case 3:
        		Scontext.fillStyle = 'black';
        		Scontext.fillRect(790, linha-5, 60, 5);
        		Scontext.fillText('TIMERS', 880, linha);
       			Scontext.fillRect(955, linha-5, 60, 5);
        		tamanho_array = ST.length;
        		num_linhas = parseInt(tamanho_array / 3);
        		linha = linha + 15;
        		Scontext.fillText('Tem', 790,linha);
        		Scontext.fillText('bit', 870,linha);
        		Scontext.fillText('PV', 920,linha);
        		Scontext.fillText('SP', 970,linha);
        		linha = linha + 15;
        		break;
		case 4:
        		Scontext.fillStyle = 'black';
        		Scontext.fillRect(790, linha-5, 60, 5);
        		Scontext.fillText('CONTADORES', 860, linha);
        		Scontext.fillRect(955, linha-5, 60, 5);
        		tamanho_array = SC.length;
        		num_linhas = parseInt(tamanho_array / 4);
        		linha = linha + 15;
        		Scontext.fillText('Cont', 790,linha);
        		Scontext.fillText('bit', 845,linha);
        		Scontext.fillText('PV', 895,linha);
        		Scontext.fillText('SP', 945,linha);
        		Scontext.fillText('AUX', 990,linha);
        		linha = linha + 15;
        		break;
      		case 5:
        		Scontext.fillStyle = 'black';
        		Scontext.fillRect(790, linha-5, 60, 5);
        		Scontext.fillText('RAMAIS', 880, linha);
        		Scontext.fillRect(955, linha-5, 60, 5);
        		tamanho_array = SR.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Scontext.fillText('MSB', 790,linha);
        		Scontext.fillText('Valor binário', 870,linha);
        		Scontext.fillText('LSB', 990,linha);
        		linha = linha + 15;
        		break;
		default:
        		tamanho_array = 1;
    		}
    		var posicao;
    		var n_posicao;
    		for (var n_linhas=0; n_linhas <= num_linhas; n_linhas++){
      			posicao = 0;
      			Scontext.fillStyle = 'green';
      			if (n_linhas < num_linhas){
        			if (funcao <3){
        				Scontext.fillText(tipo_funcao[funcao]+n_linhas+'.15', 790,linha);
        				n_posicao = (n_linhas * 16) + posicao;
        			}
        			if (funcao==5) {
        				n_posicao = (n_linhas * 16) + posicao;
        				Scontext.fillText(tipo_funcao[funcao]+(n_posicao+15), 790,linha);
        			}
      			}
      			else  {
        			if (funcao <3){
        				Scontext.fillText(tipo_funcao[funcao]+n_linhas+'.'+((tamanho_array%16)-1), 790,linha);
        				n_posicao = (n_linhas * 16) + posicao;
        			}
        			if (funcao==5) {
        				n_posicao = (n_linhas * 16) + posicao;
        				Scontext.fillText(tipo_funcao[funcao]+(n_posicao + (tamanho_array%16)-1), 790,linha);
        			}
      			}
      			if(funcao==4){
        			Scontext.fillText(tipo_funcao[funcao]+n_linhas, 790,linha);
        			n_posicao = (n_linhas * 4) + posicao;
      			}
      			if(funcao==3){
        			Scontext.fillText(tipo_funcao[funcao]+n_linhas, 790,linha);
        			n_posicao = (n_linhas * 3) + posicao;
      			}
      			do {
        			switch (parseInt(funcao)){
        			case 0:
        				Scontext.fillStyle = 'red';
        				Scontext.fillText(SI[n_posicao], 980-(posicao*10),linha);
        				break;
        			case 1:
        				Scontext.fillStyle = 'red';
        				Scontext.fillText(SQ[n_posicao], 980-(posicao*10),linha);
        				break;
        			case 2:
        				Scontext.fillStyle = 'red';
        				Scontext.fillText(SM[n_posicao], 980-(posicao*10),linha);
        				break;
        			case 5:
        				Scontext.fillStyle = 'red';
        				Scontext.fillText(SR[n_posicao], 980-(posicao*10),linha);
        				break;
        			case 4:
        				Scontext.fillStyle = 'red';
        				Scontext.fillText(SC[n_posicao], 850+(posicao*50),linha);
        				if (posicao >2)
        					posicao = 15;
        				break;
        			case 3:
        				Scontext.fillStyle = 'red';
        				Scontext.fillText(ST[n_posicao], 875+(posicao*50),linha);
        				if (posicao >1)
        					posicao = 15;
        				break;
        			default:
        				posicao = 0;
        			}
        			posicao++;
        			n_posicao++;
      			} while((n_posicao < tamanho_array) && (posicao < 15));

      			if (funcao<3) {
        			Scontext.fillStyle = 'green';
        			Scontext.fillText(tipo_funcao[funcao]+n_linhas+'.0 - ' +tipo_funcao[funcao]+n_linhas+' = ', 990,linha);
        			Scontext.fillStyle = 'red';
        			Scontext.fillText(Sim_enderecoCT(tipo_funcao[funcao]+n_linhas,0), 1060,linha);
      			}
      			if (funcao==5) {
        			Scontext.fillStyle = 'green';
        			Scontext.fillText(tipo_funcao[funcao]+(n_linhas*16), 990,linha);
      			}
      			linha += 15;
      			if (n_posicao >= tamanho_array)
        			break;
    		}
  	}
}

//======================================================================
//retira o valor da funcao Q/E/T/C/M
//=======================================================================
function Sim_endereco(Aux_data){
	var tamanho = Aux_data.length;
	var negacao = 0;
	var index;
	var retorno;
	var primeiro_char = Aux_data.charAt(0);
	if (primeiro_char != 'R' && primeiro_char != 'C' && primeiro_char != 'T' && primeiro_char != 'U' && primeiro_char != 'D' && primeiro_char != 'X' && primeiro_char != 'Y'){
		var ponto = Aux_data.indexOf('.');
		if (primeiro_char =='N') {
			primeiro_char = Aux_data.charAt(1);
			index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
			negacao = 1;
		}
		else{
			negacao = 0;
			if (ponto == -1)
				index = parseInt(Aux_data.substr(1)) *16;
			else
				index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
		}
	}
	else {
		negacao = 0;
		index = parseInt(Aux_data.substr(1));
	}


	switch (primeiro_char) {
		case 'Q':
			retorno = SQ[index];
			break;
		case 'I':
			retorno = SI[index];
			break;
		case 'M':
			retorno = SM[index];
			break;
		case 'R':
			retorno = SR[index];
			break;
		case 'T':
			retorno = ST[3*index];
			break;
		case 'C':
			retorno = SC[4*index];
			break;
		case 'D':
			retorno = Sim_endereco(ArrayObjStatic[index*20+1]);
			break;
		case 'U':
			retorno = Sim_endereco(ArrayObjStatic[index*20+1]);
			break;
		case 'X':
			retorno = Sim_endereco(ArrayObjStatic[index*20+1]);
			break;
		case 'Y':
			retorno = Sim_endereco(ArrayObjStatic[index*20+1]);
			break;
		default:
			retorno = 3;
	}
	if (negacao==1){
		if (retorno == 0 )
			retorno = 1;
		else
			retorno = 0;
	}
	if (isNaN(parseInt(retorno)))
		retorno = 0;
	return parseInt(retorno);
}

//======================================================================
// Escole variavel Analogica ou Digital
function Sim_escreve(Aux_data, valor)
{
	if( Aux_data.indexOf('.') != -1)
		Sim_escreve_endereco(Aux_data,valor);
	else
		Sim_escreveCT(Aux_data,valor);
}

//======================================================================
//ESCREVE o valor da funcao Q/E/M
//=======================================================================
function Sim_escreve_endereco(Aux_data, valor)
{
	var index;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T'){
		var ponto = Aux_data.indexOf('.');
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
	}
	else {
		index = parseInt(Aux_data.substr(1));
	}

	switch (Aux_data.charAt(0)) {
		case 'Q':
			SQ[index] = valor;
			break;
		case 'I':
			SI[index] = valor;
			Envia_Entrada_S(SI);
			break;
		case 'M':
			SM[index] = valor;
            		Envia_Memoria_S('SM'+parseInt(index/16));
			break;
		case 'R':
			SR[index] = valor;
			break;
		case 'T':
			ST[3*index+1] = valor;
			break;
		case 'C':
			SC[4*index+3] = 2;
			break;
	}
}

//======================================================================
//ESCREVE o valor da funcao T/C
//=======================================================================
function Sim_escreveCT(Aux_data, valor, index1)
{
	var index;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T'){
		var ponto = Aux_data.indexOf('.');
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			index = (parseInt(Aux_data.charAt(ponto-1)) *16);
	}
	else {
		index = parseInt(Aux_data.substr(1));
	}

	switch (Aux_data.charAt(0)) {
		case 'I':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = parseInt(valor) %2;
				SI[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			SI[index+15] = valor;
			Envia_Entrada_S(SI);
			break;
		case 'Q':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = parseInt(valor) %2;
				SQ[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			SQ[index+15] = valor;
			break;
		case 'M':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = parseInt(valor) %2;
				SM[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			SM[index+15] = valor;
			Envia_Memoria_S('SM'+parseInt(index/16));
			break;
		case 'T':
			ST[3*index+index1] = valor;
			break;
		case 'C':
			SC[4*index+index1] = valor;
			break;
	}
}


//======================================================================
//retira o valor da funcao T/C
//=======================================================================
function Sim_enderecoCT(Aux_data, index1) {
	var tamanho = Aux_data.length;
	var index;
	var retorno;
	var primeiro_char = Aux_data.charAt(0);
	if (primeiro_char != 'R' && primeiro_char != 'C' && primeiro_char != 'T' && primeiro_char != 'X' && primeiro_char != 'Y' && primeiro_char != 'D' && primeiro_char != 'U') {
		var ponto = Aux_data.indexOf('.');
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			retorno = 3;
	}
	else {
		index = parseInt(Aux_data.substr(1));
	}


	switch (primeiro_char) {
		case 'I':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + Sim_variavelCT(SI[index+ ia])* (2**ia);
			break;
		case 'Q':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + Sim_variavelCT(SQ[index+ ia])* (2**ia);
		  	break;
		case 'M':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + Sim_variavelCT(SM[index+ ia])* (2**ia);
			break;
		case 'T':
			retorno = ST[3*index+index1];
			break;
		case 'C':
			retorno = SC[4*index+index1];
			break;
		case 'X':
			retorno = (index1==0) ? parseInt(ArrayObjDinamic[index*10+3]) : parseInt(ArrayObjDinamic[index*10+3])+parseInt(ArrayObjStatic[index*20+4]);
			break;
		case 'Y':
			retorno = (index1==0) ? parseInt(ArrayObjDinamic[index*10+4]) : parseInt(ArrayObjDinamic[index*10+4])+parseInt(ArrayObjStatic[index*20+7]);
			break;
		case 'D':
			retorno = Sim_enderecoCT(ArrayObjStatic[index*20+1], 0);
			break;
		case 'U':
			retorno = Sim_enderecoCT(ArrayObjStatic[index*20+1], 0);
			break;
		default:
			if (isNaN(parseInt(Aux_data)))
				retorno = 3;
			else
				if (parseInt(Aux_data) < 32767)
					retorno = Aux_data;
	}
	if (isNaN(parseInt(retorno)))
		retorno = 2;
	return retorno;
}

//------------------------------------------------------------------------------------
// Encontra valor de um registrador 16 bits
// Despreza os bits nao declarados, colocados como ZERO
//------------------------------------------------------------------------------------
function Sim_variavelCT(Aux_data) {
	if (isNaN(Aux_data))
      		return 0;
  	else
    		return Aux_data;
}

//------------------------------------------------------------------------------------
// Executa temporizador para objetos
//
//------------------------------------------------------------------------------------
function simTimer(index_var) {
	if (ArrayObjStatic[index_var*20+15]>0 && ArrayObjStatic[index_var*20+17]<5) {
		if (ArrayObjStatic[index_var*20+16]<ArrayObjDinamic[index_var*10+2])
			ArrayObjDinamic[index_var*10+2] = 0;
		else
			ArrayObjDinamic[index_var*10+2] = ArrayObjDinamic[index_var*10+2] + 1;
	}
	else
		ArrayObjDinamic[index_var*10+2] = 0;
}

//------------------------------------------------------------------------------------
// Mostra o tipo de figura do objeto
//
//------------------------------------------------------------------------------------
function simFigura(index_var) {
	//0_id, 1_tipo, 2_nome, 3_var_1, 4_var_2, 5_pos_x_inicial, 6_dpos_x, 7_pos_x_final, 8_pos_y_inicial, 9_dpos_y,
	//10_pos_y_final, 11_inc_x1, 12_inc_x2, 13_inc_y1, 14_inc_y2, 15_var1_dependente, 16_var2_dependente/Decremen, 17_piscar/habEntrada,//18_tempo_pisca/ResolucaoAD, 19_figura, 20_funcao, 21_reserva, 22_reserva, 23_reserva, 24_reserva

	//propriedadas das figuras dinâmicas. 0_nome, 1_tipo(1:fig1, 2:fig2, etc), 2_Timer(uso da monitoracao), 3_PosX, 4_PosY,
	// 5_Pos_ArrayImagens, 6_funcao, 7_PosX_ANt, 8_PosY_Anterior, 9_reserva

	//propriedades estáticas. 0_nome, 1_var_1, 2_var_2, 3_pos_X_nicial,4_dpos_x,5_pos_x_final,6_pos_y_nicial, 7_dpos_y,
	// 8_posicao_y_final, 9_inc_x1, 10_inc_x2, 11_inc_y1, 12_inc_y2, 13_var1_associada, 14_var2_associada, 15_piscar,
	// 16_tempo, 17_Tipo, 18_reserva, 19_reserva
	
	var variavel1 = ArrayObjStatic[index_var*20+1];
	var variavel2 = ArrayObjStatic[index_var*20+2];
	var dependencia1 = ArrayObjStatic[index_var*20+13];
	var dependencia2 = ArrayObjStatic[index_var*20+14];
	figura_animada(index_var, variavel1, variavel2);
	Verifica_Posicao_Tag(index_var, dependencia1, dependencia2);
	movimenta_x(index_var, dependencia1, dependencia2);
	movimenta_y(index_var, dependencia1, dependencia2);
	sensor(index_var, dependencia1,dependencia2);
	updown(index_var, dependencia1,dependencia2);
}

//=====================================================================================
//Figura animada
//=====================================================================================
function figura_animada(index_var, variavel1, variavel2) {
 	if (variavel1 != '')
		ArrayObjDinamic[index_var*10+1] = Sim_endereco(variavel1)+1;
	else
		ArrayObjDinamic[index_var*10+1] = 0;

	if (variavel2 != '')
		ArrayObjDinamic[index_var*10+1] = (Sim_endereco(variavel1) + Sim_endereco(variavel2))+1;

	if (ArrayObjStatic[index_var*20+16] < ArrayObjDinamic[index_var*10+2] && (ArrayObjStatic[index_var*20+15]>0) && ArrayObjDinamic[index_var*10+1]>1)
		if (ArrayObjDinamic[index_var*10+1] ==	2)
			ArrayObjDinamic[index_var*10+1] = 3;
		else
			ArrayObjDinamic[index_var*10+1] = 2;
}

//=====================================================================================
//Movimenta no eixo X
//=====================================================================================
function movimenta_x(index_var, dependencia1, dependencia2) {

	//movimenta o objeto no eixo x
	if (ArrayObjStatic[index_var*20+9]!=0 && (Sim_endereco(dependencia1) ==1)){
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+9]);
	}
	if (ArrayObjStatic[index_var*20+10]!=0 && (Sim_endereco(dependencia2) ==1)){
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+parseInt(ArrayObjStatic[index_var*20+10]);
	}
			
	//movimento via complementar
	if (ArrayObjDinamic[index_var*10+6] > 0  && FuncaoMatriz.length >0){
		var auxiliar = (ArrayObjDinamic[index_var*10+6]-1)*7;
		if ( Sim_endereco(FuncaoMatriz[auxiliar+2]) == 1){
			ApagaImagem(index_var);
			ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3]) + parseInt(FuncaoMatriz[auxiliar+3]);		
		}
	}

	//limites inicial e final relativo a posicao X
	if (ArrayObjStatic[index_var*20+5]>ArrayObjStatic[index_var*20+3]){
		if (ArrayObjStatic[index_var*20+5]<ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+5];
		if (ArrayObjStatic[index_var*20+3]>ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
	}
	else {
		if (ArrayObjStatic[index_var*20+5]>ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+5];
		if (ArrayObjStatic[index_var*20+3]<ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
	}
}

//=====================================================================================
//Movimenta no eixo Y
//=====================================================================================
function movimenta_y(index_var, dependencia1, dependencia2) {
	if (ArrayObjStatic[index_var*20+11]!=0 && (Sim_endereco(dependencia1) ==1)){
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+11]);
	}
		
	if (ArrayObjStatic[index_var*20+12]!=0 && (Sim_endereco(dependencia2) ==1)){
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+parseInt(ArrayObjStatic[index_var*20+12]);
	}
	
	//movimento via complementar
	if (ArrayObjDinamic[index_var*10+6] > 0  && FuncaoMatriz.length >0){
		var auxiliar = (ArrayObjDinamic[index_var*10+6]-1)*7;
		if ( Sim_endereco(FuncaoMatriz[auxiliar+2]) == 1){
			ApagaImagem(index_var);
			ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4]) + parseInt(FuncaoMatriz[auxiliar+4]);		
		}
	}
	//limites inicial e final relativo a posicao Y
	if (ArrayObjStatic[index_var*20+8]>ArrayObjStatic[index_var*20+6]){
		if (ArrayObjStatic[index_var*20+8]<ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+8];
		if (ArrayObjStatic[index_var*20+6]>ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
	}
	else {
		if (ArrayObjStatic[index_var*20+8]>ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+8];
		if (ArrayObjStatic[index_var*20+6]<ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
	}
}

//=====================================================================================
//Verifica a posicao e se o tag estaON
//=====================================================================================
function Verifica_Posicao_Tag(index_var, dependencia1, dependencia2){
	if (((dependencia1.charAt(0) =='V') && (dependencia1.charAt(1) =='X')) || ((dependencia2.charAt(0) =='V') && (dependencia2.charAt(1) =='X'))) {
		if (ArrayObjStatic[index_var*20+9]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1.substr(1))==1) && (Sim_endereco(dependencia1.substr(1))==1)){
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+9]);
			}		
		if (ArrayObjStatic[index_var*20+10]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1) && (Sim_endereco(dependencia2.substr(1))==1)){
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+10]);
			}		
	
		if (ArrayObjStatic[index_var*20+11]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1.substr(1))==1) && (Sim_endereco(dependencia1.substr(1))==1)){
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+11]);
		}		
		if (ArrayObjStatic[index_var*20+12]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1) && (Sim_endereco(dependencia2.substr(1))==1)){
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+12]);
		}
	}
	if (((dependencia1.charAt(0) =='V') && (dependencia1.charAt(1) =='Y')) || ((dependencia2.charAt(0) =='V') && (dependencia2.charAt(1) =='Y'))) {
		if (ArrayObjStatic[index_var*20+9]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1) && (Sim_endereco(dependencia1.substr(1))==1)){
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+9]);
			}		
		if (ArrayObjStatic[index_var*20+10]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1) && (Sim_endereco(dependencia2.substr(1))==1)){
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+10]);
			}		
	
		if (ArrayObjStatic[index_var*20+11]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1) && (Sim_endereco(dependencia1.substr(1))==1)){
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+11]);
		}		
		if (ArrayObjStatic[index_var*20+12]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1) && (Sim_endereco(dependencia2.substr(1))==1)){
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+12]);
		}
	}
}
//=====================================================================================
//Up e Down
//=====================================================================================
function updown(index_var, dependencia1, dependencia2) {
	if (dependencia1.charAt(0) == 'U' && Sim_endereco(dependencia1)==1 ){
		Sim_escreveCT(ArrayObjStatic[index_var*20+1],parseInt(Sim_enderecoCT(ArrayObjStatic[index_var*20+1],0))+parseInt(dependencia2),0);
		if(Sim_enderecoCT(ArrayObjStatic[index_var*20+1],0) > ArrayObjStatic[index_var*20+16])
			Sim_escreveCT(ArrayObjStatic[index_var*20+1],ArrayObjStatic[index_var*20+16],0);
	}
	if (dependencia1.charAt(0) == 'D' && Sim_endereco(dependencia1)==1) {
		Sim_escreveCT(ArrayObjStatic[index_var*20+1],parseInt(Sim_enderecoCT(ArrayObjStatic[index_var*20+1],0))-parseInt(dependencia2),0);
		if (Sim_enderecoCT(ArrayObjStatic[index_var*20+1],0) < 0)
			Sim_escreveCT(ArrayObjStatic[index_var*20+1],0,0);
	}
}

//=====================================================================================
//Sensor
//=====================================================================================
function sensor(index_var, dependencia1, dependencia2) {
	//------------------------------------------------------
	// controle sensor via variavel de dependencia
	//------------------------------------------------------
	var RESET = 'X';
	if (dependencia1.charAt(0) == 'X' && dependencia2.charAt(0)!='Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1)==1){
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
		}
		else
    		Sim_escreve(ArrayObjStatic[index_var*20+1],0);
	}

	if (dependencia1.charAt(0) == 'Y' && dependencia2.charAt(0)!='X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1)==1){
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
		}
		else
    		Sim_escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia2.charAt(0) == 'X' && dependencia1.charAt(0)!='Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2)==1){
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
		}
    		else
    			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia2.charAt(0) == 'Y' && dependencia1.charAt(0)!='X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2)==1){
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
		}
    		else
    			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia1.charAt(0) == 'X' && dependencia2.charAt(0) == 'Y') {
		if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1)==1)&&(verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2)==1)){
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
		}
    		else
    			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia1.charAt(0) == 'Y' && dependencia2.charAt(0) == 'X') {
		if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1)==1)&&(verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2)==1)){
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
		}
     		else
      			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
	}
	//Controle via SET E RESET
	if (dependencia1.charAt(0) == 'S' && dependencia1.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4],dependencia1.substr(1))==1)
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
	}

	if (dependencia1.charAt(0) == 'S' && dependencia1.charAt(1) == 'Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1)
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
	}
	if (dependencia2.charAt(0) == 'R' && dependencia2.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1)
			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
 	}
	if (dependencia2.charAt(0) == 'R' && dependencia2.charAt(1) == 'Y') {
		if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1) && (Sim_endereco(ArrayObjStatic[index_var*20+1])==1)) 
			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia2.charAt(0) == 'S' && dependencia2.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4],dependencia1.substr(1))==1)
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
	}

	if (dependencia2.charAt(0) == 'S' && dependencia2.charAt(1) == 'Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1)
			Sim_escreve(ArrayObjStatic[index_var*20+1],1);
	}
	if (dependencia1.charAt(0) == 'R' && dependencia1.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1)
			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
 	}
	if (dependencia1.charAt(0) == 'R' && dependencia1.charAt(1) == 'Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1)
			Sim_escreve(ArrayObjStatic[index_var*20+1],0);
  	}
}

//=====================================================================================
//Verifica se a posicao de um objeto está entre (sobre) um outro objet
//=====================================================================================
function verificaPosicao(posicao, deslocamento, dependencia) {
	var retorno = 0;
	var A = Sim_enderecoCT(dependencia,0);
	var B = Sim_enderecoCT(dependencia,1);
	var C = parseInt(posicao);
	var D = parseInt(posicao)+ parseInt(deslocamento);

	if (((A < D) && (B > C))) {  // || (( B < D) && (B > C)) || ((A < C) && (B > D))) {
		   retorno = 1;
	}
	return retorno;
}

//=====================================================================================
//Verifica se a posicao do texto  está sobre o ponteiro
//=====================================================================================
function verificaTexto(posicao, deslocamento, dependencia) {
	var retorno = 0;
	var A = Sim_enderecoCT(dependencia,0);
	var B = Sim_enderecoCT(dependencia,1);
	var C = parseInt(posicao);
	var D = parseInt(posicao)+ parseInt(deslocamento);
	if ((B -A)>0)
		retorno = verificaPosicao(posicao, 0, dependencia);
	else
	{
		if (deslocamento < 0){
			if ((A < C) && (A > D))
				retorno = 1;
		}
		else {
			if ((A < D) && (A > C))
				retorno = 1;
		}
	}
	return retorno;
}

//=====================================================================================
//Desenho o processo para simulacao apartir de uma matriz
// Apos leitura do arquivo
//=====================================================================================
function Sim_draw_processo(fileArr) {
	//alerta("drawprocesso");
	inicializa_array();
	//alerta("inicializaarray");
	//draw_simulador_fundo();
	alerta("drawsimuladorfundo");
	Scontext.font = '9pt Arial';
	var ponteiro = 0;
	for (var i=1; i<fileArr.length; i++) {
		var fileLine = fileArr[i].split(',');
		if ((fileLine[1] >0) && (fileLine[1]<10)) {
			if ((fileLine[1] != 1) && (fileLine[1] <5)) {
				ArrayObjDinamic[(i-1)*10+5] = ArrayImagens.length;
				ArrayImagens[ArrayObjDinamic[(i-1)*10+5]] = fileLine[19];
			}
			if (fileLine[1]==1) {
				ArrayObjDinamic[(i-1)*10+5] = ArrayLabel.length;
				ArrayLabel[ArrayObjDinamic[(i-1)*10+5]] = fileLine[19];
			}
			if ((fileLine[1]==6) || (fileLine[1]==7) ) {
				ArrayObjDinamic[(i-1)*10+5] = fileLine[19];
			}
			ArrayObjStatic[(i-1)*20] = fileLine[2];
			ArrayObjStatic[(i-1)*20+1] = fileLine[3];
			ArrayObjStatic[(i-1)*20+2] = fileLine[4];
			ArrayObjStatic[(i-1)*20+3] = fileLine[5];
			ArrayObjStatic[(i-1)*20+4] = fileLine[6];
			ArrayObjStatic[(i-1)*20+5] = fileLine[7];
			ArrayObjStatic[(i-1)*20+6] = fileLine[8];
			ArrayObjStatic[(i-1)*20+7] = fileLine[9];
			ArrayObjStatic[(i-1)*20+8] = fileLine[10];
			ArrayObjStatic[(i-1)*20+9] = fileLine[11];
			ArrayObjStatic[(i-1)*20+10] = fileLine[12];
			ArrayObjStatic[(i-1)*20+11] = fileLine[13];
			ArrayObjStatic[(i-1)*20+12] = fileLine[14];
			ArrayObjStatic[(i-1)*20+13] = fileLine[15];
			ArrayObjStatic[(i-1)*20+14] = fileLine[16];
			ArrayObjStatic[(i-1)*20+15] = fileLine[17];
			ArrayObjStatic[(i-1)*20+16] = fileLine[18];
			ArrayObjStatic[(i-1)*20+17] = fileLine[1];
			ArrayObjStatic[(i-1)*20+18] = fileLine[21];
			ArrayObjStatic[(i-1)*20+19] = fileLine[22];

			ArrayObjDinamic[(i-1)*10] = fileLine[2];
			if (fileLine[3] == "")
				ArrayObjDinamic[(i-1)*10+1] = 0;
			else
				ArrayObjDinamic[(i-1)*10+1] = 1;
			ArrayObjDinamic[(i-1)*10+2] = fileLine[18];
			ArrayObjDinamic[(i-1)*10+3] = fileLine[5];
			ArrayObjDinamic[(i-1)*10+4] = fileLine[8];
			ArrayObjDinamic[(i-1)*10+6] = fileLine[20];
			ArrayObjDinamic[(i-1)*10+9] = fileLine[23];
			if ((ArrayObjStatic[(i-1)*20+17] != 1) && (ArrayObjStatic[(i-1)*20+17] < 5)) {
				//var r=confirm("Table:"+ fileLine[21]);
				//var r1=confirm("Table1:"+ fileLine[22]);
				//var r2=confirm("Table2:"+ fileLine[23]);
				/*LoadImage(fileLine[21], i-1);
				LoadImage1(fileLine[22], i-1);
				LoadImage2(fileLine[23], i-1);
				*/
				LoadImage(simPath + ArrayImagens[ArrayObjDinamic[(i-1)*10+5]] + Extensao[ArrayObjDinamic[(i-1)*10+1]] + '.png', i-1);
				LoadImage1(simPath + ArrayImagens[ArrayObjDinamic[(i-1)*10+5]] + '_on1.png', i-1);
				LoadImage2(simPath + ArrayImagens[ArrayObjDinamic[(i-1)*10+5]] + '_on2.png', i-1);
				
			}		
			else {
				if (ArrayObjStatic[(i-1)*20+17] == 1) {
					funcaoLabel(i-1);
				}
				if (ArrayObjStatic[(i-1)*20+17] == 6) {
					Scontext.fillText(Sim_enderecoCT(ArrayObjStatic[(i-1)*20+1],0),ArrayObjStatic[(i-1)*20+3] ,ArrayObjStatic[(i-1)*20+6]);
				}
				if (ArrayObjStatic[(i-1)*20+17] == 7) {
					Scontext.fillStyle = 'blue';
					Scontext.fillRect(ArrayObjDinamic[(i-1)*10+3], ArrayObjDinamic[(i-1)*10+4], ArrayObjStatic[(i-1)*20+4], ArrayObjStatic[(i-1)*20+7]);
				}
			}
		}
		
		if (fileLine[1] == 'X') {
			FuncaoMatriz[ponteiro]= ponteiro;
			ponteiro++;
			for (var ij=2; ij < 8; ij++){
				FuncaoMatriz[ponteiro] = fileLine[ij];
				ponteiro++;
			};
		}
	};
	LoadedImages = 1;
}

//-----------------------------
//https://stackoverflow.com/questions/32363801/images-not-loaded-on-first-call-in-html-canvas
//---------------------

function LoadImage(imagefile, ij) {
    	var image1 = new Image();
	image1.onload = function() {
        	Scontext.drawImage(Imagens[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
		Imagens_Real[ij] = Scontext.getImageData(ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]); //684, 0, 784, 250);
    	};
    	image1.src = imagefile;
    	Imagens[Imagens.length] = image1;
}
function LoadImage1(imagefile, ij) {
    	var image1 = new Image();
	image1.onload = function() {
    		Scontext.drawImage(Imagens1[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
		Imagens1[ArrayObjDinamic[ij*10+5]] = image1;
		Imagens1_Real[ij] = Scontext.getImageData(ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]); //684, 0, 784, 250);
    	};	
    	image1.src = imagefile;
	Imagens1[ArrayObjDinamic[ij*10+5]] = image1;
}
function LoadImage2(imagefile, ij) {
   	var image1 = new Image();
	image1.onload = function() {
    		Scontext.drawImage(Imagens2[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
		Imagens2[ArrayObjDinamic[ij*10+5]] = image1;
		Imagens2_Real[ij] = Scontext.getImageData(ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]); //684, 0, 784, 250);
    		
	};	
    	image1.src = imagefile;
	Imagens2[ArrayObjDinamic[ij*10+5]] = image1;
}
function LoadImageIndexX1(extensao, index) {
    	switch (extensao)
	{
	case 2:
		Scontext.drawImage(Imagens1[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4], ArrayObjStatic[index*20+4], ArrayObjStatic[index*20+7]);
		break;
	case 3:
		Scontext.drawImage(Imagens2[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4], ArrayObjStatic[index*20+4], ArrayObjStatic[index*20+7]);
		break;
	default:
		Scontext.drawImage(Imagens[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4], ArrayObjStatic[index*20+4], ArrayObjStatic[index*20+7]);
	}
}

/*
function LoadImage(image, ij) {
    	//var image1 = new Image();
	const imageData = Scontext.createImageData(ArrayObjStatic[ij*10+4], ArrayObjStatic[ij*10+7]);
	funcaoImagem(imageData, image);
	Imagens_Real[ArrayObjDinamic[ij*10+5]] = imageData;
	//image1.onload = function() {
        	Scontext.putImageData(imageData, ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4]);
		//Scontext.drawImage(Imagens[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
    		//Imagens_Real[ArrayObjDinamic[ij*10+5]] = Scontext.getImageData(ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
	//};
    	//image1 = image;
    	//Imagens[Imagens.length] = image1;
}
function funcaoImagem(imageData, image){
	var imagem = image.split('.');
	for( var i = 0 ; i <imagem.length; i++)
		imageData.data[i] = imagem[i];
}
function LoadImage1(imagefile, ij) {
    	//var image1 = new Image();
	const imageData = Scontext.createImageData(ArrayObjStatic[ij*10+4], ArrayObjStatic[ij*10+7]);
	funcaoImagem(imageData, imagefile);
	//imageData.data = Uint8ClampedArray.imagefile.split('.');
	Imagens1_Real[ArrayObjDinamic[ij*10+5]] = imageData;
	//image1.onload = function() {
    	//	Scontext.putImageData(imageData, ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4]);
		//Imagens1[ArrayObjDinamic[ij*10+5]] = image1;
		//Scontext.drawImage(Imagens[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
    		//Imagens_Real[ArrayObjDinamic[ij*10+5]] = Scontext.getImageData(ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
    	//};	
    	//image1.src = imagefile;
	//Imagens1[ArrayObjDinamic[ij*10+5]] = image1;
}
function LoadImage2(imagefile, ij) {
   	//var image1 = new Image();
	const imageData = Scontext.createImageData(ArrayObjStatic[ij*10+4], ArrayObjStatic[ij*10+7]);
	funcaoImagem(imageData, imagefile);
	//imageData.data = Uint8ClampedArray.imagefile.split('.');
	Imagens2_Real[ArrayObjDinamic[ij*10+5]] = imageData;
	//image1.onload = function() {
    	//	Scontext.putImageData(imageData, ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4]);
		//Imagens2[ArrayObjDinamic[ij*10+5]] = image1;
		//Scontext.drawImage(Imagens[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
    		//Imagens_Real[ArrayObjDinamic[ij*10+5]] = Scontext.getImageData(ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
	//};	
    	//image1.src = imagefile;
	//Imagens2[ArrayObjDinamic[ij*10+5]] = image1;
}
function LoadImageIndexX1(extensao, index) {
	switch (extensao)
	{
	case 2:
		Scontext.putImageData(Imagens1_Real[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4]);
		break;
	case 3:
		Scontext.putImageData(Imagens2_Real[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4]);
		break;
	default:
		Scontext.putImageData(Imagens_Real[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4]);
	}
}
*/
function LoadImageIndex(imagefile, index) {
    	var image1 = new Image();
	image1.onload = function() {
    		Scontext.drawImage(Imagens[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4], ArrayObjStatic[index*20+4], ArrayObjStatic[index*20+7]);
	};
    	image1.src = imagefile;
    	Imagens[ArrayObjDinamic[index*10+5]] = image1;
}

function LoadImageX(imagefile, ij) {
    	var image1 = new Image();
	image1.onload = function() {
        	Scontext.drawImage(Imagens[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
    	};
    	image1= Imagens[Imagens.length];
}

//=====================================================================================
//Desenha area de trabalho em branco
//=====================================================================================
function draw_simulador_fundo(){
	Scontext.lineWidth = 1;
	Scontext.fillStyle = 'white';
	Scontext.fillRect(1, 1, 569, 524);
	Scontext.fillStyle = 'black';
	Scontext.strokeRect(2, 2, 568, 523);
}

//=====================================================================================
// Inicializa o array
//=====================================================================================
function inicializa_array(){
	Imagens =[];
	Imagens_Real = [];
	Imagens1_Real = [];
	Imagens2_Real = [];
	Imagens1 =[];
	Imagens2 =[];
	ArrayImagens = [];
	ArrayLabel = [];
	ArrayObjDinamic = [];
	ArrayObjStatic =[];
	LoadedImages = 0;
}

//=====================================================================================
//Redesenha o processo para simulacao
// Apos leitura do alteracao doarquivo em appsimfuncao.js
//=====================================================================================
function redraw_processo() {
	Scontext.font = '9pt Arial';
	var ponteiro = 0;
	for(var i=0; i <(ArrayObjStatic.length/20); i++) {
		if ((ArrayObjStatic[i*20+17] != 1) && (ArrayObjStatic[i*20+17] < 5)) {
			LoadImageX(simPath + ArrayImagens[ArrayObjDinamic[i*10+5]] + Extensao[ArrayObjDinamic[i*10+1]] + '.png', i);
			//LoadImage(simPath + ArrayImagens[ArrayObjDinamic[i*10+5]] + Extensao[ArrayObjDinamic[i*10+1]] + '.png', i);
		}		
		else {
			if (ArrayObjStatic[i*20+17] == 1) {
				funcaoLabel(i);
			}
			if (ArrayObjStatic[i*20+17] == 6) {
				Scontext.fillText(Sim_enderecoCT(ArrayObjStatic[i*20+1],0),ArrayObjStatic[i*20+3] ,ArrayObjStatic[i*20+6]);
			}
			if (ArrayObjStatic[i*20+17] == 7) {
				Scontext.fillStyle = 'blue';
				Scontext.fillRect(ArrayObjDinamic[i*10+3], ArrayObjDinamic[i*10+4], ArrayObjStatic[i*20+4], ArrayObjStatic[i*20+7]);
			}
		}
	}
}
