/*jslint
  indent: 4
*/

function Constraints() {
    'use strict';
    
    this.constraints = [];
}

Constraints.prototype.getConstraint = function(con_str) {
    'use strict';
    
    console.log("Constraints :: trying to get constraint: " + con_str);
    
    for (var i in this.constraints) {
        if (con_str === this.constraints[i].value) {
            console.log("Constraints :: found constraint");
            
            return this.constraints[i];
        }
    }
    
    console.log("Constraints :: could not find constraint");
    
    return false;
};

Constraints.prototype.addConstraint = function(constraint) {
    'use strict';
    
    console.log("Constraints :: trying to add constraint: " + constraint.value);

    if (constraint.isValid() === true && this.getConstraint(constraint.value) === false) {
        this.constraints.push(constraint);
        
        console.log("Constraints :: constraint added");
        
        return true;
    } else {
        console.log("ERROR - Constraints :: constraint not added");

        return false;
    }
};

Constraints.prototype.getConstraintsForVariable = function(var_name) {
    'use strict';
    
    var ret_arr = [];
    
    for (var i in this.constraints) {
        if (this.constraints[i].value.indexOf(var_name) !== -1) {
            ret_arr.push(this.constraints[i]);
        }
    }
    
    return ret_arr;
};

Constraints.prototype.testAll = function(var_names, var_values) {
    'use strict';
    
    if (this.constraints.length === 0) {
        console.log("Constraints :: nothing to test");
        
        return true;
    }

    var test_arr = [];
    
    for (var i in var_names) {
        test_arr.push([var_names[i], var_values[i]]);
    }
    
    var retval = [];
    
    this.constraints.forEach(function(e) {
        retval.push(e.test(test_arr));
    });
    
    console.log("Constraints :: found following results for provided constraints: "+ retval);
    
    if (retval.indexOf(false) !== -1 ) {
        console.log("Constraints :: NOT a solution for the provided constraints");
        return false;
    } else {
        console.log("Constraints :: solution for the provided constraints");
        return true;
    }
};