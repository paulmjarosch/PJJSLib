/*
 * JavaScript Library
 *
 * Module: Math
 * Requirements: Core, Numeric
 * Version: 4.0
 * Author: Paul Jarosch
 * Author Site: http://pauljarosch.name
 */
/* global PJ */

//namespace
PJ.Math = {};

//info
/**
 * Version
 * @type String the version string
 */
PJ.Math.version = '4.0';
/**
 * Name
 * @type String the name of this module
 */
PJ.Math.name = 'Math';

// override default toString
PJ.Math.toString = function () {
    return 'PJ JavaScript Library '+ PJ.name +' Module v'+ PJ.version;
};

//constants
/**
 * Turn
 * @type Number
 */
PJ.Math.ANGLE_UNIT_TURN = 1;
/**
 * Quadrant
 * @type Number
 */
PJ.Math.ANGLE_UNIT_QUADRANT = 4;
/**
 * Sextant
 * @type Number
 */
PJ.Math.ANGLE_UNIT_SEXTANT = 6;
/**
 * Radian
 * @type Number
 */
PJ.Math.ANGLE_UNIT_RADIAN = 2 * Math.PI;
/**
 * Hour
 * @type Number
 */
PJ.Math.ANGLE_UNIT_HOUR = 24;
/**
 * Point
 * @type Number
 */
PJ.Math.ANGLE_UNIT_POINT = 32;
/**
 * Hexacontade
 * @type Number
 */
PJ.Math.ANGLE_UNIT_HEXACONTADE = 60;
/**
 * Binary Degree
 * @type Number
 */
PJ.Math.ANGLE_UNIT_BINARY_DEGREE = 256;
/**
 * Degree
 * @type Number
 */
PJ.Math.ANGLE_UNIT_DEGREE = 360;
/**
 * Grad
 * @type Number
 */
PJ.Math.ANGLE_UNIT_GRAD = 400;
/**
 * Mil (NATO)
 * @type Number
 */
PJ.Math.ANGLE_UNIT_MIL = 6400;
/**
 * Minute of Arc
 * @type Number
 */
PJ.Math.ANGLE_UNIT_ARC_MINUTE = 21600;
/**
 * Second of Arc
 * @type Number
 */
PJ.Math.ANGLE_UNIT_ARC_SECOND = 1296000;

//static methods
/**
 * Determines if the input is a prime a number.
 * @param {Number} n the number to test
 * @returns {Boolean} true if the number is a prime; otherwise false
 */
PJ.Math.isPrime = function (n) {
    if (!PJ.Numeric.isInteger(n)) {
        return false;
    }
    else if (n < 2) {
        return false;
    }
    else {
        var r = true;

        for (var i = 2; i < n; i++) {
            if ((n % i) === 0) {
                r = false;
                break;
            }
        }

        return r;
    }
};

/**
 * Computes n!
 * @param {Number} n the number to produce the factorial of
 * @returns {Number|Number.NaN} result or Number.NaN if n is not a positive integer.
 */
PJ.Math.factorial = function (n) {
    if (!PJ.Numeric.isInteger(n)) {
        return Number.NaN;
    }
    else if (n < 0) {
        return Number.NaN;
    }
    else {
        var t = 0;

        if (n === 0) {
            t = 1;
        }
        else {
            t = n;
        }

        for (var i = n-1; i > 0; i--) {
            t *= i;
        }

        return t;
    }
};

/**
 * Greatest Common Denominator of 2 or more integers.
 * @param {...Number} _args integers to get the GCD of
 * @returns {Number} the result
 * @throws {IllegalArgumentException} thrown if any parameter is not an integer
 */
PJ.Math.gcd = function (_args) {
    if (arguments.length < 2) {
        throw new PJ.IllegalArgumentException('too few arguments');
    }
    else if (!PJ.Numeric.isInteger(!arguments[0])) {
        throw new PJ.IllegalArgumentException('Parameter 0 is not an integer.');
    }
    else {
        var result = arguments[0];

        for (var i = 1; i < arguments.length; i++) {
            if (!PJ.Numeric.isInteger(!arguments[i])) {
                throw new PJ.IllegalArgumentException('Parameter '+i+' is not an integer.');
            }
            else {
                var t = 0, y = arguments[i];

                while (y !== 0) {
                    t = result % y;
                    result = y;
                    y = t;
                }
            }
        }

        return result;
    }
};

