const tStamp =  '1594244037319';
const publicKey = 'ca318e6cf87496125a923886913f04db';
const criarMd5 = 'a56edaf91c07ef92a38c3369c3fbe89d';
var offset = Math.floor((Math.random() * 1500) + 1);
heroiAleatorio();

function heroiAleatorio() {

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

function pegarImagem(dados){ //dados recebidos pelo xml

    var dadosPersonagens = dados["data"]["results"];
    for (var i = 0; i < 4; i++) {    
        
        var resultado = dadosPersonagens[i];
        carta = document.querySelector("#c"+i+"");
        carta.querySelector("#caminho"+i+"").src = resultado["thumbnail"]["path"] +"."+ resultado["thumbnail"]["extension"]; //endereço da imagem
        carta.querySelector("#nome"+i+"").textContent = resultado["name"]; //return do nome
        carta.querySelector("#cod"+i+"").textContent = "Id: "+resultado["id"];
    }
}


function pegarSeries(codigo,selecao){
    
    var elementoID = document.getElementsByClassName("tituloCarta")[codigo];
    var passarId = elementoID.textContent.substring(4, 11);
    
    const urlHistoria = "https://gateway.marvel.com/v1/public/characters/"+passarId+"/"+selecao+"?ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            exibirSeries(data,codigo);
        }
    }
    http.open("GET", urlHistoria, true);
    http.send();
    }
function exibirSeries(dados,codigo){
    content = document.querySelector("#listarSeries.listarSeries"+codigo);
    var dadosPersonagens = dados["data"]["results"];
    apagar(content);

    dados["data"]["results"].forEach(element => {
            
            title = document.createElement("div");
            title.textContent = element["title"];
            content.appendChild(title);
            console.log("first"+content.firstChild);
        
           
        });
        
        

    }
function apagar(content){
    while (content.firstChild) {
        content.removeChild(content.firstChild);
        console.log("removendo");
    }
}
