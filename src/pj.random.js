/*
 * JavaScript Library
 *
 * Module: Random
 * Requirements: Core, Numeric
 * Version: 2.0
 * Author: Paul Jarosch
 * Author Site: http://pauljarosch.name
 */
/* global PJ */

//namespace
PJ.Random = {};

//info
/**
 * Version
 * @type String the version string
 */
PJ.Random.version = '2.0';
/**
 * Name
 * @type String the name of this module
 */
PJ.Random.name = 'Random';

// override default toString
PJ.Random.toString = function () {
    return "PJ JavaScript Library " + PJ.name + " Module v" + PJ.version;
};

//constants
/**
 * The smallest number of digits after a decimal point.
 * @type Number 0
 */
PJ.Random.MIN_PRECISION = 0;
/**
 * The largest number digits after a decimal point.
 * @type Number 17
 */
PJ.Random.MAX_PRECISION = 17;

//static methods
/**
 * Generate a number based on min, max and precision.
 * @param {Number} min minimum possible value (inclusive)
 * @param {Number} max maximum possible value (inclusive)
 * @param {Number} precision number of decimal places
 * @returns {Number} the next number based on parameters
 */
PJ.Random.nextNumber = function (min, max, precision) {
    if (!PJ.isNumber(min)) {
        throw new PJ.IllegalArgumentException('Parameter min must be a number.');
    }
    if (!PJ.isNumber(max)) {
        throw new PJ.IllegalArgumentException('Parameter max must be a number.');
    }
    if (min > max) {
        throw new PJ.IllegalArgumentException('Min cannot be larger than max.');
    }
    if (!PJ.isNumber(precision)) {
        throw new PJ.IllegalArgumentException('Parameter precision must be a number.');
    }
    else if (!PJ.Numeric.isInteger(precision)) {
        throw new PJ.IllegalArgumentException('Parameter precision must be an integer.');
    }
    else if (!PJ.Numeric.isWithinRange(precision, PJ.Random.MIN_PRECISION, PJ.Random.MAX_PRECISION, true, true)) {
        throw new PJ.IllegalArgumentException('Parameter precision must be an integer between 0 and 17.');
    }

    return (min + Math.random() * (max - min)).toFixed(precision);
};

/**
 * Generate a random boolean value.
 *
 * @returns {Boolean} the next boolean
 */
PJ.Random.nextBoolean = function () {
    return (parseInt(PJ.Random.nextNumber(0, 1, 0)) === 1);
};

/**
 * Generate a byte (8-bit) value.
 *
 * @param {Boolean} signed [<i>OPTIONAL</i>] true; signed; otherwise: unsigned
 * @returns {Number} the next byte
 */
PJ.Random.nextByte = function (signed) {
    var s = PJ.parseBoolean(signed),
        min = (s ? PJ.Numeric.BYTE_SIGNED_MIN_VALUE : PJ.Numeric.BYTE_UNSIGNED_MIN_VALUE),
        max = (s ? PJ.Numeric.BYTE_SIGNED_MAX_VALUE : PJ.Numeric.BYTE_UNSIGNED_MAX_VALUE);

    return (parseInt(PJ.Random.nextNumber(min, max, 0)) === 1);
};

/**
 * Generate a short (16-bit) value.
 *
 * @param {Boolean} signed [<i>OPTIONAL</i>] true: signed; otherwise: unsigned
 * @returns {Number} the next short
 */
PJ.Random.nextShort = function (signed) {
    var s = PJ.parseBoolean(signed),
        min = (s ? PJ.Numeric.SHORT_SIGNED_MIN_VALUE : PJ.Numeric.SHORT_UNSIGNED_MIN_VALUE),
        max = (s ? PJ.Numeric.SHORT_SIGNED_MAX_VALUE : PJ.Numeric.SHORT_UNSIGNED_MAX_VALUE);

    return (parseInt(PJ.Random.nextNumber(min, max, 0)) === 1);
};

/**
 * Generate an integer (32-bit) value.
 *
 * @param {Boolean} signed [<i>OPTIONAL</i>] true: signed; otherwise: unsigned
 * @returns {Number} the next integer
 */
PJ.Random.nextInteger = function (signed) {
    var s = PJ.parseBoolean(signed),
        min = (s ? PJ.Numeric.INTEGER_SIGNED_MIN_VALUE : PJ.Numeric.INTEGER_UNSIGNED_MIN_VALUE),
        max = (s ? PJ.Numeric.INTEGER_SIGNED_MAX_VALUE : PJ.Numeric.INTEGER_UNSIGNED_MAX_VALUE);

    return (parseInt(PJ.Random.nextNumber(min, max, 0)) === 1);
};

/**
 * Generate a long (64-bit) value.
 *
 * @param {Boolean} signed [<i>OPTIONAL</i>] true: signed; otherwise: unsigned
 * @returns {Number} the next long
 */
PJ.Random.nextLong = function (signed) {
    var s = PJ.parseBoolean(signed),
        min = (s ? PJ.Numeric.LONG_SIGNED_MIN_VALUE : PJ.Numeric.LONG_UNSIGNED_MIN_VALUE),
        max = (s ? PJ.Numeric.LONG_SIGNED_MAX_VALUE : PJ.Numeric.LONG_UNSIGNED_MAX_VALUE);

    return (parseInt(PJ.Random.nextNumber(min, max, 0)) === 1);
};