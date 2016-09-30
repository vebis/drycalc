/*jslint
  indent: 4
*/
function iqs(a) {
    'use strict';
    
    return a < 10 ? a : a % 9;
}
function Constraint(constraint) {
    'use strict';

    console.log('Constraint: "' + constraint + '" :: trying to create constraint');

    this.token = new RegExp("([A-Z])", 'gi');

    if (constraint !== undefined && typeof(constraint) === 'string') {
        constraint = constraint.toUpperCase();
        
        var token_match = constraint.match(this.token);

        if (token_match !== null && token_match.length>0) {
            this.value = constraint;
            this.variables = token_match;
            console.log('Constraint: "' + this.value + '" :: creating  with following variables: ' + this.variables);
        }
    } else {
        console.log('ERROR - Constraint: "' + constraint + '" :: error trying to create proper constraint');
    }
}

Constraint.prototype.contains = function(name) {
    'use strict';
    
    if (this.variables.indexOf(name) > -1) {
        console.log('Constraint: "' + this.value + '" :: containes: ' + name);
    } else {
        console.log('Constraint: "' + this.value + '" :: does not contain: ' + name);
    }
    return this.variables.indexOf(name) > -1;
};

Constraint.prototype.isValid = function() {
    'use strict';
    
    if (typeof(this.value) === 'string' && this.variables.length > 0) {
        console.log('Constraint: "' + this.value + '" :: is valid');
        
        return true;
    } else {
        console.log('ERROR - Constraint: "' + this.value + '" :: is not valid');
        
        return false;
    }
};

Constraint.prototype.test = function(in_arr) {
    'use strict';
    
    console.log('Constraint: "' + this.value + '" :: testing with following input array: ' + in_arr);
    var con = this.value;

    for (var i in in_arr) {
        var v = in_arr[i][0];
        var n = in_arr[i][1];
        if (this.contains(v) === true) {
            console.log('Constraint: "' + this.value + '" :: variable ' + v + " applys with: " + n);
            con = con.replace(v, n);
            console.log('Constraint: "' + this.value + '" :: resulting constraint: ' + con);
        }
    }
    
    var test_match = con.match(this.token);

    if (test_match !== null && test_match.length>0) {
        console.log('ERROR - Constraint: "' + this.value + '" :: provided variables not sufficient');

        return null;
    } else {
        return eval(con);
    }
};

Constraint.prototype.createHtml = function() {
    'use strict';
    
    var out = '<div class="con">';
    
    if (this.value !== undefined) {
        out += '<input value="'+this.value+'"/>';
    } else {
        out += '<input value=""/>';        
    }
    
    out += '<a class="con-del" href="#">-</a></div>';
    
    return out;
};