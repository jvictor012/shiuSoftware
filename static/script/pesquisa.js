async function buscar() {
    let valor_pesquisar = document.getElementById('pesquisar').value.trim().toLowerCase();
    const container = document.getElementById('res');
    container.innerHTML = 'Carregando...';

    try {
        // 1. Busca marcas e produtos em paralelo para ganhar tempo
        const [resMarcas, resProdutos] = await Promise.all([
            fetch('/api/marcas'),
            fetch('/api/produtos')
        ]);

        const marcas = await resMarcas.json();
        const produtos = await resProdutos.json();

        container.innerHTML = ''; // Limpa o carregando

        // 2. Filtra as marcas que batem com a pesquisa
        const idsMarcasEncontradas = marcas
            .filter(m => m.nome.toLowerCase().includes(valor_pesquisar))
            .map(m => m.id);

        // 3. Filtra os produtos
        const produtosFiltrados = produtos.filter(produto => {
            const nomeBate = produto.nome_produto.toLowerCase().includes(valor_pesquisar);
            const marcaBate = idsMarcasEncontradas.includes(produto.id_marca);
            return nomeBate || marcaBate;
        });

        // 4. Renderiza os resultados
        if (produtosFiltrados.length === 0) {
            container.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        produtosFiltrados.forEach(produto => {
            container.appendChild(criarCardProduto(produto));
        });

    } catch (erro) {
        console.error("Erro na busca:", erro);
        container.innerHTML = 'Erro ao buscar dados.';
    }
}

async function buscar_tabela(valor_pesquisar){
    let consulta = await fetch('/api/marcas');
    let dados_marca = await consulta.json();
    verificar(valor_pesquisar, dados_marca);
}

function verificar(valor_pesquisar, dados_marca){
    for(let marca of dados_marca){
        if(marca.nome.toLowerCase().includes(valor_pesquisar.toLowerCase())){
            coletar_dados(marca.id, marca.nome, valor_pesquisar);
        }
    };
};

async function coletar_dados(id_marca, nome_marca, valor_pesquisar) {
    let consulta = await fetch('/api/produtos');
    let dados = await consulta.json();
    printar(dados, id_marca, nome_marca, valor_pesquisar);
}

async function printar(dados, id_marca, nome_marca, valor_pesquisar) {
    const container = document.getElementById('res');
    
    for(let dado of dados){
        if(dado.id_marca == id_marca || dado.nome_produto.toLowerCase() === nome_marca.toLowerCase().trim()){
            const cardPronto = criarCardProduto(dado);
            container.appendChild(cardPronto);
        }
    } 
}

function criarCardProduto(produto_unico){
    let div_geral = document.createElement('div');
    div_geral.classList.add('card');

    let imagem = document.createElement('img');
    imagem.src = produto_unico.link_imagem;

    let titulo = document.createElement('h2');
    titulo.textContent = produto_unico.nome_produto;

    let nivel = document.createElement('p');
    nivel.textContent = `Nível de ruído: ${produto_unico.barulho} dB`;

    div_geral.append(imagem, titulo, nivel);
    return div_geral;
};