/**
 * Least Common Muliple of 2 or more integers.
 * @param {...Number} _args integers to get the LCM of
 * @returns {Number} the result
 * @throws {IllegalArgumentException} thrown if any parameter is not an integer
 */
PJ.Math.lcm = function (_args) {
    if (arguments.length < 2) {
        throw new PJ.IllegalArgumentException('too few arguments');
    }
    else if (!PJ.Numeric.isInteger(!arguments[0])) {
        throw new PJ.IllegalArgumentException('Parameter 0 is not an integer.');
    }
    else {
        var _lcm = function(x,y) {
            return (x*y) / PJ.Math.gcd(x,y);
        };

        var result = arguments[0];

        for (var i = 1; i < arguments.length; i++) {
            if (!PJ.Numeric.isInteger(!arguments[i])) {
                throw new PJ.IllegalArgumentException('Parameter '+i+' is not an integer.');
            }
            else {
                result = _lcm(result, arguments[i]);
            }
        }

        return result;
    }
};

/**
 * Calculates the distance between two points in the cartesian coordinate system.
 * <p>If both arrays are not the same length, then the number of dimensions will be based on the shortest array.</p>
 *
 * @param {Array} pt1 the first point (array of numbers)
 * @param {Array} pt2 the second point (array of numbers)
 * @returns {Number} the distance between the points
 */
PJ.Math.distance = function (pt1, pt2) {
    if (!PJ.isArray(pt1) || !PJ.isArray(pt2)) {
        throw new PJ.IllegalArgumentException('Parmaters must be arrays.');
    }

    var dims = Math.min(pt1.length, pt2.length);
    var dist = 0;

    for (var i = 0; i < dims; i++) {
        if (!PJ.isNumber(pt1[i])) {
            throw new PJ.NotNumericException('Point 1, Dimension '+i+' is not a a number.');
        }
        if (!PJ.isNumber(pt2[i])) {
            throw new PJ.NotNumericException('Point 2, Dimension '+i+' is not a a number.');
        }

        dist += Math.pow(pt2[i] - pt1[i], 2);
    }

    return Math.sqrt(dist);
};

/**
 * Calculates the middle point between two points in the cartesian coordinate system.
 * <p>If both arrays are not the same length, then the number of dimensions will be based on the shortest array.</p>
 * @param {Array} pt1 the first point (array of numbers)
 * @param {Array} pt2 the second point (array of numbers)
 * @returns {Array} the point halfway between both points
 */
PJ.Math.midpoint = function (pt1, pt2) {
    var dims = Math.min(pt1.length, pt2.length);
    var midpt = [];

    for (var i = 0; i < dims; i++) {
        if (!PJ.isNumber(pt1[i])) {
            throw new PJ.NotNumericException('Point 1, Dimension '+i+' is not a a number.');
        }
        if (!PJ.isNumber(pt2[i])) {
            throw new PJ.NotNumericException('Point 2, Dimension '+i+' is not a a number.');
        }

        midpt[i] = (pt2[i] - pt1[i]) / 2;
    }

    return midpt;
};

/**
 * Calculates the hypotenuse of a 'triangle'.
 * <p>This function is not limited to two dimensions. It can handle any number of dimensions greater than or equal to 2.<p>
 *
 * @param {...Number} _args the sides lengths of the 'triangle' (array of numbers)
 * @returns {Number} the hypotenuse length
 * @throws {IllegalArgumentException} thrown if there are less than 2 parameters or if any parameter is not an integer
 */
PJ.Math.hypotenuse = function (_args) {
    if (arguments.length < 2) {
        throw new PJ.IllegalArgumentException('too few arguments');
    }
    else {
        var hyp = 0,
            count = arguments.length;

        for (var i = 0; i < count; i++) {
            if (!PJ.Numeric.isInteger(!arguments[i])) {
                throw new PJ.IllegalArgumentException('Parameter '+i+' is not an integer.');
            }
            else {
                hyp += Math.pow(arguments[i], 2);
            }
        }

        return Math.sqrt(hyp);
    }
};

/**
 * Calculates the possible solutions for a quadratic equation.
 * <p>The returned array may contain one or two numbers or 2 'imaginary' numbers represented as a string.</p>
 *
 * @param {Number} a the coefficient of x^2
 * @param {Number} b the coefficient of x
 * @param {Number} c the constant
 * @returns {Array} the possible solutions for x
 */
