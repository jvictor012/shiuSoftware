function buscar(){
    let valor_pesquisar = document.getElementById('pesquisar').value.trim()
    buscar_tabela(valor_pesquisar)
}


async function buscar_tabela(valor_pesquisar){
    let consulta = await fetch('/api/marcas')
    let dados_marca = await consulta.json()
    console.log("Chegou até aqui 3")
    verificar(valor_pesquisar, dados_marca)
}

function verificar(valor_pesquisar, dados_marca){
    for(let marca of dados_marca){
        if(marca.nome.toLowerCase() == valor_pesquisar.toLowerCase()){
            let id_marca = marca.id
            let nome_marca = marca.nome
            console.log("Chegou até aqui 2")
            coletar_dados(id_marca,nome_marca, valor_pesquisar)
        }
    };
};

async function coletar_dados(id_marca,nome_marca, valor_pesquisar) {
    let consulta = await fetch('/api/produtos');
    let dados = await consulta.json();
    console.log("Chegou até aqui 1")
    printar(dados, id_marca, valor_pesquisar)
}

async function printar(dados, id_marca,nome_marca, valor_pesquisar) {
    const container = document.getElementById('res');
    container.innerHTML = '';
    for(let dado of dados){
        if(dado.id_marca == id_marca || dado.nome_produto.toLowerCase() == nome_marca.toLowerCase().trim()){
            console.log("Chegou até aqui")
            const cardPronto = criarCardProduto(dado);
            container.appendChild(cardPronto);
        }else{
            console.log("Chegou até aqui")
        }
    } 
}




function criarCardProduto(produto_unico){
    let div_geral = document.createElement('div')
    div_geral.classList.add('card');

    let imagem = document.createElement('img')
    imagem.src = produto_unico.link_imagem

    let titulo = document.createElement('h2')
    titulo.textContent = produto_unico.nome_produto

    let nivel = document.createElement('p')
    nivel.textContent = produto_unico.barulho

    div_geral.append(imagem, titulo, nivel)
    return div_geral
};