/*jslint
  indent: 4
*/

/* global global_correct_mm, Coordinates, google, map */

function Waypoint(name, coords) {
    'use strict';
    
    console.log("Waypoint: " + name + " :: creating waypoint with: " + coords);

    this.name = name;
    
    var reWp = /([NS])[ ]{0,1}([0-9A-Z\+\-\*\:\/\(\)\^]+)[ °]{1,}([0-9A-Z\+\-\*\:\/\(\)\^]{1,})[\.\,]\ ?([0-9A-Z\+\-\*\:\/\(\)\^]+)[\ \;\&\t]+([OEW])[ ]{0,1}([0-9A-Z\+\-\*\:\/\(\)\^]+)[ °]{1,}([0-9A-Z\+\-\*\:\/\(\)\^]{1,})[\.\,]\ ?([0-9A-Z\+\-\*\:\/\(\)\^]+)/i;

    console.log("Waypoint: " + this.name  + " :: trying to parse coordinates");
    
    if (coords === undefined) return;
    
    var match = reWp.exec(coords.toUpperCase().replace(/\s+/g, ' ').replace(/:/g, '/'));

    if (match !== null) {
        console.log("Waypoint: " + this.name  + " :: seems parsable");
        
        this.lat_pf = match[1].replace(/\s/g, '');
        this.lat_d = match[2].replace(/\s/g, '');
        this.lat_mm = match[3].replace(/\s/g, '');
        this.lat_mmm = match[4].replace(/\s/g, '');
        this.lon_pf = match[5].replace(/\s/g, '');
        this.lon_d = match[6].replace(/\s/g, '');
        this.lon_mm = match[7].replace(/\s/g, '');
        this.lon_mmm = match[8].replace(/\s/g, '');

        var coord_wo_prefix = this.lat_d + this.lat_mm + this.lat_mmm + this.lon_d + this.lon_mm + this.lon_mmm;
        var tmp_vars = [];
        var result = coord_wo_prefix.match(new RegExp(/([A-Z])/ig));

        if (result !== null) {
            for (var i=1;i<=result.length;i++) {
                if (result[i] !== undefined) {
                    tmp_vars.push(result[i]);
                }
            }
        }
        this.vars = tmp_vars.filter(function(value, index, self) { return self.indexOf(value) === index; }).sort();
    } else {
        console.log("Waypoint: " + this.name  + " :: is not parsable");
    }
}

Waypoint.prototype.isValid = function() {
    'use strict';
    
    if (typeof(this.name) !== 'string') return false;
    if (typeof(this.lat_d) !== 'string') return false;
    
    return true;
};

Waypoint.prototype.getNormalizedCoords = function() {
    'use strict';
    
    if (this.isValid() === false) {
        return "";
    } else {
        return this.lat_pf + this.lat_d + " " + this.lat_mm + "." + this.lat_mmm + " " + this.lon_pf + this.lon_d + " " + this.lon_mm + "." + this.lon_mmm;
    }
};

