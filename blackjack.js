//
// Model
//

// Innstillinger
const decksUsed = 2;

let playingTable = document.getElementById('playing-table');
let cardSize = {};
let gameSize = {};
let cardAreaHeight;

let dealerHand = [];
let playerHand = [];

let gameState = 'start';

let deck = buildDeck(decksUsed);

dealerHand.push(deck.pop());
dealerHand.push(deck.pop());
dealerHand[1].hidden = true;
console.log('Dealerhand: ' + sumHand(dealerHand));

playerHand.push(deck.pop());
playerHand.push(deck.pop());
console.log('Playerhand: ' + sumHand(playerHand));

drawGame();

//
// View
//

function drawGame() {
    // Blank ut spillet
    calcViewValues();
    playingTable.innerHTML = '';

    // Tegn hjelpelinjer
    playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight}" x2="2000" y2="${cardAreaHeight}" stroke="white" stroke-width="1">`;
    playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight * 2}" x2="2000" y2="${cardAreaHeight * 2}" stroke="white" stroke-width="1">`;
    playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight * 3}" x2="2000" y2="${cardAreaHeight * 3}" stroke="white" stroke-width="1">`;

    // Regne ut posisjonen til korta
    let totalWidth = cardSize.w + ((dealerHand.length - 1) * 40);
    let y = (cardAreaHeight - cardSize.h) / 2;
    let x = (gameSize.w / 2) - (totalWidth / 2);

    // Tegn kort til dealer
    for (card of dealerHand) {
        let onclk = 'dealerHand.push(deck.pop()); drawGame(); console.log(sumHand('Dealerhand: ' + dealerHand));';
        playingTable.innerHTML += createCard({ x, y }, { w: cardSize.w, h: cardSize.h }, card, onclk);
        x += 35;
    }

    totalWidth = cardSize.w + ((playerHand.length - 1) * 40);
    y = (cardAreaHeight * 5 - cardSize.h) / 2;
    x = (gameSize.w / 2) - (totalWidth / 2);

    // Tegn kort til spiller
    for (card of playerHand) {
        let onclk = 'playerHand.push(deck.pop()); drawGame(); console.log(sumHand('Playerhand: ' + playerHand));';
        playingTable.innerHTML += createCard({ x, y }, { w: cardSize.w, h: cardSize.h }, card, onclk);
        x += 35;
    }

    // Regne ut posisjonen til knappene
    let btn = {};
    btn.w = cardAreaHeight / 1.4;
    btn.h = btn.w;
    btn.x = (gameSize.w / 2) - (btn.w / 2);
    btn.y = (gameSize.h / 2) - (btn.h / 2);
    btn.y = (cardAreaHeight * 3.5) - (btn.h / 2)

    // Tegn knapper
    playingTable.innerHTML += `<g>
                                <rect stroke="white" stroke-width="2" fill="green"
                                        x="${btn.x}" y="${btn.y}" rx="50%"
                                        style="width:${btn.w}; height:${btn.h};"></rect>
                                <text x="${btn.x + (btn.w / 8)}" y="${btn.y + (btn.h / 1.3)}" fill="black" style="font-size:${btn.h / 1.3}px;">✋</text>
                            </g>`;
}

function drawCard() {

}

function calcViewValues() {
    gameSize.w = playingTable.clientWidth;
    gameSize.h = playingTable.clientHeight;
    cardAreaHeight = gameSize.h / 4;
    cardSize.h = cardAreaHeight * 0.9;
    cardSize.w = cardSize.h * 0.62;
}

function createCard(pos, size, card, onclickFunction) {
    let textColor = 'black';
    let bgColor = 'white';
    let sort = card.sort;
    let value = card.value;
    if (['♥', '♦'].includes(card.sort)) { textColor = 'red'; }
    if (card.hidden) {
        bgColor = 'blue';
        sort = '';
        value = '';
    }

    return `<g class="card" onclick="${onclickFunction}">
                <rect stroke="black" stroke-width="1.5" fill="${bgColor}"
                        x="${pos.x}" y="${pos.y}" rx="10"
                        style="width:${size.w}; height:${size.h};"></rect>
                <text x="${pos.x + 10}" y="${pos.y + 25}" fill="${textColor}">${sort}</text>
                <text x="${pos.x + 10}" y="${pos.y + 50}" fill="${textColor}">${value}</text>
            </g>`;
}

function deal() {
    dealerHand.push(deck.pop());
    drawGame();
}

// Range-funksjon fra Python
function range(n, m) {
    array = [];
    for (let i = n; i < m; i++) {
        array.push(i);
    }
    return array;
}