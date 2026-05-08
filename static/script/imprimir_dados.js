import {coletar_dados} from './search_produtos.js'


async function printar() {
    const dados = await coletar_dados();

    for (let produto of dados){
        console.log(produto.nome_produto)
        console.log(produto.categoria)
        console.log(produto.barulho)
    };
}


