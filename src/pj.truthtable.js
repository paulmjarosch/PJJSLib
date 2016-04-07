/*
 * JavaScript Library
 *
 * Module: TruthTable
 * Requirements: Core
 * Version: 2.0
 * Author: Paul Jarosch
 * Author Site: http://pauljarosch.name
 */
/* global PJ */

/**
 * Truth Table Object
 * <p>The expression parameter must formatted properly. All variables must use <code>v</code> as the variable and be in array notation. For example: a AND b would have to be supplied as: v[0] && v[1], where v[0] represents a and v[1] represents b.</p>
 *
 * @param {String} expression the expression to evaluate. Must be properly formatted (see note above).
 * @param {Number} var_count the number of variables
 */
PJ.TruthTable = function (expression, var_count) {
    if (!PJ.isString(expression)) {
        throw new PJ.IllegalArgumentException("'expression' parameter must be a string");
    }
    else if ((!PJ.isNumber(var_count)) || (!PJ.Numeric.isInteger(var_count)) || (var_count < 0)) {
        throw new PJ.IllegalArgumentException("'var_count' parameter must be a positive integer.");
    }

    //private properties
    var _expr = expression,
        _varCount = var_count,
        _rowCount = Math.pow(2, var_count),
        _results = []
    ;

    //private functions
    /**
     * Get the variable array for the specified row.
     * @param {Number} row the row index
     * @param {Number} vCount the total number of rows
     * @returns {Array} the variable array for the specified row
     */
    var _getVariableArray = function (row, vCount) {
        //convert to binary string and pad
        var seq = PJ.StringUtils.pad(row.toString(2), vCount, '0', PJ.StringUtils.PAD_LEFT);

        //translate into boolean array
        var ar = new Array(seq.length);
        for (var i = 0; i < ar.length; i++) {
            ar[i] = (seq.charAt(i) === '1');
        }

        return ar;
    };

    //calculate results
    for (var curRow = 0; curRow < _rowCount; curRow++) {
        var v = _getVariableArray(curRow, _varCount);
        v.push(PJ.parseBoolean(eval(_expr)));

        _results[curRow] = v;
    }

    //public methods
    /**
     * The raw results array.
     * <p>This array is a multi-dimensional array with all the values necessary to populate the truth table. The last element in each row is final evaluated value for that row.</p>
     *
     * @returns {Array} array of boolean values used to fill a truth table
     */
    this.getResults = function () {
        return _results.slice();
    };

    /**
     * Get the results as an html table.
     *
     * @param {Object} options {OPTIONAL] options
     *  options.id: {String} the table id. Defaults to "truthtable".
     *  options.shorthand: {boolean} flag to indicate the use of shorthand boolean values (T/F) instead of (TRUE/FALSE). Defaults to false.
     *
     * @returns String HTML code layout with no styling
     */
    this.generateHTML = function (options) {
        if (typeof options !== 'object') {
            options = {};
        }
        var id = (typeof options.id !== 'undefined') ? id : "truthtable";
        var shorthand = (typeof options.shorthand !== 'undefined') ? PJ.parseBoolean(options.shorthand) : false;

        //start
        var html = "<table id=\""+ id +"\">";

        //header row - start
        html += "<thead><tr>";

        //variables
        for (var i = 0; i < _varCount; i++) {
            html += "<th>v["+ i +"]</th>";
        }

        //expression
        html += "<th>"+ _expr +"</th>";

        html += "</tr></thead>";
        //header row - end

        //data rows - start
        for (var r = 0; r < _results.length; r++) {
            var row = _results[r];
            html += "<tr>";

            //row values - start
            for (var c = 0; c < row.length; c++) {
                var rcVal = row[c];

                // shorthand T/F values?
                if (shorthand) {
                    rcVal = (rcVal) ? 'T' : 'F';
                }

                html += "<td>"+ rcVal +"</td>";
            }
            //row values - start

            html += "</tr>";
        }
        //data rows - end

        //end
        html += "</table>";

        return html;
    };
};
