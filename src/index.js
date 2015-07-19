'use strict';

var isInteger = require('mout/lang/isInteger');

/**
 * Tells whether a given value is an integer greater than 0
 * @function isPositiveInteger
 * @param  {Any} value
 * @return {Boolean}
 */
function isPositiveInteger(value) {
    return isInteger(value) && value > 0;
}

/**
 * Creates a PRNG generator
 * @function createGenerator
 * @param  {Number} seed
 * @return {Object} generator
 */
function createGenerator(seed) {
    var THROW_AWAY_DIGITS = 10000;
    var X_ADDITIVE = 404;
    var Y_ADDITIVE = 1337;

    // assertions
    if (!isPositiveInteger(seed)) {
        throw new Error('seed must be an integer and greater than 0 {Number}');
    }

    /**
     * Generate a random Number between 0 and 1 for the given row and column
     * @function rand
     * @param  {Number} x matrix row
     * @param  {Number} y matrix column
     * @return {Number} random value between 0 and 1
     */
    function rand(x, y) {
        var value;
        var randomValue;

        // assertions
        if (!isInteger(x)) {
            throw new Error('x must be an integer {Number}');
        }

        if (!isInteger(y)) {
            throw new Error('y must be an integer {Number}');
        }

        // in order to make (1,2) a different result than (2,1)
        x += X_ADDITIVE;
        y += Y_ADDITIVE;

        value = seed * x * y;
        randomValue = Math.sin(value) * THROW_AWAY_DIGITS;

        return randomValue - Math.floor(randomValue); // just decimal part
    }

    // public
    return {
        rand: rand
    };
}

module.exports = createGenerator;
