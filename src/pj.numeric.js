/*
 * JavaScript Library
 *
 * Module: Numeric
 * Requirements: Core
 * Version: 1.0
 * Author: Paul Jarosch
 * Author Site: http://pauljarosch.name
 */
/* global PJ */

//namespace
PJ.Numeric = {};

//info
/**
 * Version
 * @type String the version string
 */
PJ.Numeric.version = '1.0';
/**
 * Name
 * @type String the name of this module
 */
PJ.Numeric.name = 'Numeric';

// override default toString
PJ.Numeric.toString = function () {
    return "PJ JavaScript Library " + PJ.name + " Module v" + PJ.version;
};

//constants
/**
 * Smallest possible value for an unsigned byte.
 * @type Number 0
 */
PJ.Numeric.BYTE_UNSIGNED_MIN_VALUE = 0;
/**
 * Largest possible value for an unsigned byte.
 * @type Number 255
 */
PJ.Numeric.BYTE_UNSIGNED_MAX_VALUE = 255;
/**
 * Smallest possible value for a signed byte.
 * @type Number -128
 */
PJ.Numeric.BYTE_SIGNED_MIN_VALUE = -128;
/**
 * Largest possible value for a signed byte.
 * @type Number 127
 */
PJ.Numeric.BYTE_SIGNED_MAX_VALUE = 127;
/**
 * Smallest possible value for an unsigned float.
 * @type Number Number.MIN_VALUE
 */
PJ.Numeric.FLOAT_UNSIGNED_MIN_VALUE = Number.MIN_VALUE;
/**
 * Largest possible value for an unsigned float.
 * @type Number Number.MAX_VALUE
 */
PJ.Numeric.FLOAT_UNSIGNED_MAX_VALUE = Number.MAX_VALUE;
/**
 * Smallest possible value for a signed float.
 * @type Number -1*Number.MAX_VALUE
 */
PJ.Numeric.FLOAT_SIGNED_MIN_VALUE = -1 * Number.MAX_VALUE;
/**
 * Largest possible value for a signed float.
 * @type Number Number.MAX_VALUE
 */
PJ.Numeric.FLOAT_SIGNED_MAX_VALUE = Number.MAX_VALUE;
/**
 * Smallest possible value for an unsigned integer.
 * @type Number 0
 */
PJ.Numeric.INTEGER_UNSIGNED_MIN_VALUE = 0;
/**
 * Largest possible value for an unsigned integer.
 * @type Number 4294967295
 */
PJ.Numeric.INTEGER_UNSIGNED_MAX_VALUE = 4294967295;
/**
 * Smallest possible value for a signed integer.
 * @type Number -2147483648
 */
PJ.Numeric.INTEGER_SIGNED_MIN_VALUE = -2147483648;
/**
 * Largest possible value for a signed integer.
 * @type Number 2147483647
 */
PJ.Numeric.INTEGER_SIGNED_MAX_VALUE = 2147483647;
/**
 * Smallest possible value for an unsigned long.
 * @type Number 0
 */
PJ.Numeric.LONG_UNSIGNED_MIN_VALUE = 0;
/**
 * Largest possible value for an unsigned long.
 * @type Number 4294967295
 */
PJ.Numeric.LONG_UNSIGNED_MAX_VALUE = 18446744073709551615;
/**
 * Smallest possible value for a signed long.
 * @type Number -2147483648
 */
PJ.Numeric.LONG_SIGNED_MIN_VALUE = -9223372036854775808;
/**
 * Largest possible value for a signed long.
 * @type Number 2147483647
 */
PJ.Numeric.LONG_SIGNED_MAX_VALUE = 9223372036854775807;
/**
 * Smallest possible value for an unsigned integer.
 * @type Number 0
 */
PJ.Numeric.SHORT_UNSIGNED_MIN_VALUE = 0;
/**
 * Largest possible value for an unsigned integer.
 * @type Number 4294967295
 */
PJ.Numeric.SHORT_UNSIGNED_MAX_VALUE = 65535;
/**
 * Smallest possible value for a signed integer.
 * @type Number -2147483648
 */
PJ.Numeric.SHORT_SIGNED_MIN_VALUE = -32768;
/**
 * Largest possible value for a signed integer.
 * @type Number 2147483647
 */
PJ.Numeric.SHORT_SIGNED_MAX_VALUE = 32767;

//static methods
/**
 * Performs a check on n to determine if it is within the specified range
 *
 * @param {Number} n the value to check
 * @param {Number} min the minimum value
 * @param {Number} max the maximum value
 * @param {Boolean} min_inc is min inclusive range? If true, then min is also a valid value for n. Defaults to true.
 * @param {Boolean} max_inc is max inclusive range? If true, then max is also a valid value for n. Defaults to true.
 *
 * @returns {Boolean} true if n is within range; otherwise false
 */
PJ.Numeric.isWithinRange = function (n, min, max, min_inc, max_inc) {
    //check n
    if ((typeof n === 'undefined') || (n === null)) {
        throw new PJ.IllegalArgumentExceptionn('n is required');
    }
    else if (!PJ.isNumber(n)) {
        throw new PJ.IllegalArgumentException('n must be a number');
    }

    //check min
    if ((typeof min === 'undefined') || (min === null)) {
        throw new PJ.IllegalArgumentExceptionn('min is required');
    }
    else if (!PJ.isNumber(min)) {
        throw new PJ.IllegalArgumentException('min must be a number');
    }

    //check max
    if ((typeof max === 'undefined') || (max === null)) {
        throw new PJ.IllegalArgumentExceptionn("max is required");
    }
    else if (!PJ.isNumber(max)) {
        throw new PJ.IllegalArgumentException('min must be a number');
    }

    //check min_inc
    if ((typeof min_inc === 'undefined') || (min_inc === null)) {
        min_inc = true;
    }
    else {
        min_inc = PJ.parseBoolean(min_inc);
    }

    //check max_inc
    if ((typeof max_inc === 'undefined') || (max_inc === null)) {
        max_inc = true;
    }
    else {
        max_inc = PJ.parseBoolean(max_inc);
    }

    //check min and max relative values
    if (min > max) {
        throw new PJ.IllegalArgumentException("min cannot be larger than max");
    }

    //check range
    var pass = true;

    //min check
    if (min_inc) {
        pass = pass && (n >= min);
    }
    else {
        pass = pass && (n > min);
    }

    //max check
    if (max_inc) {
        pass = pass && (n <= max);
    }
    else {
        pass = pass && (n < max);
    }

    return pass;
};

