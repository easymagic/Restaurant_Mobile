//////////session_plugin.js/////////////
add_listener('session',function(cfg){ //k,v,type
   
   // console.log(arguments);
   //0->k,1->v,2->type

   if (cfg[2]){
      
      if (cfg[2] == 'object'){
       localStorage.setItem(cfg[0],JSON.stringify(cfg[1]));
      // console.log('called0');

      }else{
       localStorage.setItem(cfg[0],cfg[1]);
      // console.log('called');
      }

      localStorage.setItem(cfg[0] + '_type$',cfg[2]);

      // console.log('called1');


   }else{
     
     var type_data = localStorage.getItem(cfg[0] + '_type$');

     if (type_data == 'object'){
      
      var obj = localStorage.getItem(cfg[0]);

      // console.log('called3');


      return JSON.parse(obj);

     }else if (type_data == 'number'){

      var number = localStorage.getItem(cfg[0]);

      // console.log('called4');

      
      return +number; //convert to number type-coersion

     }else{

      // console.log('called5');


     	return localStorage.getItem(cfg[0]);

     }

   }

});


