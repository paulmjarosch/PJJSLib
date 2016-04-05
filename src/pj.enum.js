/*
 * JavaScript Library
 *
 * Module: Enumeration Object
 * Requirements: Core
 * Version: 4.0
 * Author: Paul Jarosch
 * Author Site: http://pauljarosch.name
 */
/* global PJ */

//additions to Core
/**
 * Enum Constant Not Present Exception
 * <p>Thrown if an Enumeration object does not contain the specified name.</p>
 *
 * @param {String} message the error message (optional)
 */
PJ.EnumConstantNotPresentException = function (message) {
    PJ.Exception.call(this, "EnumConstantNotPresentException", message);
};
PJ.EnumConstantNotPresentException.prototype = Object.create(PJ.Exception.prototype);
PJ.EnumConstantNotPresentException.prototype.constructor = PJ.EnumConstantNotPresentException;

/**
 * Enum Class Construct
 * <p>Adapted from Node-Enum by Tolgaek (https://github.com/tolgaek/node-enum)</p>
 * <p>Checks each argument for validity. If an argument fails the validity test, an exception is thrown.</p>
 *
 * @param {...String} _args variable length parameter list of strings as the names for each Enum Constant.
 * @throws {PJ.IllegalArgumentException} thrown if and invalid identifier is given or if an identifier is given twice
 */
PJ.Enum = function (_args) {
    var _values = [];
    var _size = 0;

    var re_varName = /^[a-zA-Z_][a-zA-Z0-9_]*$/i;

    //process arguments, creating enumeration constants
    for (var i = 0; i < arguments.length; i++) {
        var key = arguments[i];
        if (PJ.isString(key)) {
            if (!re_varName.test(key)) { //is valid as a property name?
                throw new PJ.IllegalArgumentException('Invalid identifier: ' + key);
            }
            else {
                if (typeof this[key] === 'undefined') {
                    throw new PJ.IllegalArgumentException('Duplicate Enumeration Constant' + key);
                }
                else {//only add if not already set
                    this[key] = _size++;
                    _values.push(key);
                }
            }
        }
    };

    /**
     * Get the enumerated values.
     * <p>Changes in the returned array will not modify this enumeration.</p>
     * @returns {Array} array of enumerated values
     */
    this.values = function () {
        return _values.slice(); //clone array
    };

    /**
     * Get the number of constants in this enumeration.
     * @returns {Number} the number of elements
     */
    this.size = function () {
        return _size;
    };

    /**
     * Get the Enumeration Constant by its name.
     *
     * @param {String} name the name of the enum constant. This must match exactly, including case.
     * @throws {PJ.IllegalArgumentException} if name is not set, not a string, or not a valid identifier
     * @throws {PJ.EnumConstantNotPresentException} if there is no constant with the specified name
     */
    PJ.Enum.prototype.valueOf = function(name) {
        if (!PJ.isSet(name)) {
            throw new PJ.IllegalArgumentException("name is required");
        }
        else if (!PJ.isString(name)) {
            throw new PJ.IllegalArgumentException("name must be a string");
        }
        else if (new RegExp("/^[a-zA-Z_][a-zA-Z0-9_]*$/i").test(name)) {
            throw new PJ.IllegalArgumentException("name is not a valid identifier");
        }
        else {
            for (var ec in this) {
                if (this.hasOwnProperty(ec)) {
                    if (ec === name) {
                        return this[ec];
                    }
                }
            }

            throw new PJ.EnumConstantNotPresentException("'" + name + "' does not exist in this enumeration.");
        }
    };

    /**
     * Returns "Enumeration";
     */
    PJ.Enum.prototype.toString = function() {
        return "Enumeration";
    };
};