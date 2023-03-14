const form = document.getElementById('form-atividade');
const imgAprovado = '<img src ="./images/aprovado2.gif" alt="Gif celebrando" />'; //trazendo o emoji como variaveis
const imgReprovado = '<img src ="./images/reprovado2.gif" alt="Gif triste" />'; //para colocar na função
const atividades = []; // Uma array vazia para armazenar as atividades digitadas pelo usuario
const notas = []; // Outra array vazia para armazenar as notas ditidas pelo usuario que serao puxadas 
// toda vez que o adicinarLinhas for chamado tera um "push" chamando essas array.
const spanAprovado = '<span class ="resultado aprovado">Aprovado</span>'; // criando o span para mostrar o resultado 
const spanReprovado = '<span class ="resultado reprovado">Reprovado</span>'; // criando o span para mostrar o resultado 


let linhas = ''; //Elevando ao escopo global fara com que cada vez que adcionar ele salve os valores em linhas

form.addEventListener('submit', function(e){
    e.preventDefault(); //Tirar ação do submit de atualizar a tela

    adicionaLinha(); //no event vai disparar a função de adicionar uma linha
    atualizaTabela(); // e dps vai atualizar a pagina
    atualizaMediaFinal();
})

function adicionaLinha(){ //vai ter a função de adicionar uma linha na variavel "linhas"
    const inputNomeAtividade = document.getElementById('nome-atividade'); //Pegando o valor do nome
    const inputNotaAtividade = document.getElementById('nota-atividade'); //Pegando o valor da nota

    if(atividades.includes(inputNomeAtividade.value)){ //Ele vai verificar dentro da array, se tem essa atividade para evitar duplicação
        alert(`A atividade:${inputNomeAtividade.value} ja foi inserida`);

    } else { //Se nao tiver atividades iguais, vai seguir.

        atividades.push(inputNomeAtividade.value); // vamos puxar essa array que vai salvar dentro dela os valores digitado pelo usuario.
        notas.push(parseFloat(inputNotaAtividade.value)); // puxar a array de notas para armazenar os valores das notas digitada pelo usuario.
        //parsrFloat transormando a array em float, pois sem isso fica em streng e nao consegue fazer a soma dos valores.
    
        let linha = '<tr>'; //criando linha na tabela 
        linha += `<td>${inputNomeAtividade.value}</td>`; //Vai criar uma coluna com nome da atividade (+= é uma concatenação)
        linha += `<td>${inputNotaAtividade.value}</td>`; // vai criar uma coluna com o valor da nota
        linha += `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado }</td>`; // ? if : else no ternario (Ele vai receber o valor da nota e mostrar Aprovado ou reprovado)
        linha += '</tr>'; //fechando a linha
    
        linhas += linha; //Ao apertar o botao de adcionar ele vai ir "salvando" os valores 
    }
    inputNomeAtividade.value = ''; //Vai resetar os valores inseridos
    inputNotaAtividade.value = ''; 
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); // Selecionando o corpo ta tabela e atualuiza o conteudo da tabela
    corpoTabela.innerHTML = linhas; // Entao os conteudos da linha sera inserido no corpo da nossa tabela
}

function atualizaMediaFinal() {
    const mediafinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediafinal.toFixed(2); //Vai adicionar o valor da media final no html com apenas duas casas amostra 
    document.getElementById('media-final-resultado').innerHTML = mediafinal >= 7 ? spanAprovado : spanReprovado; //Dando o resultado com ternarios
}

function calculaMediaFinal() {
    let somaDasNotas = 0; //Criar um laço para realizar a media

    for(let i = 0; i < notas.length; i++){  
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length; // ele vai retornar o valor somado das notas dividido pela quantidade de notas digitadas 
}
