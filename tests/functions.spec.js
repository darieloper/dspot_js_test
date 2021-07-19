const assert = require('assert');
const utils = require('../utils');

describe('DSPOT Js Tests', function () {
    describe('#getTotalDecks', function () {
        it('Obtain the full number of decks from the cards correctly', function () {
            assert.strictEqual(2, utils.getTotalDecks(utils.getCards()));
        });

        it('Return zero for empty decks', function () {
            assert.strictEqual(0, utils.getTotalDecks([]));
        });

        it('Return correct value no matter the size of the elements on the cards array', function () {
            let newCards = utils.getCards().concat(utils.getCards().concat(utils.getCards()));
            // If once is 2 then three times is 6 (2 x 3 = 6)
            assert.strictEqual(6, utils.getTotalDecks(newCards));
        });

        it('Return zero when the cards has elements but not complete a deck', function () {
            const cards = [
                {'suit': 'hearts', 'value': 2},
                {'suit': 'hearts', 'value': 3},
                {'suit': 'hearts', 'value': 4},
            ];

            assert.strictEqual(0, utils.getTotalDecks(cards));
        })

        it('Return correctly the total of decks when the cards complete one', function () {
            const types = ['hearts', 'diamonds', 'clubs', 'spades'];
            const letters = ['A', 'J', 'Q', 'K'];
            const cards = [];
            for (let type of types) {
                for (let i=2; i <= 14; i++) {
                    cards.push({ 'suit': type, 'value': i > 10 ? letters[i - 11] : i })
                }
            }

            assert.strictEqual(52, cards.length);
            assert.strictEqual(1, utils.getTotalDecks(cards));

            // Remove some elements to check that the deck isn't full
            const removed = cards.splice(0, 5);
            assert.strictEqual(0, utils.getTotalDecks(cards));

            // Put the elements back and check that the deck is full again
            assert.strictEqual(1, utils.getTotalDecks(cards.concat(removed)));
        })
    });
});