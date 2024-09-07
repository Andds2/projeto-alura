const btns_game = document.querySelectorAll('#btn-game')
const show_jogador = document.getElementById('jogador')
const status_game = document.getElementById('status-game')
const select_mode = document.getElementById('mode-select')
const iniciar = document.getElementById('iniciar')

let jogador = 'X'
let statusJogo = false
let modojogo = ''

let game = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const jogada = (button, row, col) => {
    row = parseInt(row)
    col = parseInt(col)

    if(game[row][col] == '' && statusJogo == true && modojogo != ''){
        button.textContent = jogador
        game[row][col] = jogador

        if(resultado(jogador)){
            status_game.textContent = `VITORIA DO JOGADOR ${jogador}`

            statusJogo = false
        } else if (empate()) {
            status_game.textContent = `DEU VELHA :/`
            statusJogo = false
        } else {
            if(jogador == 'X') jogador = 'O'
            else if(jogador == 'O') jogador = 'X'
        }
    } 

    if(jogador === 'O' && modojogo === 'pvc'){
        computer()
    }
    show_jogador.textContent = jogador
}


const resultado = (jogador) => {
    const celulasVencedora = []

    for(let i = 0; i < 3; i++){
        if (game[i][0] === jogador && game[i][1] === jogador && game[i][2] === jogador){
            celulasVencedora.push(i*3, i*3+1, i*3+2)
            showVitoria(celulasVencedora)

            return true
        }
        if (game[0][i] === jogador && game[1][i] === jogador && game[2][i] === jogador){
            celulasVencedora.push(i, i+3, i+6)
            showVitoria(celulasVencedora)
            
            return true
        }
    }
    if (game[0][0] === jogador && game[1][1] === jogador && game[2][2] === jogador){
        celulasVencedora.push(0, 4, 8)
        showVitoria(celulasVencedora)
        
        return true
    }
    if (game[0][2] === jogador && game[1][1] === jogador && game[2][0] === jogador){
        celulasVencedora.push(2, 4, 6)
        showVitoria(celulasVencedora)

        return true
    }
    
    return false
}

const showVitoria = (celulas) => {
    btns_game[celulas[0]].classList.add('vencedor')
    btns_game[celulas[1]].classList.add('vencedor')
    btns_game[celulas[2]].classList.add('vencedor')
}

const empate = () =>{
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(game[i][j] === ''){
                return false
            }
        }
    }

    return true
}

const computer = () => {
    const index = random(0, 8)
    const btn = btns_game[index]
    const rowC = Math.floor(index / 3)
    const colC = index % 3

    jogada(btn, rowC, colC)
}

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const inicarJogo = () => {
    statusJogo = true

    game = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    btns_game.forEach(btn => {
        btn.textContent = ''
        btn.classList.remove('vencedor')
    })

    status_game.textContent = "JOGO EM ANDAMENTO..."

}

btns_game.forEach((btn, index) => {

    const row = Math.floor(index / 3)
    const col = index % 3
    console.log(index)

    btn.addEventListener('click', () => jogada(btn, row, col))
})

select_mode.addEventListener('change', () => modojogo = select_mode.value)

iniciar.addEventListener('click', () => inicarJogo())

const btn_voltar = document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = "../../index.html"
})