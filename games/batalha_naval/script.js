const btns_meus = document.querySelectorAll('#btn-meus-navios')
const btns_inimigo = document.querySelectorAll('#btn-navios-inimigo')
const navio_count = document.querySelectorAll('#navio-count')

const btn_iniciar = document.getElementById('btn-iniciar')
const btn_restart = document.getElementById('btn-restart')
const btn_modal = document.getElementById('info')
const modalcontent = document.getElementById('modal')

const show_tentativas = document.getElementById('tentativas')
const show_pontosC = document.getElementById('com-pontos')
const show_pontosP = document.getElementById('ply-pontos')
const show_resultado = document.getElementById('resultado-game')

let count_meus_navios = 4
let count_navios_inimigo = 4
let statusJogo = 0
let tentativas = 6
let pontosC = 0
let pontosP = 0

let ataques = []

let meus_navios = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

let navios_inimigos = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

const posicionarMeuNavio = (btn, row, col) => {
    if(statusJogo === 0){
        if (count_meus_navios != 0 && meus_navios[row][col] === 0){
            btn.innerHTML = '<i class="fa-solid fa-ship"></i>'
            count_meus_navios -= 1
            meus_navios[row][col] = 1
            navio_count[count_meus_navios].classList.add('selected')
        } else if (meus_navios[row][col] === 1){
            meus_navios[row][col] = 0
            btn.innerHTML = '<i class="fa-solid fa-water"></i>'
            navio_count[count_meus_navios].classList.remove('selected')
            count_meus_navios += 1
        }
    }
}

const posicionarNaviosInimgo = () => {
    for(let i = 0; i < 4; i++){
        let loop = true
    
        while(loop){
            const col = random(0, 3)
            const row = random(0, 3)
            if(count_navios_inimigo != 0 && navios_inimigos[row][col] === 0){
                navios_inimigos[row][col] = 1
                loop = false
                count_navios_inimigo--
            }
        }
    }
}

const atacar = (btn, row, col) =>{
    if(statusJogo === 1){
        tentativas -= 1

        if(navios_inimigos[row][col] === 1){
            btn.innerHTML = '<i class="fa-solid fa-ship"></i>'
            btn.classList.add('navio-inimigo')
            count_navios_inimigo += 1
            pontosP += 1
        } else if(navios_inimigos[row][col] === 0){
            btn.classList.add('agua-inimiga')
        }

        contraAtaque()

        if(count_navios_inimigo === 4){
            resultado(pontosP, pontosC)
            statusJogo = 2
        } else if(count_meus_navios === 4){
            resultado(pontosP, pontosC)
            statusJogo = 2
        } else if (tentativas === 0){
            resultado(pontosP, pontosC)
            statusJogo = 2
        }
    
    }

    show_tentativas.textContent = String(tentativas)
    placar()
}

const contraAtaque = () => {
    let loop = true
    let index = 0

    while(loop){
        index = random(0, 15)

        if(!ataques.includes(index)){
            ataques.push(index)
            loop = false
        }
    }

    const btn = btns_meus[index]
    const row = Math.floor(index / 4)
    const col = index % 4

    if(meus_navios[row][col] === 1){
        btn.innerHTML = '<i class="fa-solid fa-ship"></i>'
        btn.classList.add('navio-amigo')
        count_meus_navios += 1
        pontosC += 1
    } else if(meus_navios[row][col] === 0){
        btn.classList.add('agua-amiga')
    }
}

const placar = () => {
    show_pontosC.textContent = String(pontosC)
    show_pontosP.textContent = String(pontosP)
}

const resultado = (pP, pC) => {
    if(pP === 4 || pC < pP){
        show_resultado.textContent = 'Você venceu, parabéns :)'
    } else if (pC == 4 || pC > pP) {
        show_resultado.textContent = 'Computador venceu :('
    } else {
        show_resultado.textContent = 'Deu empate :/'
    }
}

const restart = () => {
    count_meus_navios = 4
    count_navios_inimigo = 4
    statusJogo = 0
    tentativas = 6
    pontosC = 0
    pontosP = 0

    placar()

    ataques = []

    meus_navios = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    navios_inimigos = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for(let i = 0; i < 16; i++){
        btns_inimigo[i].classList.remove('agua-inimiga')
        btns_inimigo[i].classList.remove('navio-inimigo')
        btns_inimigo[i].innerHTML = '<i class="fa-solid fa-water"></i>'
        btns_meus[i].classList.remove('agua-amiga')
        btns_meus[i].classList.remove('navio-amigo')
        btns_meus[i].innerHTML = '<i class="fa-solid fa-water"></i>'
    }

    for(let i = 0; i < 4; i++){
        navio_count[i].classList.remove('selected')
    }

    show_resultado.textContent = 'AGUARDANDO JOGADOR...'
    show_tentativas.textContent = '6'
    
    btn_iniciar.style.display = 'block'
    btn_restart.style.display = 'none'
}

const openModal = () => modalcontent.style.display = 'flex'
const closeModal = () => modalcontent.style.display = 'none'


const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

btns_meus.forEach((btn, index) => {
    const row = Math.floor(index / 4)
    const col = index % 4

    btn.addEventListener('click', () => posicionarMeuNavio(btn, row, col))
})

btn_iniciar.addEventListener('click', () => {
    if(count_meus_navios === 0){
        posicionarNaviosInimgo()
        statusJogo = 1
        btn_iniciar.style.display = 'none'
        btn_restart.style.display = 'block'
        show_resultado.textContent = 'JOGO EM ANDAMENTO...'
    } else {
        alert('Posicione todos os 4 navios para jogar')
    }
})

btns_inimigo.forEach((btn, index) => {
    const row = Math.floor(index / 4)
    const col = index % 4

    btn.addEventListener('click', () => atacar(btn, row, col)) 
})

btn_restart.addEventListener('click', () => restart())

btn_modal.addEventListener('click', () => openModal())
modalcontent.addEventListener('click', () => closeModal())