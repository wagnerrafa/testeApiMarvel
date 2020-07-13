const tStamp =  '1594244037319';
const publicKey = 'ca318e6cf87496125a923886913f04db';
const criarMd5 = 'a56edaf91c07ef92a38c3369c3fbe89d';
var offset = Math.floor((Math.random() * 1500) + 1);
heroiAleatorio();

function heroiAleatorio() { //funcao para pegar um heroi aleatorio
    qualfuncaoChamar = false;
    var urlHistoria = "http://gateway.marvel.com/v1/public/characters?limit=4&offset="+offset+"&ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
    qualfuncao(qualfuncaoChamar,urlHistoria);
}

function pegarImagem(dados){ //funcao para receber os dados do heroi e retornar a imagem, nome e id
    var dadosPersonagens = dados["data"]["results"];

    for (var i = 0; i < 4; i++) {    
        
        var resultado = dadosPersonagens[i];
        carta = document.querySelector("#c"+i+"");
        carta.querySelector("#caminho"+i+"").src = resultado["thumbnail"]["path"] +"."+ resultado["thumbnail"]["extension"]; //endereço da imagem
        carta.querySelector("#nome"+i+"").textContent = resultado["name"]; //return do nome description
        carta.querySelector("#cod"+i+"").textContent = "Id: "+resultado["id"];
        carta.querySelector("#descricao"+i+"").textContent = "Descrição: "+resultado["description"];
        if(resultado["description"].length<=0){
            carta.querySelector("#descricao"+i+"").textContent = "Descrição: Não há informações sobre esse personagem";        }
        
    }
}
function qualfuncao(qualfuncaoChamar,urlHistoria){
    url = urlHistoria;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if(qualfuncaoChamar== true){
                exibirSeries(data,codigo);

            }else{
                pegarImagem(data);

            }

        }
    }
    http.open("GET", urlHistoria, true);
    http.send();

}

function pegarSeries(codigo,selecao){ //funcao para pegar as series, historias e eventos do heroi
    
    var elementoID = document.getElementsByClassName("tituloCarta")[codigo];
    var passarId = elementoID.textContent.substring(4, 11);
    var qualfuncaoChamar = true;
    var urlHistoria = "https://gateway.marvel.com/v1/public/characters/"+passarId+"/"+selecao+"?ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
    qualfuncao(qualfuncaoChamar,urlHistoria);
  
    }
function exibirSeries(dados,codigo){ //funcao para criar a lista de series, historias e eventos
    content = document.querySelector("#listarSeries.listarSeries"+codigo);
  
    apagar();
    let coisasPersonagens = dados["data"]["results"];
    if(coisasPersonagens.length <=0){
        title = document.createElement("div");
            title.textContent = "Não existe nada até hoje";
            content.appendChild(title);
    }
   
    dados["data"]["results"].forEach(element => {
            
            title = document.createElement("div");
            title.textContent = element["title"];
            content.appendChild(title);
           
        });
    }
function apagar(){ //funcao para apagar as listas
    content = document.querySelector("#listarSeries.listarSeries"+codigo);
     while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}
function mudarCor(cor){

    document.getElementById("c"+cor).className = 'newclass';
    abrirDescricao(cor);
    apagar();

}

function abrirDescricao(cor) {
    var navMenu = document.querySelector('.menu-container'+cor);
    navMenu.classList.toggle('menu-ativo');
}
function voltar(volta){
    document.getElementById("c"+volta).className = 'carta';
    verificarAtivo();

}
function verificarAtivo(){
    var navMenuTeste = document.querySelector('.menu-ativo');

    if(navMenuTeste !=null){
    var volta = navMenuTeste.className[14];

    navMenuTeste.className = 'menu-container'+volta;
    navMenuTeste.classList.remove('menu-ativo');
    voltar(volta);
    }
}

