/*jslint
  indent: 4
*/

function Filter(name, description, func, has_parameter, parameter_regex) {
    'use strict';

    this.name = name;
    this.description = description;
    this.func = func;
    this.has_parameter = has_parameter;
    
    if (this.has_parameter === true && parameter_regex !== undefined && parameter_regex !== null ) {
        this.parameter_regex = new RegExp(parameter_regex);
    } else {
        this.parameter_regex = undefined;
    }
}

Filter.prototype.testParameter = function(parameter) {
    'use strict';

    if (this.has_parameter === undefined || this.has_parameter === null || this.parameter_regex === undefined || this.parameter_regex === null || parameter === undefined || parameter === null || parameter === "") {
        return false;
    }

    if (parameter.match(this.parameter_regex) !== null) {
        return true;
    } else {
        return false;
    }
};

Filter.prototype.filter = function(in_array, parameter) {
    'use strict';

    var ret_array = [];
    
    if (this.has_parameter === true && this.testParameter(parameter) !== true) {
        return ret_array;
    }

    if (this.has_parameter === true) {
        ret_array = in_array.filter(this.func(parameter));
    } else {
        ret_array = in_array.filter(this.func);
    }

    return ret_array;
};