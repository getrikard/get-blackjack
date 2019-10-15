const decksUsed = 2;

let playingTable = document.getElementById('playing-table');
let cardHeight = 200;
let cardWidth = 150;
let dealerPos = { x: 300, y: 20 };
let playerPos = { x: 300, y: 500 };

let dealerHand = [];
let playerHand = [];

let gameState = 'start';

let deck = buildDeck(decksUsed);
deck = shuffle(deck);
dealerHand.push(draw(deck));

//dealCardsToPlayer();
calcBaseDealerPos();

function drawGame() {
    drawButtons();
}

function drawButtons() {

}

function resetGame() {

}

function dealCardsToPlayer() {

    let cardPos = playerPos;
    for (let i = 0; i < 3; i++) {
        playingTable.innerHTML += createCard(cardPos, "K");
        cardPos.x += 40;
    }
}

function deal() {
    playerHand += draw(deck);
}

function calcBaseDealerPos() {
    let game_w = playingTable.clientWidth;
    let game_h = playingTable.clientHeight;
    cardAreaHeight = game_h / 3;
    cardHeight = cardAreaHeight * 0.9;
    cardWidth = cardHeight * 0.62;
    let y = (cardAreaHeight - cardHeight) / 2;
    let x = (game_w / 2) - (cardWidth / 2);
    playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight}" x2="2000" y2="${cardAreaHeight}" stroke="white" stroke-width="1">`;
    playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight * 2}" x2="2000" y2="${cardAreaHeight * 2}" stroke="white" stroke-width="1">`;

    dealCard({ x, y }, { w: cardWidth, h: cardHeight }, "K");
}

function dealCard(pos, size, value) {
    playingTable.innerHTML += createCard(pos, size, value);
}

function createCard(pos, size, value) {
    return `<g>
                <rect class="card" stroke="black" stroke-fill="1" fill="white" x="${pos.x}" y="${pos.y}"
                        style="width:${size.w}; height:${size.h};"></rect>
                <text x="${pos.x + 10}" y="${pos.y + 25}" fill="black">${value}</text>
            </g>`;
}

function hit() { }

function fold() { }

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

function buildDeckAlt(n) {
    const cards = "🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃜🃝🃞";
    for (let i of range(0, n)) {
        for (card of cards) {
            deck.push(card);
        }
    }
}

function getUnicode(card) {
    if (card.sort === '♠') {
        if (card.value === 'A') { return '🂡'; }
        else if (card.value === '2') { return '🂢'; }
        else if (card.value === '3') { return '🂣'; }
        else if (card.value === '4') { return '🂤'; }
        else if (card.value === '5') { return '🂥'; }
        else if (card.value === '6') { return '🂦'; }
        else if (card.value === '7') { return '🂧'; }
        else if (card.value === '8') { return '🂨'; }
        else if (card.value === '9') { return '🂩'; }
        else if (card.value === '10') { return '🂪'; }
        else if (card.value === 'J') { return '🂫'; }
        else if (card.value === 'Q') { return '🂭'; }
        else if (card.value === 'K') { return '🂮'; }
    }
    else if (card.sort === '♥') {
        if (card.value === 'A') { return '🂱'; }
        else if (card.value === '2') { return '🂲'; }
        else if (card.value === '3') { return '🂳'; }
        else if (card.value === '4') { return '🂴'; }
        else if (card.value === '5') { return '🂵'; }
        else if (card.value === '6') { return '🂶'; }
        else if (card.value === '7') { return '🂷'; }
        else if (card.value === '8') { return '🂸'; }
        else if (card.value === '9') { return '🂹'; }
        else if (card.value === '10') { return '🂺'; }
        else if (card.value === 'J') { return '🂻'; }
        else if (card.value === 'Q') { return '🂽'; }
        else if (card.value === 'K') { return '🂾'; }
    }
    else if (card.sort === '♦') {
        if (card.value === 'A') { return '🃁'; }
        else if (card.value === '2') { return '🃂'; }
        else if (card.value === '3') { return '🃃'; }
        else if (card.value === '4') { return '🃄'; }
        else if (card.value === '5') { return '🃅'; }
        else if (card.value === '6') { return '🃆'; }
        else if (card.value === '7') { return '🃇'; }
        else if (card.value === '8') { return '🃈'; }
        else if (card.value === '9') { return '🃉'; }
        else if (card.value === '10') { return '🃊'; }
        else if (card.value === 'J') { return '🃋'; }
        else if (card.value === 'Q') { return '🃍'; }
        else if (card.value === 'K') { return '🃎'; }
    }
    else if (card.sort === '♣') {
        if (card.value === 'A') { return '🃑'; }
        else if (card.value === '2') { return '🃒'; }
        else if (card.value === '3') { return '🃓'; }
        else if (card.value === '4') { return '🃔'; }
        else if (card.value === '5') { return '🃕'; }
        else if (card.value === '6') { return '🃖'; }
        else if (card.value === '7') { return '🃗'; }
        else if (card.value === '8') { return '🃘'; }
        else if (card.value === '9') { return '🃙'; }
        else if (card.value === '10') { return '🃚'; }
        else if (card.value === 'J') { return '🃛'; }
        else if (card.value === 'Q') { return '🃝'; }
        else if (card.value === 'K') { return '🃞'; }
    }
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

// Range function from Python
function range(n, m) {
    array = [];
    for (let i = n; i < m; i++) {
        array.push(i);
    }
    return array;
}