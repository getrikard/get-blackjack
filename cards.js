const unicodeCards = {
    '♠': {
        'A': '🂢', '2': '🂢', '3': '🂣', '4': '🂤', '5': '🂥',
        '6': '🂦', '7': '🂧', '8': '🂨', '9': '🂩', '10': '🂪',
        'J': '🂫', 'Q': '🂭', 'K': '🂮'
    },
    '♥': {
        'A': '🂱', '2': '🂲', '3': '🂳', '4': '🂴', '5': '🂵',
        '6': '🂶', '7': '🂷', '8': '🂸', '9': '🂹', '10': '🂺',
        'J': '🂻', 'Q': '🂽', 'K': '🂾'
    },
    '♦': {
        'A': '🃁', '2': '🃂', '3': '🃃', '4': '🃄', '5': '🃅',
        '6': '🃆', '7': '🃇', '8': '🃈', '9': '🃉', '10': '🃊',
        'J': '🃋', 'Q': '🃍', 'K': '🃎'
    },
    '♣': {
        'A': '🃑', '2': '🃒', '3': '🃓', '4': '🃔', '5': '🃕',
        '6': '🃖', '7': '🃗', '8': '🃘', '9': '🃙', '10': '🃚',
        'J': '🃛', 'Q': '🃝', 'K': '🃞'
    }
};

// Returnere et unicode kort-symbol fra et kort-objekt.
function getUnicode(card) {
    return unicodeCards[card.sort][card.value];
}

// Bygger og stokker stokken
function buildDeck(n) {
    let deck = [];
    for (let i of range(0, n)) {
        for (sort of ['♠', '♥', '♦', '♣']) {
            for (let value of range(2, 11)) {
                deck.push({ sort, value: value.toString(), hidden: false });
            }
            for (let value of ['J', 'Q', 'K', 'A']) {
                deck.push({ sort, value, hidden: false });
            }
        }
    }
    return shuffle(deck);
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

// Summer kortene på en hånd, teller ikke skjulte kort.
function sumHand(hand) {
    let sum = 0;
    let aces = 0;
    for (card of hand) {
        if (card.hidden) { continue; }
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