Waypoint.prototype.getEvaledCoords = function(var_names, var_values) {
    console.log("Waypoint: " + this.name + " :: operating with: " + var_names + " " + var_values);
    
    if (var_names.length !== var_values.length) {
        return false;
    }
    
    if (!this.isValid()) {
        console.log("Waypoint: " + this.name + " :: waypoint is not valid");
        
        return false;
    }
    
    for (var i in this.vars) {
        if (var_names.indexOf(this.vars[i]) < 0) {
            console.log("Waypoint: " + this.name + " :: needed variable not found");

            return "missing-variables";
        }
    }
    
    var lat_d = this.lat_d;
    var lat_mm = this.lat_mm;
    var lat_mmm = this.lat_mmm;
    var lon_d = this.lon_d;
    var lon_mm = this.lon_mm;
    var lon_mmm = this.lon_mmm;
    
    for (var i in var_names) {
        var reg = new RegExp(var_names[i], "g");
        console.log("Waypoint: " + this.name + " :: replacing " + var_names[i] + " with " + var_values[i]);

        lat_d = lat_d.replace(reg, var_values[i]);
        lat_mm = lat_mm.replace(reg, var_values[i]);
        lat_mmm = lat_mmm.replace(reg, var_values[i]);
        lon_d = lon_d.replace(reg, var_values[i]);
        lon_mm = lon_mm.replace(reg, var_values[i]);
        lon_mmm = lon_mmm.replace(reg, var_values[i]);
    }
    
    function evaler(str) {
        if (str.indexOf('(') < 0) {
            return str;
        }
        
        if (str.indexOf('^') > -1) {
            var re = /([A-Z0-9]\^[A-Z0-9])/g;
            
            var match = re.exec(str);
            
            if (match !== null) {
                for (var i=1;i<match.length; i++) {
                    var split = match[i].split("^");
                    console.log("Waypoint: evaler :: evaluating pow "+ match[i]);
                    str = str.replace(match[i], Math.pow(parseInt(evaler("("+split[0]+")")), parseInt(evaler("("+split[1]+")"))));
                    console.log("Waypoint: evaler :: input after eval of pow "+ str);
                }
            }
        }

        var re = /(\([A-Z0-9\+\-\*\/]+\))/g;
        
        var match = re.exec(str);
        
        if (match !== null) {
            for (var i=1;i<match.length; i++) {
                str = str.replace(match[i], eval(match[i]));
                
                return evaler(str);
            }
        }
    }

    lat_d = evaler(lat_d);
    lat_mm = evaler(lat_mm);
    lat_mmm = evaler(lat_mmm);
    lon_d = evaler(lon_d);
    lon_mm = evaler(lon_mm);
    lon_mmm = evaler(lon_mmm);

    function testInvalid(str, l) {
        console.log("Waypoint: testInvalid :: " + str);
        if (str === undefined) return false;
        
        if (str.length > l) return false;

        var re = /[^0-9]/g;
        
        var match = re.exec(str);

        if (match !== null) return false;
        
        return true;
    }
    if (!testInvalid(lat_d, 2)) { console.log("lat_d failed"); return false; }
    if (!testInvalid(lat_mm, 2)) { console.log("lat_mm failed"); return false; }
    if (!testInvalid(lat_mmm, 3)) { console.log("lat_mmm failed"); return false; }
    if (!testInvalid(lon_d, 3)) { console.log("lon_d failed"); return false; }
    if (!testInvalid(lon_mm, 2)) { console.log("lon_mm failed"); return false; }
    if (!testInvalid(lon_mmm, 3)) { console.log("lon_mmm failed"); return false; }

    String.prototype.lpad = function(padString, length) {
        var str = this;
        while (str.length < length)
            str = padString + str;
        return str;
    };

    switch(global_correct_mm) {
        case 1: 
            lat_mmm = lat_mmm.lpad("0", 3);
            lon_mmm = lon_mmm.lpad("0", 3);
            break;
    }

    lat_d = lat_d.lpad("0", 2);
    lat_mm = lat_mm.lpad("0", 2);
    lon_d = lon_d.lpad("0", 3);
    lon_mm = lon_mm.lpad("0", 2);

    coords = Coordinates.fromString(this.lat_pf + lat_d + " " + lat_mm + "." + lat_mmm + " " + this.lon_pf + lon_d + " " + lon_mm + "." + lon_mmm);
    if (coords === null) {
        return false;
    }
    console.log(""+coords);
    var marker = new google.maps.Marker({
        position: coords,
        setMap: map}
    );


    return this.lat_pf + lat_d + " " + lat_mm + "." + lat_mmm + " " + this.lon_pf + lon_d + " " + lon_mm + "." + lon_mmm;
};

Waypoint.prototype.createHtml = function() {
    'use strict';
    
    return '<div id="' + this.name + '" class="row">' +
           '    <div class="col-md-3"><p>' + this.name + '</p></div>' +
           '    <div class="col-md-3"><input class="wp" type="text" id="wp_'+ this.name +'" value="' + this.getNormalizedCoords() + '"/></div>' +
           '    <div class="col-md-3"><a href="#" class="wp-del">-</a></div>' +
           '</div>';
};