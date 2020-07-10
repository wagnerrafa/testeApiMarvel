const tStamp =  '1594244037319';
const publicKey = 'ca318e6cf87496125a923886913f04db';
const criarMd5 = 'a56edaf91c07ef92a38c3369c3fbe89d';
var offset = Math.floor((Math.random() * 1500) + 1);

heroiAleatorio();

function heroiAleatorio() {

    // const offset = Math.floor((Math.random() * 1500) + 1);
    console.log(offset);

    const url = "http://gateway.marvel.com/v1/public/characters?limit=4&offset="+offset+"&ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            pegarImagem(data);
            console.log("aeeeee");
        }
    }
    http.open("GET", url, true);
    http.send();    

}

function pegarImagem(dados){ //dados recebidos pelo xml

    console.log(dados["data"]["results"]);
    var dadosPersonagens = dados["data"]["results"];
    console.log(dadosPersonagens);

    for (var i = 0; i < 4; i++) {    
        
        var resultado = dadosPersonagens[i];
        carta = document.querySelector("#c"+i+"");
        carta.querySelector("#caminho"+i+"").src = resultado["thumbnail"]["path"] +"."+ resultado["thumbnail"]["extension"]; //endereço da imagem
        carta.querySelector("#nome"+i+"").textContent = "Nome: "+resultado["name"]; //return do nome
        carta.querySelector("#cod"+i+"").textContent = "Id: "+resultado["id"];
 

    }
}


function pegarHistoria(elemento){
    console.log(offset);
    var teste = document.getElementsByClassName("card-title").cod1
    var teste2 = teste.textContent.substring(4, 11);
    console.log(teste2);
    //const offset2 = 1009287;

    const urlHistoria = "https://gateway.marvel.com/v1/public/characters/"+teste2+"/stories?ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            exibirHistoria(data);
            console.log("aeeeee");
        }
    }

    http.open("GET", urlHistoria, true);
    http.send();
    return offset;
    }

function exibirHistoria(dados){
    content = document.querySelector("#listarSeries");

    console.log(dados["data"]["results"]);
    var dadosPersonagens = dados["data"]["results"];
    console.log("aeeeoooeaa"+dadosPersonagens);
    
    dados["data"]["results"].forEach(element => {
        
            title = document.createElement("a");
            title.textContent = element["title"];
            content.appendChild(title);
            // for (var i = 0; i < 4; i++) {    
        
            //     var resultado = dadosPersonagens[i];
            //     carta = document.querySelector("#c"+i+"");
            //     carta.querySelector("#serie"+i+"").textContent = "Séries: "+resultado["title"]; //return do nome
            // }
        });
    
}
