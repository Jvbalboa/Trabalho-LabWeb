//aí vai um explicativo do que se trata o arquivo js. falta apenas mexer com o contador de movimentos e atualizar o melhor.
//a funcao winner() tem por parte este proposito.
//deixei inicializada logo abaixo a variável best para guardar a melhor performance.
//outra parada bacana eh alterar a cor do texto dependendo da performance (por isso o texto comeca em vermelho).
//guardei tambem tres arquivos de audio para usar ao concluir o jogo (ja inicializados logo abaixo)
//variavel finish1 para performance ideal (7 movimentos), finish2 para razoavel e finish3 para o pior cenario
//(ai vcs decidem quantos movimentos precisa pra considerar pior cenario)
//se tiver alguma duvida no funcionamento manda zap, meu consagrado!

document.getElementById('botao').addEventListener('click', start);


//inicializa as variáveis. se raposa, galinha e milho = 0 eh pq estao a esquerda. 1 a direita. select=0 eh pq selecionou ninguem
//select=1 eh pq tem alguem selecionado. moves guarda os movimentos e best guarda o melhor score
var moves = 0;
var ganhou = 0;
var best = 0;
var raposa = 0;
var galinha = 0;
var barqueiro = 0;
var milho = 0;
var select = 0;
var audio = new Audio('mp3/error.mp3');
var cursor = new Audio('mp3/cursor.mp3');
var pass = new Audio('mp3/pass.mp3');
var finish1 = new Audio('mp3/best.mp3');
var finish2 = new Audio('mp3/mid.mp3');
var finish3 = new Audio('mp3/worst.mp3');
var tema = new Audio('mp3/tema.mp3');
tema.loop = true;
tema.muted = false;
//a funcao abaixo altera o seguinte no css: displays da raposa, galinha, milho, seletores, float do barqueiro e o espelha.
//alem disso, muda os eventListener para que os que nao estao do lado do barqueiro e os vazios nao chamem funcao no clique. Adiciona
//eventListener nos que estao no lado do barqueiro e nao vazios.
function desenharGame(){
	document.getElementById('move').innerHTML = moves;
	document.getElementById('okR1').style.display = 'none';
	document.getElementById('okG1').style.display = 'none';
	document.getElementById('okM1').style.display = 'none';
	document.getElementById('okR2').style.display = 'none';
	document.getElementById('okG2').style.display = 'none';
	document.getElementById('okM2').style.display = 'none';
	select=0;
	if(barqueiro==0){
		document.getElementById('barco').style.cssFloat = 'left';
		document.getElementById('barco').style.transform = 'scaleX(1)';
	}
		else {
			document.getElementById('barco').style.cssFloat = 'right';
			document.getElementById('barco').style.transform = 'scaleX(-1)';
		}
	if(raposa==0){
		document.getElementById('raposaB').removeEventListener('click',toggleR);
		document.getElementById('raposaB').style.display = 'none'
		document.getElementById('raposaA').style.display = 'block'
		if(raposa==barqueiro)document.getElementById('raposaA').addEventListener('click',toggleR);
		else document.getElementById('raposaA').removeEventListener('click',toggleR);
	}else {
		document.getElementById('raposaA').removeEventListener('click',toggleR);
		document.getElementById('raposaA').style.display = 'none'
		document.getElementById('raposaB').style.display = 'block'
		if(raposa==barqueiro)document.getElementById('raposaB').addEventListener('click',toggleR);
		else document.getElementById('raposaB').removeEventListener('click',toggleR);
	}
	if(galinha==0){
		document.getElementById('galinhaB').removeEventListener('click',toggleG);
		document.getElementById('galinhaB').style.display = 'none'
		document.getElementById('galinhaA').style.display = 'block'
		if(galinha==barqueiro)document.getElementById('galinhaA').addEventListener('click',toggleG);
		else document.getElementById('galinhaA').removeEventListener('click',toggleG);
	}else {
		document.getElementById('galinhaA').removeEventListener('click',toggleG);
		document.getElementById('galinhaA').style.display = 'none'
		document.getElementById('galinhaB').style.display = 'block'
		if(galinha==barqueiro)document.getElementById('galinhaB').addEventListener('click',toggleG);
		else document.getElementById('galinhaB').removeEventListener('click',toggleG);
	}
	if(milho==0){
		document.getElementById('milhoB').removeEventListener('click',toggleM);
		document.getElementById('milhoB').style.display = 'none'
		document.getElementById('milhoA').style.display = 'block'
		if(milho==barqueiro)document.getElementById('milhoA').addEventListener('click',toggleM);
		else document.getElementById('milhoA').removeEventListener('click',toggleM);
	}else {
		document.getElementById('milhoA').style.display = 'none'
		document.getElementById('milhoB').style.display = 'block'
		document.getElementById('milhoA').removeEventListener('click',toggleM);
		if(milho==barqueiro)document.getElementById('milhoB').addEventListener('click',toggleM);
		else document.getElementById('milhoB').removeEventListener('click',toggleM);
	}
	document.getElementById
}
//funcao cronometro. atualiza o valor das variaveis de tempo a cada um segundo (1000 de tempo eh 1 segundo)
function tempo() {
	var s = 0;
	var m = 0;
	var h = 0;
	if(intervalo){
		window.clearInterval(intervalo);
	}
	intervalo = window.setInterval(function() {
		if (s == 60) { m++; s = 0; }
		if (m == 60) { h++; s = 0; m = 0; }
		if (h < 10) document.getElementById("hora").innerHTML = "0" + h; else document.getElementById("hora").innerHTML = h;
		if (s < 10) document.getElementById("segundo").innerHTML = "0" + s; else document.getElementById("segundo").innerHTML = s;
		if (m < 10) document.getElementById("minuto").innerHTML = "0" + m; else document.getElementById("minuto").innerHTML = m;
		s++;
	},1000);
}
//reseta tudo para a esquerda, limpa o tempo e o inicia novamento na funcao tempo. depois, redesenha o jogo com variaveis 0.
function reset() {
	window.clearInterval(intervalo);
	raposa = 0;
	galinha = 0;
	barqueiro = 0;
	milho = 0;
	select = 0;
	moves = 0;
	tempo();
	desenharGame();
}
//inicia os botoes do jogo.
function start(){
	tempo();
	document.getElementById('botao').value = "Resetar!";
	document.getElementById('botao').removeEventListener('click', start)
	document.getElementById('botao').addEventListener('click', reset);
	document.getElementById('raposaA').addEventListener('click',toggleR);
	document.getElementById('galinhaA').addEventListener('click',toggleG);
	document.getElementById('milhoA').addEventListener('click',toggleM);
	document.getElementById('barco').addEventListener('click',toggleB);
	}
