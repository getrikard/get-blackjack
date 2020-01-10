//
// Model
//

// Innstillinger
const decksUsed = 2;

// Globale ting
let playingTable = document.getElementById('playing-table');
let cardSize = {};
let gameSize = {};
let cardAreaHeight;

let dealerHand = [];
let playerHand = [];

let gameOver = false;
let bigMessage = '';

let deck = buildDeck(decksUsed);

dealerHand.push(deck.pop());
dealerHand.push(deck.pop());
dealerHand[0].hidden = true;
console.log('Dealer: ' + sumHand(dealerHand));

playerHand.push(deck.pop());
playerHand.push(deck.pop());
console.log('Player: ' + sumHand(playerHand));

if (sumHand(playerHand) === 21) {
    dealerHand[0].hidden = false;
    if (sumHand(dealerHand) === 21) {
        bigMessage = 'Begge har 21. Dealer vinner';
        gameOver = true;
    }
    else {
        bigMessage = 'Naturlig 21. Spiller vinner';
        gameOver = true;
    }
}

drawGame();

//
// View
//

function drawGame() {
    // Blank ut spillet
    calcViewValues();
    playingTable.innerHTML = '';

    // Tegn hjelpelinjer
    // playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight}" x2="2000" y2="${cardAreaHeight}" stroke="white" stroke-width="1">`;
    // playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight * 2}" x2="2000" y2="${cardAreaHeight * 2}" stroke="white" stroke-width="1">`;
    // playingTable.innerHTML += `<line x1="0" y1="${cardAreaHeight * 3}" x2="2000" y2="${cardAreaHeight * 3}" stroke="white" stroke-width="1">`;

    // Regne ut posisjonen til korta til dealer
    let cardSpacing = gameSize.h * 0.05;
    let totalWidth = cardSize.w + ((dealerHand.length - 1) * cardSpacing);
    let y = (cardAreaHeight - cardSize.h) / 2;
    let x = (gameSize.w / 2) - (totalWidth / 2);

    // Tegn trekkebunke
    playingTable.innerHTML += createCard({ x: y, y }, { w: cardSize.w, h: cardSize.h }, { hidden: true }, '');

    // Tegn kort til dealer
    for (card of dealerHand) {
        playingTable.innerHTML += createCard({ x, y }, { w: cardSize.w, h: cardSize.h }, card, '');
        x += cardSpacing;
    }

    // Regne ut posisjonen til korta til spiller
    totalWidth = cardSize.w + ((playerHand.length - 1) * cardSpacing);
    y = (cardAreaHeight * 5 - cardSize.h) / 2;
    x = (gameSize.w / 2) - (totalWidth / 2);

    // Tegn kort til spiller
    for (card of playerHand) {
        playingTable.innerHTML += createCard({ x, y }, { w: cardSize.w, h: cardSize.h }, card, '');
        x += cardSpacing;
    }

    drawButtons();

    // Tegn beskjed
    bigtext = {};
    bigtext.h = gameSize.h * 0.075;
    bigtext.x = gameSize.w / 2;
    bigtext.y = cardAreaHeight * 2 - bigtext.h * 1.4;
    playingTable.innerHTML += `<text class="big-text" x="${bigtext.x}" y="${bigtext.y}" fill="white" stroke="black" stroke-width="2.5" style="font-size:${bigtext.h}px;">${bigMessage}</text>`;
}

function drawButtons() {
    // Regne ut hvilke knapper som skal tegnes
    let buttons = [
        { name: 'fold', symbol: '🔚' },
        { name: 'stand', symbol: '✋' },
        { name: 'hit', symbol: '➕' }
    ];

    if (gameOver) {
        buttons = [{ name: 'restart', symbol: '↩️' }];
    }

    // Regne ut posisjonen til knappene
    let spaceWidth = 30;
    let btn = {};
    btn.w = cardAreaHeight / 1.4;
    btn.h = btn.w;
    let totalWidth = btn.w * buttons.length + spaceWidth * (buttons.length - 1);

    btn.x = (gameSize.w / 2) - (totalWidth / 2);
    btn.y = (cardAreaHeight * 3.5) - (btn.h / 2)

    for (button of buttons) {
        // Tegn knapper
        playingTable.innerHTML += `<g class="button" onclick="${button.name}()">
                            <rect stroke="white" stroke-width="0" fill="green"
                                    x="${btn.x}" y="${btn.y}" rx="50%"
                                    style="width:${btn.w}; height:${btn.h};"></rect>
                            <text x="${btn.x + (btn.w / 2)}" y="${btn.y + (btn.h * 0.77)}" fill="black" style="text-anchor:middle; font-size:${btn.h / 1.3}px;">${button.symbol}</text>
                        </g>`;
        btn.x += btn.w + spaceWidth;
    }
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
    let imgTag = '';
    if (['♥', '♦'].includes(card.sort)) { textColor = 'red'; }
    if (card.hidden) {
        bgColor = 'blue';
        sort = '';
        value = '';
        //imgTag = `<image x="${pos.x}" y="${pos.y}" width="${size.w}" height="${size.h}" href="pineapple.png" rx="10">`;
    }

    return `<g class="card" onclick="${onclickFunction}" rx="10">
                <rect stroke="black" stroke-width="2" fill="${bgColor}"
                        x="${pos.x}" y="${pos.y}" rx="10"
                        style="width:${size.w}; height:${size.h};"></rect>
                ${imgTag}
                <text x="${pos.x + 10}" y="${pos.y + 25}" fill="${textColor}">${sort}</text>
                <text x="${pos.x + 10}" y="${pos.y + 50}" fill="${textColor}">${value}</text>
            </g>`;
}

//
// Controller
//

function hit() {
    bigMessage = '';
    playerHand.push(deck.pop());
    console.log('Player: ' + sumHand(playerHand));
    if (sumHand(playerHand) > 21) {
        // console.log('Over 21');
        gameOver = true;
        // bigMessage = `Dealer vant`;
        bigMessage = 'Over 21';
        console.log(bigMessage);
    }
    drawGame();
}

function stand() {
    bigMessage = '';
    dealerHand[0].hidden = false;
    while (sumHand(dealerHand) <= 17) {
        if (sumHand(dealerHand) <= sumHand(playerHand)) {
            dealerHand.push(deck.pop());
        }
        else {
            break;
        }
    }
    console.log('Dealer: ' + sumHand(dealerHand));
    // if (sumHand(dealerHand) > 21) {
    //     bigMessage = 'Spiller vant!';
    //     console.log(bigMessage);
    // } else {
    bigMessage = `${getWinner()} vant.`;
    console.log(bigMessage);
    // }
    gameOver = true;
    drawGame();
}

function restart() {
    deck = buildDeck(decksUsed);
    dealerHand = [deck.pop(), deck.pop()];
    dealerHand[0].hidden = true;
    playerHand = [deck.pop(), deck.pop()];
    gameOver = false;
    console.log('== Ny runde ==');
    console.log('Dealer: ' + sumHand(dealerHand));
    console.log('Player: ' + sumHand(playerHand));
    bigMessage = '';
    drawGame();
}

function getWinner() {
    let playerScore = 21 - sumHand(playerHand);
    let dealerScore = 21 - sumHand(dealerHand);
    if (sumHand(playerHand) > 21) {
        return 'Dealer';
    }
    else if (sumHand(dealerHand) > 21) {
        return 'Spiller';
    }
    else if (playerScore >= dealerScore) {
        return 'Dealer';
    }
    return 'Spiller';
}

function fold() {
    bigMessage = '';
    dealerHand[0].hidden = false;
    gameOver = true;
    drawGame();
}