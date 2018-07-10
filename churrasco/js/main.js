
        document.pessoa.addEventListener('submit', adicionarPessoa);
 		document.getElementById('cFix').addEventListener('click', adicionarProdutoCFix);
 		document.getElementById('cPer').addEventListener('click', adicionarProdutoCPCap);

        var somador = {
        pessoas: [],
        produtosCFix: {},
        produtosCPCap: {},
        calculo: function (argument) {
			var soma = 0;
			Object.keys(somador.produtosCFix).forEach(function(key){
				soma += Number(somador.produtosCFix[key]);
			})
			Object.keys(somador.produtosCPCap).forEach(function(key){
				soma += Number(somador.produtosCPCap[key]) * somador.pessoas.length;
			})
			if(somador.pessoas.length>0){
			document.getElementById('valorFinal').innerHTML = (soma/somador.pessoas.length).toFixed(2);
			}else document.getElementById('valorFinal').innerHTML = (somador.pessoas.length).toFixed(2);

		},
        adicionarPessoa: function (nome) {
			this.pessoas.push(nome);
			this.callUpdate();
        },
        adicionarProdutoCFix: function (produto, valor) {
        	this.produtosCFix[produto] = valor;
			desenharTabelaPF();
        },
        adicionarProdutoCPCap: function (produto, valor) {
        	this.produtosCPCap[produto] = valor;
			desenharTabelaPerCap();
		},
        removerPessoa: function (key) {
			this.pessoas.splice(key, 1);
			this.callUpdate();
        },
        removerProdutoCFix: function (produto) {
        	delete somador.produtosCFix[produto];
			desenharTabelaPF();
        },
        removerProdutoCPCap: function (produto) {
        	delete somador.produtosCPCap[produto];
			desenharTabelaPerCap();
        },

        callUpdate:null
      };

      var lista = document.querySelector('ul');
      var tabelaPCFix = document.getElementById('tabelaPCFix');
      var tabelaPerCap = document.getElementById('tabelaPerCap');

      somador.callUpdate = desenharListaPe;

      function adicionarPessoa(e) {
          e.preventDefault();
          somador.adicionarPessoa(document.pessoa.nome.value);
          document.pessoa.nome.value = "";
          somador.calculo();
      }

      function adicionarProdutoCFix(e) {
          e.preventDefault();
          somador.adicionarProdutoCFix(document.getElementById('produto').value, document.getElementById('valor').value);
          document.getElementById('produto').value = "";
          document.getElementById('valor').value = "";
          somador.calculo();
      }

      function adicionarProdutoCPCap(e) {
          e.preventDefault();
          somador.adicionarProdutoCPCap(document.getElementById('produto').value, document.getElementById('valor').value);
          document.getElementById('produto').value = "";
          document.getElementById('valor').value = "";
          somador.calculo();
      }

      function desenharListaPe(){
        lista.innerHTML = "";
        for(var i=0; i<somador.pessoas.length; i++){
          var novoLi = document.createElement('li');
          a = document.createElement('a');
          a.setAttribute("chave", i);
          a.className = 'apagaPessoa';
          a.addEventListener('click', removePessoa);
          novoLi.textContent = somador.pessoas[i];
          lista.appendChild(novoLi);
          novoLi.appendChild(a)
        }
      }

      function desenharTabelaPF(){
        tabelaPCFix.innerHTML = "";
		Object.keys(somador.produtosCFix).forEach(function(key){
          var novoTr = document.createElement('tr');
          var novoProduto = document.createElement('td');
          var novoValor = document.createElement('td');
          a = document.createElement('a');
          a.className = 'apagaProdutoCFix';
          a.setAttribute('produto', key);
          a.addEventListener('click', removeProdutoCFix);
          novoProduto.textContent = key;
          novoValor.textContent = somador.produtosCFix[key];
          novoTr.appendChild(novoProduto);
          novoTr.appendChild(novoValor);
          tabelaPCFix.appendChild(novoTr);
          novoValor.appendChild(a)
        });
      }

      function desenharTabelaPerCap(){
        tabelaPerCap.innerHTML = "";
		Object.keys(somador.produtosCPCap).forEach(function(key){
          var novoTr = document.createElement('tr');
          var novoProduto = document.createElement('td');
          var novoValor = document.createElement('td');
          a = document.createElement('a');
          a.className = 'apagaProdutoCFix';
          a.setAttribute('produto', key);
          a.addEventListener('click', removeProdutoCPCap);
          novoProduto.textContent = key;
          novoValor.textContent = somador.produtosCPCap[key];
          novoTr.appendChild(novoProduto);
          novoTr.appendChild(novoValor);
          tabelaPerCap.appendChild(novoTr);
          novoValor.appendChild(a)
        });
      }


      function removePessoa(e){
      	somador.removerPessoa(e.target.getAttribute('chave'));
      	somador.calculo();
      }

      function removeProdutoCFix(e){
      	somador.removerProdutoCFix(e.target.getAttribute('produto'));
      	somador.calculo();
      }

      function removeProdutoCPCap(e){
      	somador.removerProdutoCPCap(e.target.getAttribute('produto'));
      	somador.calculo();
      }

























        //     media: function(){
        //   var soma = 0;
        //   var qtd = this.numeros.length;
        //   for (var i = 0; i < qtd; i++) {
        //     soma += this.numeros[i];
        //   }
        //   return soma/qtd;
        // },