//toggles de cada personagem. se estiver a esquerda (var=0) muda pra direita (var=1) e ativa o select (select=1).
//se alguem ja foi selecionado (select=1), verifica se o personagem esta diferente do barqueiro, pq ai a selecao foi nele.
function toggleR(){
		if(select==0){
			cursor.play();
			if(raposa==0)raposa=1;
			else raposa=0;
			if(barqueiro==0){
					document.getElementById('okR1').style.display = 'block';
			}else document.getElementById('okR2').style.display = 'block';
			select=1;
		}else{
			if(raposa!=barqueiro){
				cursor.play();
				if(raposa==0)raposa=1;
				else raposa=0;
				if(barqueiro==0){
					document.getElementById('okR1').style.display = 'none';
				}else document.getElementById('okR2').style.display = 'none';
				select=0;
			}
		}
}
function toggleG(){
		if(select==0){
			cursor.play();
			if(galinha==0)galinha=1;
			else galinha=0;
			if(barqueiro==0){
					document.getElementById('okG1').style.display = 'block';
			}else document.getElementById('okG2').style.display = 'block';
			select=1;
		}else{
			if(galinha!=barqueiro){
				cursor.play();
				if(galinha==0)galinha=1;
				else galinha=0;
				if(barqueiro==0){
					document.getElementById('okG1').style.display = 'none';
				}else document.getElementById('okG2').style.display = 'none';
				select=0;
			}
		}
}
function toggleM(){
		if(select==0){
			cursor.play();
			if(milho==0)milho=1;
			else milho=0;
			if(barqueiro==0){
					document.getElementById('okM1').style.display = 'block';
			}else document.getElementById('okM2').style.display = 'block';
			select=1;
		}else{
			if(milho!=barqueiro){
				cursor.play();
				if(milho==0)milho=1;
				else milho=0;
				if(barqueiro==0){
					document.getElementById('okM1').style.display = 'none';
				}else document.getElementById('okM2').style.display = 'none';
				select=0;
			}
		}
}
//toggle do barqueiro, verifica as condicoes de vitoria e depois de derrota. se for vitorioso, trava o contador e autoriza chamar
//a funcao winner depois de redesenhar o jogo, para ficar inicialmente todos do outro lado depois de vencer.
//se errar, chama a funcao reset.
function toggleB() {
	var win = milho==1 && galinha==1 && raposa==1;
	moves++;
	if(barqueiro==0)barqueiro=1;
	else barqueiro=0;
	if(milho!=barqueiro && galinha!=barqueiro && raposa!=barqueiro) {
		alert("Calma lá, rapaz! Vai levar ninguém, não?");
		reset();
		barqueiro=0;
	} else {
		if (milho!=barqueiro && galinha!=barqueiro) {
			audio.play();
			alert("Você perdeu! A galinha detonou o milho.");
			reset();
		} else {
			if (galinha!=barqueiro && raposa!=barqueiro) {
				audio.play();
				alert("Você perdeu! A raposa fez frango a passarinho para o jantar.");
				reset();
			} else {
				if(win!=true)pass.play();
			}
		}
	}
	desenharGame();
	if (win==true) {
		winner();
		ganhou += 1;
		resultado();
	}
}
//a funcao winner remove todos os listeners da direita e do barqueiro e muda a mensagem do botao (que ainda esta com a funcao reset)
//tem que implementar aqui tambem a atualizacao da melhor performance
function winner(){
	if(moves==7){
		finish1.play();
	}else{
		if(moves<11){
			finish2.play();
		}else{
			finish3.play();
		}
	}
	window.clearInterval(intervalo);
	document.getElementById('galinhaB').removeEventListener('click',toggleG);
	document.getElementById('milhoB').removeEventListener('click',toggleM);
	document.getElementById('raposaB').removeEventListener('click',toggleR);
	document.getElementById('barco').removeEventListener('click',toggleB);
	document.getElementById('botao').value = "Iniciar!";
	document.getElementById('botao').addEventListener('click', start);
	alert("Você ganhou! Todos chegaram com sucesso ao outro lado do rio.");

	if(best==0 || moves<best){
		best = moves;
		document.getElementById('best').innerHTML = best + ' movimentos';
		if(best<11){
			document.getElementById('best').style.color = 'purple';
			document.getElementById("best").style.fontWeight = "600";

		}else{
			document.getElementById('best').style.color = 'darkslateblue';
			document.getElementById("best").style.fontWeight = "800";
		}
		if(best==7){
			document.getElementById('best').style.color = 'lightgreen';
			document.getElementById("best").style.fontWeight = "900";
		}
	}
}

