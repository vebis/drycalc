/*jslint
  indent: 4
*/

/* global generators_global, filters_global */

function Variable(name, generator, generator_parameter) {
    'use strict';

    this.name = name;
    this.generator = generator;
    this.filters = [];
    if (this.generator !== undefined && this.generator.testParameter(generator_parameter)) {
        this.generator_parameter = generator_parameter;
    } else {
        this.generator_parameter = null;
    }
}

Variable.prototype.addFilter = function(filter, parameter) {
    'use strict';
    
    if (filter.testParameter(parameter)) {
        this.filters.push([filter,parameter]);
    } else {
        this.filters.push([filter]);
    }
};

Variable.prototype.generateCandidates = function() {
    'use strict';
    
    var ret_arr = [];
    
    if (this.generator_parameter !== null) {
        console.log("Variable: " + this.name +" :: generating with generator: " + this.generator.name +" and parameter: " + this.generator_parameter);

        ret_arr = this.generator.genValues(this.generator_parameter);
    } else {
        console.log("Variable: " + this.name +" :: generating with generator: " + this.generator.name +" and without parameter");

        ret_arr = this.generator.genValues();
    }
    
    console.log("Variable: " + this.name +" :: generated following itermediate result set: " + ret_arr);
    return this.applyFilters(ret_arr);
};

Variable.prototype.applyFilters = function(in_arr) {
    'use strict';

    console.log("Variable: " + this.name +" :: applying filters");

    for (var i in this.filters) {
        console.log("Variable: " + this.name +" :: working on filter " + this.filters[i][0].name);
        if (this.filters[i][1] !== undefined) {
            console.log("Variable: " + this.name +" :: working with parameter " + this.filters[i][1]);

            in_arr = this.filters[i][0].filter(in_arr, this.filters[i][1]);
        } else {
            in_arr = this.filters[i][0].filter(in_arr);
        }
    }

    console.log("Variable: " + this.name +" :: results after applying all filters: " + in_arr);
    return in_arr;
};

Variable.prototype.createHtml = function() {
    'use strict';
    
    var ret_val = "";
    
    ret_val +=  '<div class="var" id="var_'+ this.name +'">' +
                    '<p>'+this.name+'</p>' +
                    '<div class="generator">' +
                        '<label>Generator: ';

    if (this.generator !== undefined && this.generator_parameter === undefined) {
        ret_val += generators_global.createHtml(this.generator);
    } else if (this.generator !== undefined && this.generator_parameter !== undefined && this.generator_parameter !== null) {
        ret_val += generators_global.createHtml(this.generator, this.generator_parameter);
    } else {
        ret_val += generators_global.createHtml();
    }

    ret_val +=          '</label>' +
                    '</div>' +
                    '<div class="filter_container">' +
                        '<label>Filter <a href="#" class="filter-add">+</a>:' +
                            '<div class="filters">';
    if (this.filters.length>0) {
        for (var i in this.filters) {
            console.log(this.filters[i])
            if (this.filters[i][0].has_parameter === true && this.filters[i][1] !== undefined) {
                ret_val += filters_global.createHtml(this.filters[i][0], this.filters[i][1]);
            } else {
                ret_val += filters_global.createHtml(this.filters[i][0]);
            }
        }
    }
    
    ret_val +=              '<div/>' +
                        '</label>' +
                    '</div>' +
                '</div>';
        
    return ret_val;
};