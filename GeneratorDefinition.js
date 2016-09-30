/*jslint
  indent: 4
*/

/*global
*/

// generate container for generators_global
var generators_global = new Generators();

// generates digits from 0 to 9
generators_global.addGenerator(
        new Generator(  "g_digits", 
                        "Ziffern 0-9", 
                        function() {
                            'use strict';

                            return [0,1,2,3,4,5,6,7,8,9];
                        }
                     )
);

// generates digits from 1 to 9
generators_global.addGenerator(
        new Generator(  "g_digitsnz", 
                        "Ziffern 1-9 (QS)", 
                        function() { 
                            'use strict';

                            return [1,2,3,4,5,6,7,8,9];
                        }
                     )
);

// generates numbers from a lower bound up to a higher bound which are separeted by comma
generators_global.addGenerator(
        new Generator(  "g_bounds", 
                        "Zahlen X-Y (X,Y)", 
                        function(param) {
                            'use strict';

                            var regval = param.match(this.parameter_regex);
                            var ret_arr = [];

                            for(var i=parseInt(regval[1]);i<=parseInt(regval[2]);i++) {
                                ret_arr.push(parseInt(i));
                            }

                            return ret_arr;
                        }, 
                        true, 
                        "([0-9]+)\,([0-9]+)"
                      )
);

// generates numbers from 1 to 26 alphabet
generators_global.addGenerator(
        new Generator(  "g_alphabet_z",
                        "Buchstabe A-Z (A=1)",
                        function() {
                            'use strict';

                            var ret_arr = [];

                            for(var i=1;i<=26;i++) {
                                ret_arr.push(i);
                            }

                            return ret_arr;
                        }
                      )
);

// generates numbers from 0 to 25 alphabet
generators_global.addGenerator(
        new Generator(  "g_alphabet",
                        "Buchstabe A-Z (A=0)",
                        function() {
                            'use strict';

                            var ret_arr = [];

                            for(var i=0;i<=25;i++) {
                                ret_arr.push(i);
                            }

                            return ret_arr;
                        }
                      )
);

// generates number representation of vowles
generators_global.addGenerator(
        new Generator(  "g_vowels",
                        "Vokale (A=1)",
                        function() {
                            'use strict';

                            return [1,5,9,15,21];
                        }
                     )
);

generators_global.addGenerator(
        new Generator(  "g_vowels_z",
                        "Vokale (A=0)",
                        function() {
                            'use strict';

                            return [0,4,8,14,20];
                        }
                     )
);

// generates exactly one number
generators_global.addGenerator(
        new Generator(  "g_equals",
                        "Ist gleich",
                        function(param) {
                            'use strict';
                            
                            var regval = param.match(this.parameter_regex);
                            
                            return [parseInt(regval[1])];
                        },
                        true,
                        "([0-9]+)"
                     )
);

// generates according to a list
generators_global.addGenerator(
        new Generator(  "g_list",
                        "Liste (A,B,C,D)",
                        function(param) {
                            'use strict';
                            
                            var tmp_arr = param.split(",");
                            var ret_arr = [];

                            for (var i in tmp_arr) {
                                if (!isNaN(parseInt(tmp_arr[i]))) {
                                    ret_arr.push(parseInt(tmp_arr[i]));
                                }
                            }
                            
                            return ret_arr;
                        },
                        true,
                        "(([0-9]+)(,(?!$))?)+"
                     )
);