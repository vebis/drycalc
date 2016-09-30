/*jslint
  indent: 4
*/

/* global cs, constraints_global */

function VariableSystem() {
    'use strict';
    
    this.variables = [];
}

VariableSystem.prototype.getVariable = function(name) {
    'use strict';

    if (name === undefined || name === null || name === "") {
        return false;
    }

    for (var i in this.variables) {
        if (this.variables[i].name === name) {
            return this.variables[i];
        }
    }

    return false;
};

VariableSystem.prototype.addVariable = function(variable) {
    'use strict';
    
    if (variable !== undefined && this.variables.indexOf(variable) < 0 && !this.getVariable(variable.name)) {
        this.variables.push(variable);
        
        return true;
    }
    
    return false;
};

VariableSystem.prototype.addConstraints = function(constraints) {
    'use strict';
    
    this.constraints = constraints;
};

VariableSystem.prototype.fill = function() {
    'use strict';
    
    for(var i in this.variables) {
        this.variables[i].values = this.variables[i].generateCandidates();
    }
};

VariableSystem.prototype.solve = function() {
    'use strict';
    
    this.fill();

    var ret_arr = [];
    
    function crossProduct(sets) {
        var n = sets.length, carets = [], args = [];

        function init() {
            for (var i = 0; i < n; i++) {
                carets[i] = 0;
                args[i] = sets[i][0];
            }
        }

        function next() {
            if (!args.length) {
                init();
                return true;
            }
            
            var i = n - 1;
            carets[i]++;
            
            if (carets[i] < sets[i].length) {
                args[i] = sets[i][carets[i]];
                return true;
            }
            
            while (carets[i] >= sets[i].length) {
                if (i === 0) {
                    return false;
                }
                
                carets[i] = 0;
                args[i] = sets[i][0];
                carets[--i]++;
            }
        
        args[i] = sets[i][carets[i]];
        return true;
        
        }

        return {
            next: next,
            do: function (block, _context) {
                    return block.apply(_context, [args]);
            }
        };
    };

    var var_names = [];
    var var_values = [];
    for (var i in this.variables) {
        // array of variable names
        var_names.push(this.variables[i].name);
        // array of values to build cartesian product
        var_values.push(this.variables[i].values);
    }

    
    function tester(in_arr) {
        if (this.constraints !== undefined && this.constraints.testAll(var_names, in_arr) === true) {
            console.log("VariableSystem :: found solution: " + in_arr);
            
            var ret_arr = [];
            for (var i in in_arr) {
                ret_arr.push(in_arr[i]);
            }
            return ret_arr;
        } else {
            return null;
        }
    }

    console.log("VariableSystem :: starting to iterate over every possible solution");

    var ws = crossProduct(var_values);
    while (ws.next()) {
        // test if the values are a valid solution
        var tmp_arr = ws.do(tester, this);
        if (tmp_arr !== null) {
            ret_arr.push(tmp_arr);
        }
    }
    
    if (ret_arr.length>0) {
        console.log("VariableSystem :: found " + ret_arr.length + " solution(s)");
        
        return { names: var_names, solutions: ret_arr};
    } else {
        console.log("VariableSystem :: found NO solution");
        
        return false;
    }
};