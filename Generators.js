/*jslint
  indent: 4
*/

/*global
*/

function Generators() {
    'use strict';

    this.generators = [];
}

// function to add a generator to the generators container
Generators.prototype.addGenerator = function(generator) {
    'use strict';

    this.generators.push(generator);
};

// get's you the generator by its name
Generators.prototype.getGenerator = function(name) {
    'use strict';

    if (name === undefined || name === null || name === "") {
        return false;
    }

    for (var i in this.generators) {
        if (this.generators[i].name === name) {
            return this.generators[i];
        }
    }

    return false;
};

// create html list of generator with optionally preselected generator and parameter
Generators.prototype.createHtml = function(generator, generator_param) {
    'use strict';
    
    var out = '<select id="gen">';
    this.generators.forEach(function(element) {
        'use strict';

        var op_class = "gen_o-no";

        if (element.has_parameter === true) {
            op_class = "gen_o-yes";
        }

        if (generator !== undefined && generator.name === element.name) {
            out += '<option class="'+op_class+'" id="'+element.name+'" selected>'+element.description+'</option>';
        } else {
            out += '<option class="'+op_class+'" id="'+element.name+'">'+element.description+'</option>';
        }
    });
    
    if (generator_param !== undefined) {
        out += '<input type="text" id="gen_o" value="' + generator_param +'"/>';
    } else {
        out += '<input type="text" id="gen_o" disabled/>';
    }

    out += "</select>";

    return out;
};