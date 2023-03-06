'use strict';

// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// Superbonus 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// Superbonus 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste. -->


// ---------- FUNCTIONS ----------
// Random function
function randomNumber(min, max) {
    let random = Math.floor(Math.random() * ((max + 1) - min)) + min;
    return random;
}


// Creiamo la funzione per creare le varie celle
function myCreateElement(htmlElement, htmlValue, punteggioMax) {
    const element = document.createElement('div');
    element.className = 'cell';
    htmlElement.append(element);
    element.addEventListener('click', function () {
        element.classList.add('selected');
        element.innerText = htmlValue;
        // Facciamo aumentare lo score di 1 ogni click
        score++;
        // Stampiamo nel Dom HTML il punteggio
        document.querySelector(".col-center").innerHTML = `Score: ${score}`;

        // Condizione di vittoria o sconfitta
        if (arrayBombs.includes(htmlValue)) {
            element.classList.add('red');
            // Stampiamo nel Dom sconfitta+punteggio
            document.querySelector(".col-center").innerHTML = `Hai perso! Il tuo punteggio è di: ${score - 1}`;
            alert('Hai perso! Ricomincia la partita');
            // SUPERBONUS 1 : facciamo scomparire nell'html il container una volta terminata la partita
            //  containerBoard.innerHTML = '';

        } else if (score === punteggioMax) {
            // Stampiamo nel Dom vittoria+punteggio
            document.querySelector(".col-center").innerHTML = `Hai Vinto! Il tuo punteggio è di: ${score}`;
        }
        return element;
    })
};

// ---------- FUNCTIONS ----------

// ---------- MAIN ----------
// Dichiariamo un array che conterrà le bombe e una variabile che sarà invece il punteggio iniziale
let score = 0;
let arrayBombs = [];

// seleziono il bottone che farà partire l'evento
const pressHere = document.getElementById('difficolta');
//seleziono il container dentro al main che conterrà le diverse celle
const containerBoard = document.querySelector('.board');
// Selezioniamo le varie difficoltà
const game = document.getElementById("gamemode");
const gameValue = game.value;
// evento al click del bottone che genererà tot celle
pressHere.addEventListener('click', function () {
    containerBoard.innerHTML = '';
    arrayBombs = [];
    //reset score
    if (game.value === 'easy') {
        // Score allo start
        score = 0;
        const punteggioMax = 84;
        for (let i = 1; i <= 100; i++) {
            myCreateElement(containerBoard, i, punteggioMax)
            containerBoard.className = 'easy d-flex';
        }
        while (arrayBombs.length < 16) {
            const randomBomb = randomNumber(1, 100);
            if (!(arrayBombs == randomBomb)) {
                arrayBombs.push(randomBomb);
            }
        }
    } else if (game.value === 'medium') {
        const punteggioMax = 65;
        for (let i = 1; i <= 81; i++) {
            myCreateElement(containerBoard, i, punteggioMax)
            containerBoard.className = 'medium d-flex';
        }
        while (arrayBombs.length < 16) {
            const randomBomb = randomNumber(1, 81);
            if (!(arrayBombs == randomBomb)) {
                arrayBombs.push(randomBomb);
            }
        }
    } else {
        const punteggioMax = 33;
        for (let i = 1; i <= 49; i++) {
            myCreateElement(containerBoard, i, punteggioMax)
            containerBoard.className = 'hard d-flex';
        }
        while (arrayBombs.length < 16) {
            const randomBomb = randomNumber(1, 49);
            if (!(arrayBombs == randomBomb)) {
                arrayBombs.push(randomBomb);
            }
        }
    }
});
