var AImageB1 = new Image();
AImageB1.src = "/img_sim/botoessim.png";
var canvasA;
var contextA;
var valor_chave1 = new Array(14);
var simEdicao = 0;
var exemplos_dir = ['Alarme','Classificacao','Corte_Vinco','Elevador','Elevador5','Envase','Expedicao','Semaforo','Classificacao_Matheus','Classificacao_Amalia','Classificacao_Arthur','Classificacao_Luiz','Classificacao_Nicolas','Classificacao_Nicole','Classificacao_Saymon','Classificacao_Teixeira','Classificacao_Vinicius','Corte_Vinco_Leonardo','Corte_Vinco_Pedro','Corte_Vinco_Carlos','Corte_Vinco_Gustavo','Corte_Vinco_Lucas','Corte_Vinco_Rafael','Elevador_Matheus','Elevador_Alvaro','Elevador_Amalia','Elevador_Artur','Elevador_Leonardo','Elevador_Luiz','Elevador_Nicolas','Elevador_Nicole','Elevador_Pedro','Elevador_Savi','Elevador_Saymon','Elevador_Teixeira','Elevador_Carlos','Elevador_Gustavo','Elevador_Israel','Elevador_Lucas','Elevador_Rafael','Elevador_Vinicius','Elevador_Thales','Elevador_Arturo'];
var exemplos_nom = ['Alarme','Classificação','Corte e Vinco','Elevador','Elevador 5 andares','Envase','Expedição','Semáforo','Classificação Matheus','Classificação Amalia','Classificação Arthur','Classificação Luiz','Classificação Nicolas','Classificação Nicole','Classificação Saymon','Classificação Teixeira','Classificação Vinicius','Corte e Vinco Leonardo','Corte e Vinco Pedro','Corte e Vinco Carlos','Corte e Vinco Gustavo','Corte e Vinco Lucas','Corte e Vinco Rafael','Elevador Matheus','Elevador Alvaro','Elevador Amalia','Elevador Artur','Elevador Leonardo','Elevador Luiz','Elevador Nicolas','Elevador Nicole','Elevador Pedro','Elevador Savi','Elevador Saymon','Elevador Teixeira','Elevador Carlos','Elevador Gustavo','Elevador Israel','Elevador Lucas','Elevador Rafael','Elevador Vinicius','Elevador Thales','Elevador Arturo'];
		
//desenha os botoes
function draw_botoessim() {
    canvasA = document.getElementById("tela5");
    contextA = canvasA.getContext("2d");
    canvasA.width = 75;
    canvasA.height = 570;

    for(i=1; i<13; i++) {
        if (valor_chave1[i] === undefined)
		valor_chave1[i] = 0;
        contextA.drawImage(AImageB1, 70*valor_chave1[i]+(140*simEdicao), 45*(i-1), 70, 45, 5,(i-1)*43, 70, 43);
    }
}

