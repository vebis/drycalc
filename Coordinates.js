/* 
 * (c) flopp https://github.com/flopp/FloppsMap/blob/master/js/coordinates.js
 */

/* global google */

var Coordinates = {};

Coordinates.validLat = function (lat) {
    'use strict';

    return lat !== null && lat !== undefined && !isNaN(lat) && -90.0 <= lat && lat <= 90.0;
};


Coordinates.validLng = function (lng) {
    'use strict';

    return lng !== null && lng !== undefined && !isNaN(lng) && -180.0 <= lng && lng <= 180.0;
};


Coordinates.valid = function (lat, lng) {
    'use strict';

    return this.validLat(lat) && this.validLng(lng);
};


Coordinates.toLatLng = function (lat, lng) {
    'use strict';

    if (this.valid(lat, lng)) {
        return new google.maps.LatLng(lat, lng);
    }

    return null;
};

Coordinates.fromString = function (coordsString) {
    'use strict';

    var coords;

    coords = this.fromStringHDM(coordsString);
    if (coords) {
        return coords;
    }

    coords = this.fromStringHDMS(coordsString);
    if (coords) {
        return coords;
    }

    coords = this.fromStringHD(coordsString);
    if (coords) {
        return coords;
    }

    coords = this.fromStringD(coordsString);
    if (coords) {
        return coords;
    }

    return null;
};


Coordinates.fromStringHDM = function (coordsString) {
    'use strict';

    var matches, pattern,
        lat, lat_sign, lat_d, lat_m,
        lng, lng_sign, lng_d, lng_m;

    // H DDD MM.MMM
    pattern = /^[^A-Z0-9.\-]*([NS])[^A-Z0-9.\-]*(\d+)[^A-Z0-9.\-]+([\d\.]+)[^A-Z0-9.\-]+([EW])[^A-Z0-9.\-]*(\d+)[^A-Z0-9.\-]+([\d\.]+)[^A-Z0-9.\-]*$/i;
    //
    matches = coordsString.toUpperCase().trim().match(pattern);
    if (matches) {
        lat_sign = (matches[1] === 'S') ? -1 : 1;
        lng_sign = (matches[4] === 'W') ? -1 : 1;

        lat_d = parseFloat(matches[2]);
        lat_m = parseFloat(matches[3]);

        lng_d = parseFloat(matches[5]);
        lng_m = parseFloat(matches[6]);

        lat = lat_sign * (lat_d + (lat_m / 60.0));
        lng = lng_sign * (lng_d + (lng_m / 60.0));

        return new google.maps.LatLng(lat, lng);
    }

    return null;
};


Coordinates.fromStringHDMS = function (coordsString) {
    'use strict';

    var matches, pattern,
        lat, lat_sign, lat_d, lat_m, lat_s,
        lng, lng_sign, lng_d, lng_m, lng_s;

    // H DDD MM SS.SSS
    pattern = /^[^A-Z0-9.\-]*([NS])[^A-Z0-9.\-]*(\d+)[^A-Z0-9.\-]+(\d+)[^A-Z0-9.\-]+([\d\.]+)[^A-Z0-9.\-]+([EW])[^A-Z0-9.\-]*(\d+)[^A-Z0-9.\-]+(\d+)[^A-Z0-9.\-]+([\d\.]+)[^A-Z0-9.\-]*$/i;
    //
    matches = coordsString.toUpperCase().trim().match(pattern);
    if (matches) {
        lat_sign = (matches[1] === 'S') ? -1 : 1;
        lng_sign = (matches[5] === 'W') ? -1 : 1;

        lat_d = parseFloat(matches[2]);
        lat_m = parseFloat(matches[3]);
        lat_s = parseFloat(matches[4]);

        lng_d = parseFloat(matches[6]);
        lng_m = parseFloat(matches[7]);
        lng_s = parseFloat(matches[8]);

        lat = lat_sign * (lat_d + (lat_m / 60.0) + (lat_s / 3600.0));
        lng = lng_sign * (lng_d + (lng_m / 60.0) + (lng_s / 3600.0));

        return new google.maps.LatLng(lat, lng);
    }
    return null;
};


Coordinates.fromStringHD = function (coordsString) {
    'use strict';

    var matches, pattern,
        lat, lat_sign,
        lng, lng_sign;

    // H DDD.DDDDD
    pattern = /^[^A-Z0-9.\-]*([NS])[^A-Z0-9.\-]*([\d\.]+)[^A-Z0-9.\-]+([EW])[^A-Z0-9.\-]*([\d\.]+)[^A-Z0-9.\-]*$/i;
    matches = coordsString.toUpperCase().trim().match(pattern);
    if (matches) {
        lat_sign = (matches[1] === 'S') ? -1 : 1;
        lng_sign = (matches[3] === 'W') ? -1 : 1;

        lat = lat_sign * parseFloat(matches[2]);
        lng = lng_sign * parseFloat(matches[4]);

        return new google.maps.LatLng(lat, lng);
    }

    return null;
};


Coordinates.fromStringD = function (coordsString) {
    'use strict';

    var matches, pattern,
        lat, lat_sign,
        lng, lng_sign;

    // DDD.DDDDD
    pattern = /^[^A-Z0-9.\-]*(-?)([\d\.]+)[^A-Z0-9.\-]+(-?)([\d\.]+)[^A-Z0-9.\-]*$/i;
    matches = coordsString.toUpperCase().trim().match(pattern);
    if (matches) {
        lat_sign = (matches[1] === '-') ? -1 : 1;
        lng_sign = (matches[3] === '-') ? -1 : 1;

        lat = lat_sign * parseFloat(matches[2]);
        lng = lng_sign * parseFloat(matches[4]);

        return new google.maps.LatLng(lat, lng);
    }

    return null;
};


Coordinates.toStringDM = function (coords) {
    'use strict';

    var lat = coords.lat(),
        lat_h = "N",
        lat_deg,
        lat_min,
        lat_mmin,
        lat_rest,
        lng = coords.lng(),
        lng_h = "E",
        lng_deg,
        lng_min,
        lng_mmin,
        lng_rest,
        s;

    if (lat < 0) {
        lat_h = "S";
        lat = -lat;
    }
    lat_deg = Math.floor(lat);
    lat_rest = lat - lat_deg;
    lat_min = Math.floor(lat_rest * 60);
    lat_rest = lat_rest * 60 - lat_min;
    lat_mmin = Math.floor(Math.round(lat_rest * 1000));
    while (lat_mmin >= 1000) {
        lat_mmin -= 1000;
        lat_min += 1;
    }

    if (lng < 0) {
        lng_h = "W";
        lng = -lng;
    }
    lng_deg = Math.floor(lng);
    lng_rest = lng - lng_deg;
    lng_min = Math.floor(lng_rest * 60);
    lng_rest = lng_rest * 60 - lng_min;
    lng_mmin = Math.floor(Math.round(lng_rest * 1000));
    while (lng_mmin >= 1000) {
        lng_mmin -= 1000;
        lng_min += 1;
    }

    s = lat_h +
        " " +
        this.zeropad(lat_deg, 2) +
        " " +
        this.zeropad(lat_min, 2) +
        "." +
        this.zeropad(lat_mmin, 3) +
        " " +
        lng_h +
        " " +
        this.zeropad(lng_deg, 3) +
        " " +
        this.zeropad(lng_min, 2) +
        "." +
        this.zeropad(lng_mmin, 3);
    return s;
};