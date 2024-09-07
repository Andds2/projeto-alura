const cardsID = [
    'a1','b1','c1','d1','e1','f1',
    'a2','b2','c2','d2','e2','f2',
    'a3','b3','c3','d3','e3','f3',
    'a4','b4','c4','d4','e4','f4',
    'a5','b5','c5','d5','e5','f5',
    'a6','b6','c6','d6','e6','f6',
]

const errosShow = document.getElementById('erros')

let lastCard = 'a1'
let pontuacao = 0
let erros = 0

cardsID.forEach(idCard => {
    const card = document.getElementById(idCard)
    if(card) card.addEventListener('click', () => selected(idCard))
})

const selected = (id) => {
    const sCard = document.getElementById(id)
    const nsCard = document.getElementById(lastCard)

    let maior, menor

    if(Number(sCard.value) > Number(nsCard.value)) {
        maior = Number(sCard.value)
        menor = Number(nsCard.value)
    } else {
        maior = Number(nsCard.value)
        menor = Number(sCard.value)
    }

    if(maior + menor == menor * 2 + 0.1){
        sCard.classList.add('correct')
        nsCard.classList.add('correct')
        pontuacao++
    }
    else{
        if(!sCard.classList.contains('correct'))
        {
            if(id != lastCard){
                nsCard.classList.remove('selected')
            }
            if (sCard.classList.contains('selected')){
                sCard.classList.remove('selected')
                
            } else { 
                sCard.classList.add('selected')
                lastCard = id
                erros++
            }
        }
    }

    errosShow.textContent = erros - 1

    if (pontuacao == 18){
        startTimer()
        alert('Parabéns, você ganhou!')
    }
}

window.onload = function() {
    embaralhar()
}

const embaralhar = () => {
    var game = document.getElementById('memory-game')
    for (var i = game.children.length; i >= 0; i--) {
        game.appendChild(game.children[Math.random() * i | 0])
    }

}

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTimer, 1000);
        running = true;
        startButton.textContent = "Pausar";
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.textContent = "Iniciar";
    }
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeDisplay.textContent = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
}

startButton.addEventListener('click', startTimer);

const restart = document.getElementById('restart')

restart.addEventListener('click', () => window.location.reload())

const btn_voltar = document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = "../../index.html"
})