//funcao que mostra os resultados anteriores
function resultado(){
	var tbody = document.querySelector("tbody");
	var tr = document.createElement("tr");
  tbody.appendChild(tr);
	var tdExecucao = document.createElement("td");
	var tdResultado = document.createElement("td");
	tdExecucao.textContent = ganhou;
	tdResultado.textContent = moves;
	tr.appendChild(tdExecucao);
  tr.appendChild(tdResultado);
}

//funcao do peixinho. muda a posicao x dele baseado numa variavel a cada 0.00625 segundos, aumentando sempre em 0.625, que eh a
//quantidade de pixels. se a variavel chegar a 180 muda o lado dele e reduz o valor da variavel por 0.625 do mesmo jeito.
function peixe(){
	var pos = -5;
	var muda = 0;
	fish = window.setInterval(function() {
	if(muda==0){
		pos=pos+0.625;
		document.getElementById('peixe').style.left = pos+'px';
		if(pos==160){
			muda=1;
			document.getElementById('peixe').style.transform = 'scaleX(-1)';
		}
	}
	else {
		pos=pos-0.625;
		document.getElementById('peixe').style.left = pos+'px';
		if(pos==-20){
			muda=0;
			document.getElementById('peixe').style.transform = 'scaleX(1)';
		}
	}

},6.25);
	tema.play();
}
var intervalo;
var fish;
window.onload = peixe;
