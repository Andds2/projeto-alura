const color = [
    [1, '#040506'], [2, '#f46709'], [3, '#900fa6'], [4, '#84a59d'], [5, '#bb9457'],
    [6, '#f0a6ca'], [7, '#ffe066'], [8, '#8e7dbe'], [9, '#6d2e46'], [10, '#3772ff'],
    [11, '#2dc653'], [12, '#2f0e07'], [13, '#023436'], [14, '#546d64'], [15, '#2f184b'],
    [16, '#f4effa'], [17, '#1efc1e'], [18, '#f50f0f'], [19, '#8f857b'], [20, '#4c566a'],
    [21, '#3498db'], [22, '#f1c40f'], [23, '#e74c3c'], [24, '#34495e'], [25, '#2ecc71'],
    [26, '#9b59b6'], [27, '#1abc9c'], [28, '#e67e22'], [29, '#d35400'], [30, '#c0392b'],
    [31, '#7f8c8d'], [32, '#95a5a6'], [33, '#cafc92'], [34, '#55efc4'], [35, '#607d8b'],
    [36, '#16a085'], [37, '#27ae60'], [38, '#2980b9'], [39, '#8e44ad'], [40, '#7d3c98'],
];

const button_color = document.getElementById('button-color');
const input_color = document.getElementById('input-color');
const div_color = document.getElementById('div-color');
const div_color_guess = document.getElementById('div-color-guess');
const btn_start = document.getElementById('btn-start');
const content_try = document.getElementById('content-try');
const show_try = document.getElementById('show-try');

let set_color_guess;
let id_color_guess;
let color_correct = [];
let chances = 0;

button_color.addEventListener('click', () => guess_color(set_color_guess));
btn_start.addEventListener('click', () => set_color_guess = desafio_select(color));

const guess_color = (set_color_guess) => {
    let color_value = input_color.value;
    color_value = '#' + color_value;

    div_color_guess.style.backgroundColor = color_value;

    const anls_color = sep_num(color_value);
    const anls_guess = sep_num(set_color_guess);
    const div = document.createElement('div');

    div.classList.add('result-try');

    for (let i = 0; i < 6; i++) {
        if (anls_color[i] == anls_guess[i]) {
            div.appendChild(show_result(String(anls_color[i]), 'o', 'c'));
        }
        else if (anls_color[i] < anls_guess[i]) {
            if (anls_guess[i] - anls_color[i] <= 4) {
                div.appendChild(show_result(String(anls_color[i]), '+', 'w'));
            }
            else {
                div.appendChild(show_result(String(anls_color[i]), '+', 'f'));
            }
        }
        else if (anls_color[i] > anls_guess[i]) {
            if (anls_color[i] - anls_guess[i] <= 4) {
                div.appendChild(show_result(String(anls_color[i]), '-', 'w'));
            }
            else {
                div.appendChild(show_result(String(anls_color[i]), '-', 'f'));
            }
        }
    }

    content_try.appendChild(div);

    if (color_value.toLowerCase() === set_color_guess.toLowerCase()) {
        alert('Parabens, você acertou');
        color_correct.push(id_color_guess);
        chances = 0;
    } else if (chances !== 4) {
        let show_try_result = Number(show_try.textContent);
        chances += 1;
        show_try_result = show_try_result - 1;
        show_try.textContent = String(show_try_result);
    } else {
        alert('Você perdeu!');
        set_color_guess = desafio_select(color);
        chances = 0;
        show_try.textContent = '5';
    }
};

const desafio_select = (color) => {
    div_color_guess.style.backgroundColor = 'transparent';
    content_try.innerHTML = '';
    show_try.textContent = '5';
    chances = 0;
    const nDesf = random(1, 10);
    let colorhex = '';
    color.forEach(([id, hexcolor]) => {
        if (nDesf === id && !color_correct.includes(nDesf)) {
            div_color.style.backgroundColor = hexcolor;
            colorhex = hexcolor;
            id_color_guess = id;
        }
    });
    btn_start.textContent = 'Novo Desafio';
    return colorhex;
};

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sep_num = (colorhex) => {
    const anls_colorhex = colorhex.split('');
    let anls_colorhex_num = [];
    for (let i = 1; i < 7; i++) {
        switch (anls_colorhex[i].toLowerCase()) {
            case 'a':
                anls_colorhex_num.push(10);
                break;
            case 'b':
                anls_colorhex_num.push(11);
                break;
            case 'c':
                anls_colorhex_num.push(12);
                break;
            case 'd':
                anls_colorhex_num.push(13);
                break;
            case 'e':
                anls_colorhex_num.push(14);
                break;
            case 'f':
                anls_colorhex_num.push(15);
                break;
            default:
                anls_colorhex_num.push(Number(anls_colorhex[i]));
                break;
        }
    }
    return anls_colorhex_num;
};

const show_result = (color_value, status, status_class) => {
    switch (color_value) {
        case '10':
            color_value = 'A';
            break;
        case '11':
            color_value = 'B';
            break;
        case '12':
            color_value = 'C';
            break;
        case '13':
            color_value = 'D';
            break;
        case '14':
            color_value = 'E';
            break;
        case '15':
            color_value = 'F';
            break;
    }
    const subdiv = document.createElement('div');
    subdiv.classList.add('index-result-try');
    subdiv.classList.add(status_class);
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    h2.textContent = String(color_value);
    h3.textContent = status;
    subdiv.appendChild(h2);
    subdiv.appendChild(h3);
    return subdiv;
};

input_color.addEventListener('input', () => {
    input_color.value = input_color.value.replace(/[^0-9a-fA-F]/g, '');
});