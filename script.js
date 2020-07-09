const tStamp =  '1594244037319';
const publicKey = 'ca318e6cf87496125a923886913f04db';
const privateKey = 'b5dd7d6f4d2b4480fdd4e39fac17314286334028';
console.log(tStamp);
const maxCharacters = 1500;
const offset = Math.floor((Math.random() * maxCharacters) + 1);

const juntarKey = tStamp + privateKey + publicKey;
const criarMd5 = 'a56edaf91c07ef92a38c3369c3fbe89d';

function heroiAleatorio() {

    const offset = Math.floor((Math.random() * maxCharacters) + 1);
    console.log(offset);
    
    const url = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+tStamp+"&apikey="+publicKey+"&hash="+criarMd5;

    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            //getImages(data); criar a funcao para obter a imagem
            console.log("aeeeee");
        }
    };
    http.open("GET", url, true);
    http.send();
}

heroiAleatorio();