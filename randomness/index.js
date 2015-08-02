'use strict';

var randomMatrix = require('./../src/index.js');

console.time('random');

var generator = randomMatrix(1337);
var total = 50;
var fromX = -total;
var toX = total;
var fromY = -total;
var toY = total;
var totalRandomNumbersGenerated = 0;
var ladder = getLadder();

for (var x = fromX; x < toX; x++) {
    for (var y = fromY; y < toY; y++) {
        var randomValue = generator.rand(x, y);
        addToLadder(ladder, randomValue);
        totalRandomNumbersGenerated++;
    }
}
console.timeEnd('random');

var ladderTotal = ladder.reduce(function (prev, curr) {
    return prev + curr.occurence;
}, 0)

ladder.forEach(function log(item) {
    console.log(
        'from', item.from,
        'to', item.to,
        'occurence is', item.occurence,
        'with a percentage of', getPercentage(item.occurence, ladderTotal)
    );
});

console.log('Total of ladder occurences', ladderTotal, ladderTotal === totalRandomNumbersGenerated);

// utils
function getLadder() {
    var ladder = [];
    var step = 0.1;
    for (var i = 0; i < 1; i = enforcePrecision(i + step, 1)) {
        ladder.push({
            from: enforcePrecision(i, 1),
            to: enforcePrecision(i + step, 1),
            occurence: 0
        });
    }
    return ladder;
}

function addToLadder(ladder, value) {
    ladder.some(function (step) {
        if (value >= step.from && value < step.to) {
            step.occurence++;
            return true;
        }
        return false;
    });
}

function getPercentage(value, total) {
    var perc = (value / total) * 100;
    return enforcePrecision(perc, 2) + '%';
}

function enforcePrecision(val, nDecimalDigits) {
    var pow = Math.pow(10, nDecimalDigits);
    return +(Math.round(val * pow) / pow).toFixed(nDecimalDigits);
}
