/*
 * JavaScript Library
 *
 * Module: StringUtils
 * Requirements: Core, Numerics
 * Version: 1.0
 * Author: Paul Jarosch
 * Author Site: http://pauljarosch.name
 */
/* global PJ */

//namespace
PJ.StringUtils = {};

//info
/**
 * Version
 * @type String the version string
 */
PJ.StringUtils.version = '1.0';
/**
 * Name
 * @type String the name of this module
 */
PJ.StringUtils.name = 'StringUtils';

// override default toString
PJ.StringUtils.toString = function () {
    return "PJ JavaScript Library " + PJ.name + " Module v" + PJ.version;
};

//constants
/**
 * Pad Left option
 * @type Number
 */
PJ.StringUtils.PAD_LEFT = 0;
/**
 * Pad Right option
 * @type Number
 */
PJ.StringUtils.PAD_RIGHT = 1;
/**
 * Pad Both option
 * @type Number
 */
PJ.StringUtils.PAD_LEFT = 2;

//static methods
/**
 * Parse Query String into array of key / value pairs.
 *
 * <p>If there are multiple keys with the same name, the value for that key will be an array of values. This can process multiple keys names with and without brackets..</p>
 *
 * @param {String} qs the query string to process. This can include the preceeding question mark symbol. This symbol will be ignored.
 *
 * @returns array of key/value pairs
 */
PJ.StringUtils.parseQueryString = function (qs) {
    var params = [];//create params array

    if ((typeof qs === 'undefined') || (qs === null)) {
        qs = window.location.search;
    }

    if (PJ.isString(qs)) {
        //prepare
        qs = qs.trim();
        if (qs.charAt(0) === "?") { //remove ? character
            qs = qs.substr(1);
        }

        //split up into pairs
        var qsAr = qs.split("&");
        var re = /\+/g;
        for (var i = 0; i < qsAr.length; i++) {
            var pair = qsAr[i].split("=",2);
            var key = pair[0];

            //clean key
            key = key.replace(/\[.*\]/i, "");   //remove brackets (and text within)

            //is there a key? and is there a key/value pair
            if ((pair.length === 2) && (key.length > 0)) {
                var value = decodeURIComponent(pair[1].replace(re, " "));

                //process key / value pair
                if (typeof params[key] !== 'undefined') {   //we do have this key yet
                    params[key] = value;
                }
                else {  //this key is already assigned a value
                    var prevVal = params[key];

                    if (PJ.isString(prevVal)) { //previous value was string type. Create array of values and assign to key.
                        var tmpAr = [];
                        tmpAr.push(prevVal, value);
                        params[key] = tmpAr;
                    }
                    else if (PJ.isArray(prevVal)) { //previous value was array type. Add new element to array.
                        params[key].push(value);
                    }
                }

                if (pair.length === 1) {    //parameter has no value
                    params[pair[0]] = "";
                }
                else {
                    params[pair[0]] = decodeURIComponent(pair[1].replace(re, " "));
                }
            }
        }
    }

    return params;
};

/**
 * Pads a string with the specified character until the specified length is reached.
 * <p>If the length of the string is greater than or equal to len, then the original string is returned.</p>
 *
 * @param {String} str the to string to pad. Defaults to empty string.
 * @param {Number} len the total length of the string after padding. Defaults to length of string.
 * @param {String} ch the character (or string) to pad with. Defaults to empty space ( ).
 * @param {Number} opt <i>[OPTIONAL]</i> the direction to pad. One of the following PJ.StringUtil.PAD_BOTH, PJ.StringUtil.PAD_LEFT, PJ.StringUtil.PAD_RIGHT. Defaults to PJ.StringUtil.PAD_BOTH.
 *
 * @returns {String} the padded string
 */
PJ.StringUtils.pad = function (str, len, ch, opt) {
    //-str
    if (!PJ.isString(str)) {
        throw new PJ.IllegalArgumentException("'str' parameter is required and must be a string.");
    }
    //-len
    if (PJ.isNumber(len)) {
        if (!PJ.Numeric.isInteger(len) || (len < 0)) {
            throw new PJ.IllegalArgumentException("'len' parameter is required and must be a positive integer.");
        }
    }
    else {
        throw new PJ.IllegalArgumentException("'len' parameter is required and must be a positive integer.");
    }
    //-ch
    if (!PJ.isString(ch) || (ch.length === 0)) {
        ch = " ";
    }

    //speed check
    if (str.length >= len) {
        return str;
    }
    else {
        //padding vars
        var totalPadSize = len - str.length,
            padLeftSize = 0,
            padRightSize = 0,
            padLeftStr = "",
            padRightStr = "";


        //calculate pad sizes
        switch (opt) {
            case PJ.StringUtils.PAD_RIGHT:
                padRightSize = totalPadSize;
                break;
            case PJ.StringUtils.PAD_LEFT:
                padLeftSize = totalPadSize;
                break;
            default:
            case PJ.StringUtils.PAD_BOTH:
                padLeftSize = Math.ceil(totalPadSize / 2);
                padRightSize = totalPadSize - padLeftSize;
                break;
        }

        //generate pads
        //-left pad
        if (padLeftSize > 0) {
            padLeftStr = Array(padLeftSize + 1).join(ch).substr(0, padLeftSize);
        }
        //-right pad
        if (padRightSize > 0) {
            padRightStr = Array(padRightSize + 1).join(ch).substr(0, padRightSize);
        }

        //return padded string
        return padLeftStr + str + padRightStr;
    }
};
