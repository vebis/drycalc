/*jslint
  indent: 4
*/

/*global
*/

function Generator(name, description, func, has_parameter, parameter_regex) {
    'use strict';

    this.name = name;
    this.description = description;
    this.has_parameter = has_parameter;
    this.retval = [];
    this.func = func;

    if (this.has_parameter === true && parameter_regex !== undefined && parameter_regex !== null) {
        this.parameter_regex = new RegExp(parameter_regex);
    } else {
        this.parameter_regex = undefined;
    }
}

Generator.prototype.testParameter = function(parameter) {
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

Generator.prototype.genValues = function(parameter) {
    'use strict';

    var retval = [];

    console.log("Generator: " + this.name + " :: starting generation of values");
    if (this.has_parameter === true && this.testParameter(parameter) !== true) {
        console.log("Generator: " + this.name + " :: parameter is set, but not appropriate: " + parameter);
        
        return retval;
    }

    if (this.has_parameter === true) {
        console.log("Generator: " + this.name + " :: executing function with parameter");

        retval = this.func(parameter);
    } else {
        console.log("Generator: " + this.name + " :: executing function without parameter");

        retval = this.func();
    }

    return retval;
};