//Verifica QUAL botao foi acionado
//Separa em tres grupos: 0 a 10: comandos do software, 11 a 20: edicao do ladder, 21 a 30: funcoes do ladder
function tBotao() {
	var posicaoy= parseInt((window.event.clientY-60)/43);

	if ((posicaoy >=0) && (posicaoy < 12))
	{
		for(i=1; i<13; i++)
			valor_chave1[i] = 0;
		valor_chave1[posicaoy+1]=1;
	}

	if (valor_chave1[12]==1){
    		window.open("/About", "About SCriWeb", "height=600,width=600");
	    	valor_chave1[12]=0;
	}
	if (valor_chave1[11]==1){
        	window.open("/helpsim", "Help SCriWeb", "height=800,width=1000");
	    	valor_chave1[11]=0;
	}
	if (valor_chave1[10]==1){
        	var modal1 = document.getElementById("myModal1");
		var t_modal = modal1.getElementsByTagName("h2");
		t_modal[0].innerHTML = "Config";	
		var modalb1 = document.getElementById("myBody1");
		modalb1.innerHTML = "<p>Número do CLP <input type='number' id='input1' name='input1' max=30 min=0 /></p>";
		modalb1.innerHTML += "<p>Tamanho da Tela Largura:<input type='number' id='input2' max=2000 min=200/></p>";
		modalb1.innerHTML += "<p>Altura:<input type='number' id='input3' name='input3' max=2000 min=0/> </p>";
		document.getElementById('input1').value = localStorage.num_clp1;
		document.getElementById('input2').value = localStorage.tela_largura;
		document.getElementById('input3').value = localStorage.tela_altura;
		// Create <OK> element that closes the modal
		var btn = document.createElement('button');
		btn.setAttribute('type','button');
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			Config_Socket_Sim(document.getElementById('input1').value);
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
	    	valor_chave1[10]=0;
		valor_chave1[5]=0;
		valor_chave1[6]=1;
	}
	if (simEdicao==0 && valor_chave1[2]==1){
        	var inputCSV = document.createElement('input');
	 	inputCSV.type = 'file';
		inputCSV.accept = '.CSV';
		inputCSV.click();
		inputCSV.onchange = function() {
	    		var file = this.files[0];
			leitorDeCSV2.readAsText(file);
			simPath = simPathInicial + file.name.slice(0,file.name.length -4) + '/';
		};
		Scomandos = 0;	
		valor_chave1[5]=0;
		valor_chave1[6]=1;
	}
	if (simEdicao==0 && valor_chave1[3]==1){
	    	let texto = '0_id, 1_tipo, 2_nome, 3_var_1, 4_var_2, 5_pos_x_inicial, 6_dpos_x, 7_pos_x_final, 8_pos_y_inicial, 9_dpos_y, 10_pos_y_final, 11_inc_x1, 12_inc_x2, 13_inc_y1, 14_inc_y2, 15_var1_dependente, 16_var2_dependente, 17_piscar, 18_tempo_pisca, 19_figura, 20_funcao, 21_reserva, 22_reserva, 23_reserva, 24_reserva \n';
	    	for (var i=0; i<(ArrayObjStatic.length/20); i++) {
			texto += i +','+ArrayObjStatic[i*20+17]+',';
			for (var j=0; j<17; j++)
			    texto += ArrayObjStatic[(i*20)+j]+',';
			if (ArrayObjStatic[(i*20)+17]>1 && ArrayObjStatic[(i*20)+17]<5) {
				//texto += ArrayImagens[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+','+ Imagens_Real[ArrayObjDinamic[i*10+5]]+','+ Imagens1_Real[ArrayObjDinamic[i*10+5]]+','+ Imagens2_Real[ArrayObjDinamic[i*10+5]] + ',,';
				
				texto += ArrayImagens[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+','; //+ Imagens_Real[ArrayObjDinamic[i*10+5]].data[0];
				if (Imagens_Real[ArrayObjDinamic[i*10+5]] != undefined)
					texto += Imagens_Real[ArrayObjDinamic[i*10+5]].data.join('.'); 
				texto += ',';
				if (Imagens1_Real[ArrayObjDinamic[i*10+5]] != undefined)
					texto += Imagens1_Real[ArrayObjDinamic[i*10+5]].data.join('.');
				texto += ',';
				if (Imagens2_Real[ArrayObjDinamic[i*10+5]] != undefined)
					texto += Imagens2_Real[ArrayObjDinamic[i*10+5]].data.join('.');
				texto += ',,';
			}
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
        	valor_chave1[3]=0;
		valor_chave1[5]=0;
		valor_chave1[6]=1;
	}
	if (simEdicao==0 && valor_chave1[5]==1){
		Scomandos = 1;
	}
	if (simEdicao==0 && valor_chave1[6]==1){
		Scomandos = 0;
	}
	if (simEdicao==0 && valor_chave1[4]==1){
		var modal1 = document.getElementById("myModal1");
		var t_modal = modal1.getElementsByTagName("h2");
		t_modal[0].innerHTML = "Download";	
		var modalb1 = document.getElementById("myBody1");
		modalb1.innerHTML = "<p><a href='http://scriweb.herokuapp.com/ftp/"+exemplos_dir[0]+"/"+exemplos_dir[0]+".csv'>"+exemplos_nom[0]+"</a></p>"; 
		for(i=1; i<(exemplos_dir.length); i++) 
			modalb1.innerHTML += "<p><a href='http://scriweb.herokuapp.com/ftp/"+exemplos_dir[i]+"/"+exemplos_dir[i]+".csv'>"+exemplos_nom[i]+"</a></p>"; 
		
		// Create <OK> element that closes the modal
		var btn = document.createElement('button');
		btn.setAttribute('type','button');
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			modal1.style.display = "none";
		};
		modalb1.appendChild(btn);
		
		// Get the <Close> element that closes the modal
		modal1.style.display = "block";
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
		
		Scomandos = 0;
		valor_chave1[4]=0;
		valor_chave1[5]=0;
		valor_chave1[6]=1;
	}
	if (simEdicao==0 && valor_chave1[1]==1){
		valor_chave1[1]=0;
		Scomandos = 0;
		simEdicao = 1;
	}
	if (simEdicao==1 && valor_chave1[1]==1){
		valor_chave1[1]=0;
		Scomandos = 0;
		valor_chave1[5]=0;
		valor_chave1[6]=1;
		simEdicao = 0;
	}
	if (simEdicao==1 && valor_chave1[2]==1){
		Scomandos = 2;
	}
	if (simEdicao==1 && valor_chave1[3]==1){
		simFuncao1();
	}
	if (simEdicao==1 && valor_chave1[4]==1){
		simFuncao2();
	}
	if (simEdicao==1 && valor_chave1[5]==1){
		simFuncao3();
	}
	if (simEdicao==1 && valor_chave1[6]==1){
		simFuncao4();
	}
	if (simEdicao==1 && valor_chave1[7]==1){
		simFuncao5();
	}
	if (simEdicao==1 && valor_chave1[8]==1){
		simFuncao6();
	}
	if (simEdicao==1 && valor_chave1[9]==1){
		simFuncao7();
	}

	draw_botoessim();		
}

//leitura de arquivos
//Fonte https://tableless.com.br/file-api-trabalhando-com-arquivos-locais-usando-javascript/
var leitorDeCSV2 = new FileReader();
leitorDeCSV2.addEventListener('load', leCSV2);

function pegaCSV(inputFile) {
	var file = inputFile.files[0];
	leitorDeCSV2.readAsText(file);
}

function leCSV2(evt) {
	var fileArr = evt.target.result.split('\n');
	if (simulacao_set_inicial == 0) {
		//draw_botoessim();
		draw_simulador_inicio();
	}
	
	//alert(fileArr);
	//alert("entrou");
	Sim_draw_processo(fileArr);
	//Sim_draw_processo(fileArr);
	//alert("saiu");
}