/**
 * Determines if a number is a byte.
 * @param {Number} n the number to test
 * @param {Boolean} signed indicates check for signed (true) or unsigned (false)
 * @returns {Boolean} true if number is a byte; false otherwise
 */
PJ.Numeric.isByte = function (n, signed) {
    if (PJ.Numeric.isIntegral(n)) {
        var _s = PJ.parseBoolean(signed);
        var min = _s ? PJ.Numeric.BYTE_SIGNED_MIN_VALUE : PJ.Numeric.BYTE_UNSIGNED_MIN_VALUE;
        var max = _s ? PJ.Numeric.BYTE_SIGNED_MAX_VALUE : PJ.Numeric.BYTE_UNSIGNED_MAX_VALUE;
        return PJ.Numeric.isWithinRange(n, min, max, true, true);
    }

    return false;
};

/**
 * Determines if a number is a float.
 * @param {Number} n the number to test
 * @param {Boolean} signed indicates check for signed (true) or unsigned (false)
 * @returns {Boolean} true if number is a float; false otherwise
 */
PJ.Numeric.isFloat = function (n, signed) {
    if (!PJ.Numeric.isIntegral(n)) {
        switch (n) {
            case Number.POSITIVE_INFINITY:
            case Number.NEGATIVE_INFINITY:
                return false;
            default:
                var _s = PJ.parseBoolean(signed);
                var min = _s ? PJ.Numeric.FLOAT_SIGNED_MIN_VALUE : PJ.Numeric.FLOAT_UNSIGNED_MIN_VALUE;
                var max = _s ? PJ.Numeric.FLOAT_SIGNED_MAX_VALUE : PJ.Numeric.FLOAT_UNSIGNED_MAX_VALUE;
                return PJ.Numeric.isWithinRange(n, min, max, true, true);
        }
    }
};

/**
 * Determines if a number is an integral data type. (aka whole number)
 * @param {Number} n the number to test
 * @returns {Boolean} true if n is whole number; false otherwise
 */
PJ.Numeric.isIntegral = function (n) {
    if (PJ.isNumber(n)) {
        if (!window.isNaN(n)) {
            return ((n % 1) === 0);
        }
    }

    return false;
};

/**
 * Determines if a number is an integer.
 * @param {Number} n the number to test
 * @param {Boolean} signed indicates check for signed (true) or unsigned (false)
 * @returns {Boolean} true if number is an integer; false otherwise
 */
PJ.Numeric.isInteger = function (n, signed) {
    if (PJ.Numeric.isIntegral(n)) {
        switch (n) {
            case Number.POSITIVE_INFINITY:
            case Number.NEGATIVE_INFINITY:
                return false;
            default:
                var _s = PJ.parseBoolean(signed);
                var min = _s ? PJ.Numeric.INTEGER_SIGNED_MIN_VALUE : PJ.Numeric.INTEGER_UNSIGNED_MIN_VALUE;
                var max = _s ? PJ.Numeric.INTEGER_SIGNED_MAX_VALUE : PJ.Numeric.INTEGER_UNSIGNED_MAX_VALUE;
                return PJ.Numeric.isWithinRange(n, min, max, true, true);
        }
    }

    return false;
};

/**
 * Determines if a number is a long.
 * @param {Number} n the number to test
 * @param {Boolean} signed indicates check for signed (true) or unsigned (false)
 * @returns {Boolean} true if number is a long; false otherwise
 */
PJ.Numeric.isLong = function (n, signed) {
    if (PJ.Numeric.isIntegral(n)) {
        var _s = PJ.parseBoolean(signed);
        var min = _s ? PJ.Numeric.LONG_SIGNED_MIN_VALUE : PJ.Numeric.LONG_UNSIGNED_MIN_VALUE;
        var max = _s ? PJ.Numeric.LONG_SIGNED_MAX_VALUE : PJ.Numeric.LONG_UNSIGNED_MAX_VALUE;
        return PJ.Numeric.isWithinRange(n, min, max, true, true);
    }

    return false;
};

/**
 * Determines if a number is a short.
 * @param {Number} n the number to test
 * @param {Boolean} signed indicates check for signed (true) or unsigned (false)
 * @returns {Boolean} true if number is a short; false otherwise
 */
PJ.Numeric.isShort = function (n, signed) {
    if (PJ.Numeric.isIntegral(n)) {
        var _s = PJ.parseBoolean(signed);
        var min = _s ? PJ.Numeric.SHORT_SIGNED_MIN_VALUE : PJ.Numeric.SHORT_UNSIGNED_MIN_VALUE;
        var max = _s ? PJ.Numeric.SHORT_SIGNED_MAX_VALUE : PJ.Numeric.SHORT_UNSIGNED_MAX_VALUE;
        return PJ.Numeric.isWithinRange(n, min, max, true, true);
    }

    return false;
};