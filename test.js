/* global generators_global, filters_global, waypoints_global, generator_global */

//console.log(generators_global);
//console.log(filters_global);
//
//var vs = new VariableSystem();
//var test = new Variable("A", generators_global.getGenerator("g_bounds"), "2,100");
////console.log(test);
//test.addFilter(filters_global.getFilter("f_odd"));
//test.addFilter(filters_global.getFilter("f_mod"),"5");
//test.addFilter(filters_global.getFilter("f_le"),"60");
//vs.addVariable(test);
//vs.addVariable(new Variable("C", generators_global.getGenerator("g_list"), "2,3,4,"));
////
//var test = new Variable("B", generators_global.getGenerator("g_digitsnz"));
//test.addFilter(filters_global.getFilter("f_odd"));
//vs.addVariable(test);
////
////
//console.log(vs);
////vs.fill();
////console.log(vs);
////
//var con = new Constraint("A>B");
////console.log(con);
////console.log(con.contains("A"));
////console.log(con.isValid());
////
////var cona = con;
////
////var cons = new Constraint("2/(");
////console.log(cons.isValid());
////
//var cs = new Constraints();
////cs.addConstraint(new Constraint("A<C"));
//cs.addConstraint(con);
//cs.addConstraint(cons);
//cs.addConstraint(con);
//console.log(cs.getConstraintsForVariable("A"));
//
//console.log(con.test([["A", 3]]));
//
//console.log(con.test([["A", 2], ["B", 2]]));
//console.log(con.test([["A", 4], ["B", 2]]));
//
//console.log(vs.solve());

var global_correct_mm = 1;

var input_wp = [ 
    "N 51° 03,(400*A+35) E 13° 49,(100*(A-1)+31)",
    "N 51° 03,(14*B-1) E 13° 48,(14*B-1)",
    "N 51° 03,(3*C*(B-C)+A)  E 13° 48,(2*C*C*C+7*C+A)",
    "N 51° 03,(14*B-D-C) E 13° 48,(D-A)",
    "N 51° 03,(13*B-D/A) E 13° 48,(E-D/A)",
    "N 51° 03,(F/A+2*B-D/2) E 13° 48,(F-B+3*A)",
    "N 51° 03,(G*E+G*B+D+G) E 13° 48,(F+G*E+3*B/C)",
    "N 51° (H),(A*G*E-G*H) E 13° 48,((H^H)*G*D+26)",
    "N 51° 03,((G+H)*I+D+A*H) E 13° (B-A-G-H),(B*I/D+D+1)"
// "N51° 0B.B(A+B)(C-B) E013° (B*B)(B*B*B).(AB-3)BA",
// "N51° 0B.A(F-C)H E 0A(A+B)° DF.(B-C)(G+H)(C-B)",
//"N51° 0B. E(2*D)(C+B-D) E 0EG° DF.E(H-G)(G+B)",
//"N51° 0B.E(J+E)(J-I) E 013° DF.EHI ",
//"N51° 0C.(NMO+I-A) E13° D(J+G).(NMO-2D)",
//"N51° 0C.(NMO+J) E13° D(D+H).(MON+E*J)",
//"N51° 0B.NHI E 013° DF.RS*J+G*I ",
//"N51° (K-Q).CQF E 013° (K/B)(G*O).(B-C)RS",
//"N51° K-Q.C(T-B)U E 013° Q*P.ONM*G-ID",
//"N51° 0R.(NMO+K-A)*C E 013° 2*(RV)-Q/O.(U+S)WD",
//"N51° (M-A)Z.GJK E 013° (K/2)F.(Y-S)P(K/B)",
//"N51° (M-Y)R.W*V+T*U+F*K E 013° P*Q+Y.X-MN*RS-P*Q-V"
];

//
//var vs = new VariableSystem();
//var wps = new Waypoints();
//
for (var i in input_wp) {
    addWaypoint(i, input_wp[i]);
    waypoints_global.addWaypoint(new Waypoint(i, input_wp[i]));
}

createVarInput(new Variable("A", generators_global.getGenerator("g_equals"), "2"));
createVarInput(new Variable("B", generators_global.getGenerator("g_equals"), "55"));
createVarInput(new Variable("C", generators_global.getGenerator("g_equals"), "5"));
createVarInput(new Variable("D", generators_global.getGenerator("g_equals"), "18"));
createVarInput(new Variable("E", generators_global.getGenerator("g_equals"), "126"));
createVarInput(new Variable("F", generators_global.getGenerator("g_equals"), "700"));
createVarInput(new Variable("G", generators_global.getGenerator("g_equals"), "2"));
createVarInput(new Variable("H", generators_global.getGenerator("g_equals"), "3"));
createVarInput(new Variable("I", generators_global.getGenerator("g_equals"), "180"));
//
//var wv = new Variable("B", generators_global.getGenerator("g_equals"), "2");
//wv.addFilter(filters_global.getFilter("f_even"));
//wv.addFilter(filters_global.getFilter("f_mod"),"2");
//createVarInput(wv);
//
//vs.addVariable(wv);
//wv = new Variable("A",generators_global.getGenerator("g_digits"));
//wv.addFilter(filters_global.getFilter("f_le"),"6");
//createVarInput(wv);
//vs.addVariable(wv);
//
//wv = new Variable("C",generators_global.getGenerator("g_digits"));
//createVarInput(wv);
//vs.addVariable(wv);
//
//var con = new Constraint('B>A');
//addConstraint('B>A');
//
//var constraints_global = new Constraints();
//constraints_global.addConstraint(con);
//
//vs.addConstraints(constraints_global);
//
//
////waypoints_global.getAllVariables().forEach(createVarInput);
//console.log(vs);
//var res = vs.solve();
//console.log(waypoints_global.evalAllWaypoints(res));




