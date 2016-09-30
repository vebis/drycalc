/*jslint
  indent: 4
*/

// supplies container for filters
function Filters() {
    'use strict';

    this.filters = [];
}

// function to add a filter to the filters container
Filters.prototype.addFilter = function(filter) {
    'use strict';

    this.filters.push(filter);
};

// get's you the filter by its name
Filters.prototype.getFilter = function(name) {
    'use strict';

    if (name === undefined || name === null || name === "") {
        return false;
    }

    for (var i in this.filters) {
        if (this.filters[i].name === name) {
            return this.filters[i];
        }
    }

    return false;
};

// helper function to have the dropdown menu in sync
Filters.prototype.createHtml = function(filter, filter_param) {
    'use strict';

    var out = '<div class="filter"><select id="fil">';

    this.filters.forEach(function(element) {
        var op_class = "fil_o-no";

        if (element.has_parameter === true) {
            op_class = "fil_o-yes";
        }

        if (filter !== undefined && filter.name === element.name) {
            out += '<option class="'+op_class+'" id="'+element.name+'" selected>'+element.description+'</option>';
        } else {
            out += '<option class="'+op_class+'" id="'+element.name+'">'+element.description+'</option>';
        }
    });
    
    out += '</select>';
    console.log(filter_param);
    if (filter_param !== undefined) {
        out += '<input type="text" id="fil_o" value="'+filter_param+'"/>';
    } else {
        out += '<input type="text" id="fil_o" disabled/>';
    }
    
    out += '<a class="filter-del" href="#">-</a></div>';

    return out;
};