PJ.Math.quadratic = function (a, b, c) {
    if (!PJ.isNumber(a)) {
        throw new PJ.IllegalArgumentException('Parameter a must be a number.');
    }
    if (!PJ.isNumber(b)) {
        throw new PJ.IllegalArgumentException('Parameter b must be a number.');
    }
    if (!PJ.isNumber(c)) {
        throw new PJ.IllegalArgumentException('Parameter c must be a number.');
    }

    var _b = -1 * b,
        discrim = Math.pow(b, 2) - (4 * a * c),
        den = 2 * a;

    //determine number of solutions
    if (discrim === 0) {   //one real solution
        return [_b / den];
    }
    else if (discrim > 0) {   //two real solutions
        var root = Math.sqrt(discrim),
            sol1 = (_b + root) / den,
            sol2 = (_b - root) / den;

        return [sol1, sol2];
    }
    else {     //two imaginary solutions
        var real = (_b / den),
            img = ((Math.sqrt(Math.abs(discrim)) / den)),
            sol1 = real +' + i*' + img,
            sol2 = real +' - i*' + img;

        return [sol1, sol2];
    }
};

/**
 * Calculates the possible solutions for a cubic equation.
 * <p>The returned array may contain 4 numbers or 2 numbers and 2 'imaginary' numbers represented as a string.</p>
 *
 * @param {Number} a the coefficient of x^3
 * @param {Number} b the coefficient of x^2
 * @param {Number} c the coefficient of x
 * @param {Number} d the constant
 * @returns {Array} the possible solutions for x
 */
PJ.Math.cubic = function (a, b, c, d) {
    if (!PJ.isNumber(a)) {
        throw new PJ.IllegalArgumentException('Parameter a must be a number.');
    }
    if (!PJ.isNumber(b)) {
        throw new PJ.IllegalArgumentException('Parameter b must be a number.');
    }
    if (!PJ.isNumber(c)) {
        throw new PJ.IllegalArgumentException('Parameter c must be a number.');
    }
    if (!PJ.isNumber(d)) {
        throw new PJ.IllegalArgumentException('Parameter d must be a number.');
    }

    var f = ((3*c/a) - (Math.pow(b,2)/Math.pow(a,2)))/3,
        g = ((2*Math.pow(b,3)/Math.pow(a,3)) - (9*b*c / Math.pow(a,2)) + (27*d/a))/27,
        h = (Math.pow(g,2)/4) + (Math.pow(f,3)/27);

    if (h > 0) {
        var r = -1*(g/2)+Math.pow(h,(1/2)),
            s = Math.pow(r,(1/3)),
            t = -1*(g/2)-Math.pow(h,(1/2)),
            u = 0;

        if (t < 0) {
            t = Math.abs(t);
            u = -1*Math.pow(t,(1/3));
        }
        else {
            u = Math.pow(t,(1/3));
        }

        return [
            -1,
            (s+u) - (b/(3*a)),
            (-1*((s+u)/2)) - (b/(3*a)) + ' + i*' + ((s-u)*Math.pow(3,(1/2)))/2,
            (-1*((s+u)/2)) - (b/(3*a)) + ' - i*' + ((s-u)*Math.pow(3,(1/2)))/2
        ];
    }
    else {
        var i = Math.pow(((Math.pow(g,2)/4)-h),(1/2)),
            j = Math.pow(i,(1/3)),
            k = Math.acos(-1*(g/(2*i))),
            l = j*-1,
            m = Math.cos(k/3),
            n = Math.sqrt(3)*Math.sin(k/3),
            p = (b/(3*a))*-1;

        return [
            0,
            (2*j)*Math.cos(k/3) - (b/(3*a)),
            l*(m+n)+p,
            l*(m-n)+p
        ];
    }
};

/**
 * Calculates the factors of the specified a number.
 *
 * @param {Number} n the number to get the factors of. Must be an integer.
 * @returns {Array} the factors of n
 */
PJ.Math.nFactorize = function (n) {
    if (!PJ.Math.isInteger(n)) {
        throw new PJ.IllegalArgumentException('Parameter must be an integer.');
    }

    var m = Math.abs(Math.floor(n));
    var f = new Array();

    f[0] = 1;  //1 is always a factor

    if (m >= 2) {
        for (var i = 2; i <= m; i++) {
            if ((m % i) === 0) {
                f[f.length] = i;
            }
        }
    }

    return f;
};

