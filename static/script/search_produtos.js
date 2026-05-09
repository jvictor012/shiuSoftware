const filtrando = document.querySelector('.filtrar-select')


async function coletar_dados() {
    let consulta = await fetch('/api/produtos');
    let dados = await consulta.json();
    filtrar(dados)
}

function filtrar(dados){
        const categoria = filtrando.value
        window.alert(categoria)
        printar(dados, categoria);
    };

async function printar(dados, categoria) {
    const container = document.getElementById('res');
    container.innerHTML = '';
    if(categoria == "null"){
        for (let produto of dados){
            const cardPronto = criarCardProduto(produto);
            container.appendChild(cardPronto);
        }
    }else{
        for (let produto of dados){
            if (produto.categoria == categoria){
                const cardPronto = criarCardProduto(produto)
                container.appendChild(cardPronto)
            }
        }
    }
}

filtrando.addEventListener('change', coletar_dados)
coletar_dados()

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