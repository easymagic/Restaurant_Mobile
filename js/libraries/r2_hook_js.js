(function(win){

var listeners = {};

function make_defined(tag){
 listeners[tag] = listeners[tag] || [];
}

function add_listener(tag,cb){
  make_defined(tag);	
  listeners[tag].push(cb);
}


function __filter(tag,arg){
 var result = null;	
 make_defined(tag);	
 for (var c = 0;c < listeners[tag].length;c++){
  arg = listeners[tag][c](arg);
 }
 return arg;
}

function __action(tag,arg){
 return __filter(tag,arg);
}

win.add_listener = add_listener;
win.__filter = __filter;
win.__action = __action;

})(window);