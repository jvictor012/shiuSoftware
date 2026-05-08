async function coletar_dados() {
    let consulta = await fetch('/api/produtos');
    let dados = await consulta.json();
    return dados
}


async function printar() {
    console.log("Iniciando a função printar..."); // TESTE 1
    const dados = await coletar_dados();
    console.log("Dados recebidos:", dados);      // TESTE 2

    for (let produto of dados){
        console.log(produto.nome_produto)
        console.log(produto.categoria)
        console.log(produto.barulho)
    };
}

printar();