/**
 * Calculates the number of permutations.
 *
 * @param {Number} n the number of objects
 * @param {Number|Array} r [<i>OPTIONAL</i>] <br>
 * <ol>
 *      <li>if an {Number}, then this is the number of objects taken at a time.</li>
 *      <li>if an {Array} of integers, then this is the list of like occurences</li>
 *      <li>if omitted, then all objects are taken at a time</li>
 * </ol>
 *
 * @returns {Number} the number of permutations.
 */
PJ.Math.nPr = function (n, r) {
    if (!PJ.isNumber(n)) {
        throw new PJ.IllegalArgumentException('Parameter n must be a number.');
    }
    if (!PJ.isNumber(r) && !PJ.isArray(r)) {
        throw new PJ.IllegalArgumentException('Parameter r must be a number or an array.');
    }

    var _n = Math.abs(Math.floor(n)),
        _r;

    //'r' check
    if (PJ.typeOf(r) === 'number') {
        _r = r;
    }
    else if (PJ.typeOf(r) === 'array') {
        _r = r;
    }
    else {
        _r = _n;
    }

    //calculate permuatations
    if (PJ.typeOf(_r) === 'array') {
        var den = 1;

        for (var i in _r) {
            var ele = Math.abs(Math.floor(_r[i]));

            den *= PJ.Math.factorial(ele);
        }

        return PJ.Math.factorial(_n) / den;
    }
    else if (_r > _n) {
        return 0;
    }
    else {
        return PJ.Math.factorial(_n) / PJ.Math.factorial(_n - _r);
    }
};

/**
 * Calculates the number of combinations.
 *
 * @param {Integer} n the number pf objects
 * @param {Integer} r the number of objects taken at a time.
 * @param {Boolean} b [<i>OPTIONAL</i>] flag to indicate repetition
 *
 * @returns {Number} the number of combinations.
 */
PJ.Math.nCr = function (n, r, b) {
    if (!PJ.isNumber(n)) {
        throw new PJ.IllegalArgumentException('Parameter n must be a number.');
    }
    if (!PJ.isNumber(r)) {
        throw new PJ.IllegalArgumentException('Parameter r must be a number.');
    }

    var _n = Math.abs(Math.floor(n)),
        _r = Math.abs(Math.floor(r));

    //calculate combinations
    if (_r > _n) {
        return 0;
    }
    else {
        if (PJ.parseBoolean(b)) {   //repeat combinations
            _n = _n + _r - 1;
        }

        return PJ.Math.factorial(_n) / (PJ.Math.factorial(_r) * PJ.Math.factorial(_n - _r));
    }
};

/**
 * Convert from one angle to another
 *
 * @param {Number} val the numeric value to convert. If not specified, then 0 is used.
 * @param {Number} from <i>[OPTIONAL]</i> the angle unit converting from. This is to be specified by the number units it takes to make a complete circle.  <b>Default: </b><i>PJ.Math.ANGLE_UNIT_TURN</i> (= 1)
 * @param {Number} to <i>[OPTIONAL]</i> the angle unit converting to. This is to be specified by the number units it takes to make a complete circle.  <b>Default: </b><i>PJ.Math.ANGLE_UNIT_TURN</i> (= 1)
 *
 * @returns {Number} the converted value
 */
PJ.Math.convert_angle = function (val, from, to) {
    if (!PJ.isNumber(val)) {
        throw new PJ.IllegalArgumentException('Parameter val must be a number.');
    }
    if (typeof from === 'undefined') {
        from = PJ.Math.ANGLE_UNIT_TURN;
    }
    else if (!PJ.isNumber(from)) {
        throw new PJ.IllegalArgumentException('Parameter from must be a number.');
    }
    if (typeof to === 'undefined') {
        to = PJ.Math.ANGLE_UNIT_TURN;
    }
    else if (!PJ.isNumber(to)) {
        throw new PJ.IllegalArgumentException('Parameter to must be a number.');
    }

    //speed checks
    if (val === 0) {    // is value 0?
        return 0;
    }
    else if (from === to) { // is from and to the same unit?
        return val;
    }
    else {
        var turns = val;

        //convert to turns, if not already in turns
        if (from !== PJ.Math.Trig.ANGLE_UNIT_TURN) {
            turns = val / from;
        }

        //convert from turns to specified angle
        return turns * to;
    }
};
