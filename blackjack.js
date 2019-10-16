//
// Model
//

// Innstillinger
const decksUsed = 2;

let playingTable = document.getElementById('playing-table');
let cardSize = {};
// let dealerPos = { x: 300, y: 20 };
// let playerPos = { x: 300, y: 500 };
let gameSize = {};
let cardAreaHeight;

let dealerHand = [];
let playerHand = [];

let gameState = 'start';

let deck = buildDeck(decksUsed);
deck = shuffle(deck);
//dealerHand.push(draw(deck));

//dealCardsToPlayer();
calcBaseDealerPos();

//
// View
//

function dealCardsToPlayer() {

    let cardPos = playerPos;
    for (let i = 0; i < 3; i++) {
        playingTable.innerHTML += createCard(cardPos, "K");
        cardPos.x += 40;
    }
}

function deal() {
    playerHand.push(draw(deck));
}

function calcViewValues() {
    gameSize.w = playingTable.clientWidth;
    gameSize.h = playingTable.clientHeight;
    cardAreaHeight = gameSize.h / 3;
    cardSize.h = cardAreaHeight * 0.9;
    cardSize.w = cardSize.h * 0.62;
}

function calcBaseDealerPos() {
    calcViewValues();
    let y = (cardAreaHeight - cardSize.h) / 2;
    let x = (gameSize.w / 2) - (cardSize.w / 2);
    playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight}" x2="2000" y2="${cardAreaHeight}" stroke="white" stroke-width="1">`;
    playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight * 2}" x2="2000" y2="${cardAreaHeight * 2}" stroke="white" stroke-width="1">`;

    dealCard({ x, y }, { w: cardSize.w, h: cardSize.h }, draw(deck));
    dealCard({ x: x + 40, y }, { w: cardSize.w, h: cardSize.h }, draw(deck));
}

function dealCard(pos, size, card) {
    playingTable.innerHTML += createCard(pos, size, card);
}

function createCard(pos, size, card) {
    let color = 'black';
    if (['♥', '♦'].includes(card.sort)) color = 'red';
    return `<g>
                <rect class="card" stroke="black" stroke-fill="1" fill="white"
                        x="${pos.x}" y="${pos.y}"
                        style="width:${size.w}; height:${size.h};"></rect>
                <text x="${pos.x + 10}" y="${pos.y + 25}" fill="${color}">${card.sort}</text>
                <text x="${pos.x + 10}" y="${pos.y + 50}" fill="${color}">${card.value}</text>
            </g>`;
}

function draw(deck) {
    return deck.pop();
}

function sumHand(hand) {
    let sum = 0;
    let aces = 0;
    for (card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) { sum += 10; }
        else if (card.value === 'A') { aces++; }
        else { sum += parseInt(card.value); }
    }
    for (ace of range(0, aces)) {
        if (sum + 11 > 21) sum++;
        else sum += 11;
    }
    return sum;
}

function buildDeck(n) {
    let deck = [];
    for (let i of range(0, n)) {
        for (sort of ['♠', '♥', '♦', '♣']) {
            for (let value of range(2, 11)) {
                deck.push({ sort, value: value.toString() });
            }
            for (let value of ['J', 'Q', 'K', 'A']) {
                deck.push({ sort, value });
            }
        }
    }
    return deck;
}

// Fisher-Yates shuffle
function shuffle(array) {
    let t, i;
    let m = array.length;
    // While there remain elements to shuffle...
    while (m) {
        // Pick a remaining element...
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

// Range funksjon fra Python
function range(n, m) {
    array = [];
    for (let i = n; i < m; i++) {
        array.push(i);
    }
    return array;
}