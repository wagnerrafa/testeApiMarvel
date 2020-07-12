const tStamp =  '1594244037319';
const publicKey = 'ca318e6cf87496125a923886913f04db';
const criarMd5 = 'a56edaf91c07ef92a38c3369c3fbe89d';
var offset = Math.floor((Math.random() * 1500) + 1);
heroiAleatorio();

function heroiAleatorio() { //funcao para pegar um heroi aleatorio

    const url = "http://gateway.marvel.com/v1/public/characters?limit=4&offset="+offset+"&ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            pegarImagem(data);
        }
    }
    http.open("GET", url, true);
    http.send();    

}

function pegarImagem(dados){ //funcao para receber os dados do heroi e retornar a imagem, nome e id
    var dadosPersonagens = dados["data"]["results"];
    console.log(dados["data"]["results"]);

    for (var i = 0; i < 4; i++) {    
        
        var resultado = dadosPersonagens[i];
        carta = document.querySelector("#c"+i+"");
        carta.querySelector("#caminho"+i+"").src = resultado["thumbnail"]["path"] +"."+ resultado["thumbnail"]["extension"]; //endereço da imagem
        carta.querySelector("#nome"+i+"").textContent = resultado["name"]; //return do nome description
        carta.querySelector("#cod"+i+"").textContent = "Id: "+resultado["id"];
        carta.querySelector("#descricao"+i+"").textContent = "Descrição: "+resultado["description"];
        console.log(resultado["description"].length);
        if(resultado["description"].length<=0){
            carta.querySelector("#descricao"+i+"").textContent = "Descrição: Não há informações sobre esse personagem";        }
        
    }
}


function pegarSeries(codigo,selecao){ //funcao para pegar as series, historias e eventos do heroi
    
    var elementoID = document.getElementsByClassName("tituloCarta")[codigo];
    var passarId = elementoID.textContent.substring(4, 11);
    
    const urlHistoria = "https://gateway.marvel.com/v1/public/characters/"+passarId+"/"+selecao+"?ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            exibirSeries(data,codigo);
            console.log("exibir series"+data);
        }
    }
    http.open("GET", urlHistoria, true);
    http.send();
    }
function exibirSeries(dados,codigo){ //funcao para criar a lista de series, historias e eventos
    content = document.querySelector("#listarSeries.listarSeries"+codigo);
  
    apagar(content);
    console.log("dados   "+dados["data"]["results"]);
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
function apagar(content){ //funcao para apagar as listas
    while (content.firstChild) {
        content.removeChild(content.firstChild);
        console.log("removendo");
    }
}
function mudarCor(cor){
    // document.getElementById('cod1').className = 'newclass';
    document.getElementById("c"+cor).className = 'newclass';
    abrirDescricao(cor);
    apagar(content);

}

function abrirDescricao(cor) {
    var navMenu = document.querySelector('.menu-container'+cor);
    navMenu.classList.toggle('menu-ativo');
}
function voltar(volta){
    document.getElementById("c"+volta).className = 'carta';
    console.log("corr      "+cor);
    abrirDescricao(cor);
}
