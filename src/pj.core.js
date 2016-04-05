/*
 * JavaScript Library
 *
 * Module: Core
 * Requirements: None
 * Version: 4.0
 * Author: Paul Jarosch
 * Author Site: http://pauljarosch.name
 */

//namespace
var PJ = PJ || {};

//info
/**
 * Version
 * @type String the version string
 */
PJ.version = '4.0';
/**
 * Name
 * @type String the name of this module
 */
PJ.name = 'Core';

// override default toString
PJ.toString = function () {
    return 'PJ JavaScript Library '+ PJ.name +' v'+ PJ.version;
};

//constants
/**
 * Array Data Type
 * @type String 'array'
 */
PJ.DATA_TYPE_ARRAY = 'array';
/**
 * Boolean Data Type
 * @type String 'boolean'
 */
PJ.DATA_TYPE_BOOLEAN = 'boolean';
/**
 * Date Data Type
 * @type String 'date'
 */
PJ.DATA_TYPE_DATE = 'date';
/**
 * Number Data Type
 * @type String 'number'
 */
PJ.DATA_TYPE_NUMBER = 'number';
/**
 * Object Data Type
 * @type String 'object'
 */
PJ.DATA_TYPE_OBJECT = 'object';
/**
 * String Data Type
 * @type String 'string'
 */
PJ.DATA_TYPE_STRING = 'string';

//static methods
/**
 * 'typeof' operator replacement function
 * <p>Adapted from 'toType' by Angus Croll (http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/)</p>
 *
 * @param {Object} obj the object to process
 * @returns {String} lowercase type string
 */
PJ.typeOf = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

/**
 * Compares the type of obj against type.
 * @param {Object} obj the object to test
 * @param {String} type the object's type
 * @returns {Boolean} true if the object of type; otherwise false
 */
PJ.isTypeOf = function (obj, type) {
    return PJ.typeOf(obj) === type;
};

/**
 * Checks if the object is an array.
 * @param {Object} obj the object to test
 * @returns {Boolean} true if obj is an array; false otherwise
 */
PJ.isArray = function (obj) {
    return PJ.isTypeOf(obj, PJ.DATA_TYPE_ARRAY);
};

/**
 * Checks if the object is a boolean.
 * @param {Object} obj the object to test
 * @returns {Boolean} true if obj is an boolean; false otherwise
 */
PJ.isBoolean = function (obj) {
    return PJ.isTypeOf(obj, PJ.DATA_TYPE_BOOLEAN);
};

/**
 * Checks if the object is a date.
 * @param {Object} obj the object to test
 * @returns {Boolean} true if obj is a date; false otherwise
 */
PJ.isDate = function (obj) {
    return PJ.isTypeOf(obj, PJ.DATA_TYPE_DATE);
};

/**
 * Checks if the object is a number.
 * @param {Object} obj the object to test
 * @returns {Boolean} true if obj is a number; false otherwise
 */
PJ.isNumber = function (obj) {
    if (PJ.isTypeOf(obj, PJ.DATA_TYPE_NUMBER)) {
        return !isNaN(obj);
    }

    return false;
};

/**
 * Checks if the object is an object.
 * @param {Object} obj the object to test
 * @returns {Boolean} true if obj is an object; false otherwise
 */
PJ.isObject = function (obj) {
    return PJ.isTypeOf(obj, PJ.DATA_TYPE_OBJECT);
};

/**
 * Checks if the object is a string.
 * @param {Object} obj the object to test
 * @returns {Boolean} true if obj is an string; false otherwise
 */
PJ.isString = function (obj) {
    return PJ.isTypeOf(obj, PJ.DATA_TYPE_STRING);
};

/**
 * Parses the specified object into a boolean value.
 * <p>This method uses the below rules to determine the object's boolean value.</p>
 * <p><ul>
 * <li>If obj is null, false is returned.</li>
 * <li>If obj is a boolean primitive, its value is returned.</li>
 * <li>If obj is a numeric value of 1.</li>
 * <li>If obj is an object, then toString() is called and is tested using the next rule.</li>
 * <li>If obj is a string, or toString() was called on obj (previous condition), then the string value is trimmed, and converted to lowercase and tested to see if matches one of the following string values: 't', 'true', '1', 'yes', 'y', 'on'. If it does, true is returned, otherwise false.</li>
 * <li>All other cases return false.</li>
 * </ul></p>
 *
 * @param {Object} obj the object to test
 * @returns {Boolean} the boolean value the object represents or false if a boolean value could not be determined
 */
PJ.parseBoolean = function (obj) {
    if (obj !== null) {
        switch (PJ.typeOf(obj)) {
            case 'boolean':
                return obj;
                break;
            case 'number':
                return (obj === 1);
                break;
            case 'object':
                obj = obj.toString();
            case 'string':
                switch (obj.toLowerCase().trim()) {
                    case 't':
                    case 'true':
                    case '1':
                    case 'yes':
                    case 'y':
                    case 'on':
                        return true;
                    default:
                        return false;
                }
                break;
            case 'date':
            case 'array':
            default:
                return false;
        }
    }
    else {
        return false;
    }
};

//classes
/**
 * Exception Class
 * @param {String} name the name of the exception
 * @param {String} message the error message (optional)
 */
PJ.Exception = function(name, message) {
    this.name = PJ.isString(name) ? (name.length !== 0 ? name : 'Exception') : 'Exception';
    this.message = PJ.isString(message) ? (message.length !== 0 ? message : '') : '';

    /**
     * Get the string representation of this Exception.
     *
     * <p>If there was message specified, then the returned string includes that message. Otherwise, just the name of the exception is returned.</p>
     *
     * @returns {String} the string representation.
     */
    PJ.Exception.prototype.toString = function () {
        if (this.message.trim().length === 0) {
            return this.name;
        }
        else {
            return this.name + ': ' + this.message;
        }
    };
};

/**
 * Illegal Argument Exception
 * <p>Thrown when one or more arguments are not valid for any reason.</p>
 *
 * @param {String} message the error message (optional)
 */
PJ.IllegalArgumentException = function (message) {
    PJ.Exception.call(this, 'IllegalArgumentException', message);
};
PJ.IllegalArgumentException.prototype = Object.create(PJ.Exception.prototype);
PJ.IllegalArgumentException.prototype.constructor = PJ.IllegalArgumentException;

/**
 * Unsupported Operation Exception
 * <p>Thrown when a method has not yet been implemented or is not supported.</p>
 *
 * @param {String} message the error message (optional)
 */
PJ.UnsupportedOperationException = function (message) {
    PJ.Exception.call(this, 'UnsupportedOperationException', message);
};
PJ.UnsupportedOperationException.prototype = Object.create(PJ.Exception.prototype);
PJ.UnsupportedOperationException.prototype.constructor = PJ.UnsupportedOperationException;

/**
 * Not Numeric Excepion
 * <p>Thrown if a numeric value was expected but some non numeric value was found instead.</p>
 *
 * @param {String} type of the actual object type found. (optional)
 */
PJ.NotNumericException = function (type) {
    var typeStr = ((typeof type !== 'undefined') && (type !== null)) ? (', but found:' +type.toString()+ '.') : '.';
    var message = 'Numeric value expected' + typeStr;
    PJ.Exception.call(this, 'NotNumericException', message);
};
PJ.NotNumericException.prototype = Object.create(PJ.Exception.prototype);
PJ.NotNumericException.prototype.constructor = PJ.NotNumericException;