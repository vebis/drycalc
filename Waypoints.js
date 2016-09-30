/*jslint
  indent: 4
*/

function Waypoints() {
    'use strict';
    
    this.waypoints = [];
}

Waypoints.prototype.getWaypoint = function(name) {
    'use strict';

    if (name === undefined || name === null || name === "") {
        return false;
    }

    for (var i in this.waypoints) {
        if (this.waypoints[i].name === name) {
            return this.waypoints[i];
        }
    }

    return false;
};

Waypoints.prototype.addWaypoint = function(waypoint) {
    'use strict';

    if (waypoint !== undefined && this.waypoints.indexOf(waypoint) < 0 && !this.getWaypoint(waypoint.name)) {
        this.waypoints.push(waypoint);
    }
};

Waypoints.prototype.getAllVariables = function() {
    'use strict';
    
    var ret_arr = [];
    
    for (var i in this.waypoints) {
        for (var j in this.waypoints[i].vars) {
            ret_arr.push(this.waypoints[i].vars[j]);
        }
    }
    
    return ret_arr.filter(function(value, index, self) { return self.indexOf(value) === index; }).sort();
};

Waypoints.prototype.evalAllWaypoints = function(variables) {
    var ret_arr = [];
    var bad_arr = [];
    
    for (var i in this.waypoints) {
        for (var j in variables.solutions) {
            var res = this.waypoints[i].getEvaledCoords(variables.names, variables.solutions[j]);

            if (res !== undefined && typeof(res) === 'string' && res !== 'missing-variables') {
                // we got a good set of variables
                ret_arr.push([this.waypoints[i].name, res, variables.names, variables.solutions[j]]);
            }
            if (res === false) {
                // collecting bad sets of variables
                bad_arr.push(variables.solutions[j]);
            }
            
            if (res === 'missing-variables') {
                break;
            }
        }
    }
    
    
    for (var i in ret_arr) {
        if (ret_arr[i] !== undefined) {
            for (var j in bad_arr) {
                if (ret_arr[i] !== undefined && ret_arr[i][3] === bad_arr[j]) {
                    ret_arr.splice(i, 1);
                    
                    break;
                }
            }
        }
    }
    return ret_arr;
};

var waypoints_global = new Waypoints();