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