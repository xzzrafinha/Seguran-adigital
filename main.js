/*
INTEGRANTES:
Marcos Gabriel Gabardo
Maria Rafaela Cardoso da Silva
TURMA: 3ª Série J
*/
const campoSenha = document.querySelector("#campo-senha");
const numeroSenha = document.querySelector("#numero-senha");

const maiusculo = document.querySelector("#maiusculo");
const minusculo = document.querySelector("#minusculo");
const numero = document.querySelector("#numero");

const textoForca = document.querySelector("#texto-forca");
const barraForca = document.querySelector("#barra-forca");


const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";


let tamanhoSenha = 8;


// ========================================
// GERAR SENHA
// ========================================

function geraSenha() {

    let alfabeto = "";

    if (maiusculo.checked) {
        alfabeto += letrasMaiusculas;
    }

    if (minusculo.checked) {
        alfabeto += letrasMinusculas;
    }

    if (numero.checked) {
        alfabeto += numeros;
    }


    if (alfabeto === "") {

        campoSenha.value = "";

        textoForca.textContent = "Selecione uma opção";

        barraForca.style.width = "0%";

        return;
    }


    let senha = "";


    // Garante pelo menos um caractere
    // de cada categoria selecionada

    if (maiusculo.checked) {

        senha += letrasMaiusculas[
            Math.floor(
                Math.random() * letrasMaiusculas.length
            )
        ];

    }


    if (minusculo.checked) {

        senha += letrasMinusculas[
            Math.floor(
                Math.random() * letrasMinusculas.length
            )
        ];

    }


    if (numero.checked) {

        senha += numeros[
            Math.floor(
                Math.random() * numeros.length
            )
        ];

    }


    // Completa a senha

    while (senha.length < tamanhoSenha) {

        const aleatorio = Math.floor(
            Math.random() * alfabeto.length
        );

        senha += alfabeto[aleatorio];

    }


    // Embaralha

    senha = senha
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");


    campoSenha.value = senha;


    atualizarForca(senha);
}


// ========================================
// MEDIR FORÇA
// ========================================

function atualizarForca(senha) {

    let pontos = 0;


    if (senha.length >= 8) {
        pontos++;
    }

    if (senha.length >= 12) {
        pontos++;
    }

    if (senha.length >= 16) {
        pontos++;
    }


    if (/[A-Z]/.test(senha)) {
        pontos++;
    }

    if (/[a-z]/.test(senha)) {
        pontos++;
    }

    if (/[0-9]/.test(senha)) {
        pontos++;
    }


    // Penaliza sequências simples

    if (
        senha.includes("12345") ||
        senha.includes("23456") ||
        senha.includes("34567") ||
        senha.includes("45678") ||
        senha.includes("abcdef") ||
        senha.includes("ABCDEF")
    ) {

        pontos--;

    }


    // Classificação

    if (pontos <= 2) {

        textoForca.textContent = "Muito fraca";

        barraForca.style.width = "20%";

        barraForca.className = "muito-fraca";

    }

    else if (pontos <= 4) {

        textoForca.textContent = "Fraca";

        barraForca.style.width = "40%";

        barraForca.className = "fraca";

    }

    else if (pontos <= 5) {

        textoForca.textContent = "Média";

        barraForca.style.width = "60%";

        barraForca.className = "media";

    }

    else if (pontos <= 6) {

        textoForca.textContent = "Forte";

        barraForca.style.width = "80%";

        barraForca.className = "forte";

    }

    else {

        textoForca.textContent = "Muito forte";

        barraForca.style.width = "100%";

        barraForca.className = "muito-forte";

    }

}


// ========================================
// DIMINUIR
// ========================================

function diminuiTamanho() {

    if (tamanhoSenha > 8) {

        tamanhoSenha--;

    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


// ========================================
// AUMENTAR
// ========================================

function aumentaTamanho() {

    if (tamanhoSenha < 20) {

        tamanhoSenha++;

    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


// ========================================
// ATUALIZA QUANDO ALTERAR OPÇÕES
// ========================================

maiusculo.addEventListener("change", geraSenha);

minusculo.addEventListener("change", geraSenha);

numero.addEventListener("change", geraSenha);


// ========================================
// PRIMEIRA SENHA
// ========================================

geraSenha();