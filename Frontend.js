/*jslint
  indent: 4
*/

/* global generators_global, filters_global, waypoints_global */

// create variable inputs in "variables" div 
function createVarInput(element, index, array) {
    'use strict';
    
    if (typeof(element) === 'string' && ! $( "#var_" + element ).length) {
        $( "#variables" ).append((new Variable(element)).createHtml());
    } else if (typeof(element) === 'object' && ! $( "#var_" + element.name ).length) {
        $( "#variables" ).append(element.createHtml());
    }
}

// 
// waypoint handlers
// 

// parse function of waypoints
$( "a#parse" ).click(function() {
    // reset all variables
    $( "div#variables" ).empty();
    // parse every waypoint and create variable inputs for found variables
    $( ".wp" ).each(function() {
        console.log('Frontend: a#parse :: trying to parse waypoint: "' + $( this ).attr("id") + '" with value: "' + $( this ).val() + '"');

        var wp = new Waypoint($( this ).attr("id"), $( this ).val());
        var color = "red";
        
        if (wp !== null && wp.isValid() === true) {
            console.log('Frontend: a#parse :: coordinates parsed successfully of waypoint "' + wp.name + '"');
            color = "green";
            waypoints_global.addWaypoint(wp);
        } else {
            console.log("Frontend: a#parse :: Could not parse waypoint data for waypoint: " + $( this ).attr("id"));
        }
        
        $( "#"+$( this ).attr("id") ).attr( "style", "border-color: "+color+";");
    });
    
    waypoints_global.getAllVariables().forEach(createVarInput);
});

// register add button for waypoints
function addWaypoint(id, value) {
    if (id !== undefined && value !== undefined) {
        var wp = new Waypoint(id, value);
    } else {
        var new_id = $( "input.wp" ).length + 1;
        var wp = new Waypoint(new_id);
    }
    $( "#waypoints" ).append(wp.createHtml());
    console.log("Added new waypoint:"+ wp.name);
}
$( "a.wp-add" ).click(addWaypoint);

// register delete button for waypoints on body
$( "body" ).on('click', "a.wp-del", function() {
    console.log("Trying to remove waypoint");
    if ($( this ).parent().parent().remove()) {
          console.log("Waypoint removed");
    }
});

// 
// variables handlers
//

// add filter of variable
$( "body" ).on('click', "a.filter-add",  function() {
  // get the variable for which we are adding the filter
  console.log("Frontend: a.filter-add :: adding filter of variable: " + $( this ).parent().parent().parent().attr("id"));
  $(this).parent().parent().find(".filters").append(filters_global.createHtml());
});
// remove filter of variable
$( "body" ).on('click', "a.filter-del",  function() {
  console.log("Frontend: a.filter-del :: removing filter of variable: " + $( this ).parent().parent().parent().parent().parent().attr("id"));
  $( this ).parent().remove();
});
// disable option field for generators_global
$( "body" ).on('click', "select#gen", function() {
  if ($(this).parent().find("#gen option:selected").attr("class") === "gen_o-no") {
         console.log("Frontend: select#gen :: generator has no parameter");
	$(this).parent().find("input#gen_o").prop("disabled", true);
  } else {
        console.log("Frontend: select#gen :: generator has paramter");
	$(this).parent().find("input#gen_o").prop("disabled", false);
  }
});

// read in all variables
$( "a#solve" ).click(function() {
  var vs_global = new VariableSystem();
  console.log("Frontend: a#solve :: Reading in all variables");
  $( ".var" ).each(function() {
    var name = $(this).attr("id").substr(4);
    var working_var = undefined;
    var gen = generators_global.getGenerator($(this).find("#gen option:selected").attr('id'));
    console.log("Frontend: a#solve :: working on variable: " + $(this).attr("id") + " with generator: " + gen.name);

      if (working_var !== null && gen !== false) {
      console.log("Frontend: a#solve :: object for variable " + name + " created");
	  if ($(this).find("#gen option:selected").attr("class") === "gen_o-no") {
		console.log("Frontend: a#solve :: generator has no option");

              working_var = new Variable(name, gen);
	  } else {
		console.log("Frontend: a#solve :: generator has option");

              working_var = new Variable(name, gen, $(this).find("#gen_o").val());
	  }
          $( this ).find(".filter").each(function() {
              var tmp_filter = filters_global.getFilter($(this).find("#fil option:selected").attr('id'));
              
              console.log("Frontend: a#solve :: Working on filter: " + tmp_filter.name);

              if ($(this).find("#fil option:selected").attr("class") === "fil_o-no") {
                  working_var.addFilter(tmp_filter);
              } else {
                  working_var.addFilter(tmp_filter, $(this).find("#fil_o").val());
              }
          });

          vs_global.addVariable(working_var);
    } else {
      console.log("Frontend: a#solve :: could not parse variable");
    }
  });
  var cs_global = new Constraints();
  $( "div.con" ).each(function() {
      var value = $(this).find("input").val();
      if (value !== undefined && typeof(value) === 'string' && value !== '') {
          cs_global.addConstraint(new Constraint(value));
      }
  });
  vs_global.addConstraints(cs_global);
  
  res = vs_global.solve();
  console.log(waypoints_global.evalAllWaypoints(res));
});

// disable option field for filters_global
$( "body" ).on('click', "select#fil", function() {
  if ($(this).parent().find("#fil option:selected").attr("class") === "fil_o-no") {
         console.log("Frontend: select#fil :: filter has no parameter");
	$(this).parent().find("input#fil_o").prop("disabled", true);
  } else {
        console.log("Frontend: select#fil :: filter has paramter");
	$(this).parent().find("input#fil_o").prop("disabled", false);
  }
});


function addConstraint(value) {
    console.log(value);
    if (value !== undefined && typeof(value) === 'string') {
        var con = new Constraint(value);
    } else {
        var con = new Constraint();
    }
    $( "#constraints" ).append(con.createHtml());
    console.log("Frontend: addConstraint :: added new constraint: " + con.value);
}
$( "a.con-add" ).click(addConstraint);

// register delete button for constraint on body
$( "body" ).on('click', "a.con-del", function() {
    console.log("Frontend: a.con-del :: trying to remove constraint");
    if ($( this ).parent().remove()) {
          console.log("Frontend: a.con-del :: constraint removed");
    }
});