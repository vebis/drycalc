/*jslint
  indent: 4
*/

var filters_global = new Filters();
// filters_global for even numbers
filters_global.addFilter(new Filter(    "f_even",
                                        "gerade Zahl",
                                        function(e) {
                                            return e%2 === 0;
                                        }
                                   )
);

filters_global.addFilter(new Filter(    "f_le",
                                        "<= X",
                                        function(parameter) {
                                            return function(e) {
                                                return e <= parameter;
                                            }
                                        },
                                        true,
                                        "([0-9]+)"
                                   )
);

// filter for odd numbers
filters_global.addFilter(new Filter(    "f_odd",
                                        "ungerade Zahl",
                                        function(e) {
                                            return e%2 === 1;
                                        }
                                   )
);

filters_global.addFilter(new Filter(    "f_ge",
                                        ">= X",
                                        function(parameter) {
                                            return function(e) {
                                                return e >= parameter;
                                            }
                                        },
                                        true,
                                        "([0-9]+)"
                                   )
);

filters_global.addFilter(new Filter(    "f_mod",
                                        "teilbar durch X (mod)",
                                        function(parameter) {
                                            return function(e) {
                                                return e%parameter === 0;
                                            }
                                        },
                                        true,
                                        "([0-9]+)"
                                   )
);