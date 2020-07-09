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
    };
    http.open("GET", url, true);
    http.send();
}

function pegarImagem(dados){ //dados recebidos pelo xml

    console.log(dados["data"]["results"]);
    var dadosPersonagens = dados["data"]["results"];

    for (var i = 0; i < 4; i++) {    
        
        var resultado = dadosPersonagens[i];
        card = document.querySelector("#c"+i+"");
        card.querySelector("#caminho"+i+"").src = resultado["thumbnail"]["path"] +"."+ resultado["thumbnail"]["extension"]; //endereço da imagem
        card.querySelector("#nome"+i+"").textContent = "Nome: "+resultado["name"]; //return do nome
    }

}