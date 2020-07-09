const tStamp =  '1594244037319';
const publicKey = 'ca318e6cf87496125a923886913f04db';
const criarMd5 = 'a56edaf91c07ef92a38c3369c3fbe89d';
heroiAleatorio();
function heroiAleatorio() {

    const offset = Math.floor((Math.random() * 1500) + 1);
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

    }
}



function pegarHistoria(){

    const offset = 1010980;
    const urlHistoria = "https://gateway.marvel.com:443/v1/public/characters/"+offset+"/stories?ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;
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
