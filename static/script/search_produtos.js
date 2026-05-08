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
    
    for (let produto of dados){
        if (produto.categoria == categoria){
            let novaDiv = document.createElement('div');
            novaDiv.innerHTML = produto.nome_produto
            document.getElementById('res').appendChild(novaDiv);

        } else {
        let novaDiv = document.createElement('div');
        let image = document.createElement('img')

        novaDiv.classList.add('card');
        novaDiv.innerHTML = produto.nome_produto
        image.src = produto.link_imagem

        document.getElementById('res').appendChild(image)
        document.getElementById('res').appendChild(novaDiv);};
    };
}
filtrando.addEventListener('change', coletar_dados)