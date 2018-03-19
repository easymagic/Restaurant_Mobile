// crud_plugin.js
add_listener('init_crud_engine',function(cfg){ //cfg->entity,cfg->salt

  // start crud


add_listener(cfg.entity + '_init',function(){

   if (!__filter('session',[cfg.entity + '_list_' + cfg.salt])){
      __filter('session',[cfg.entity + '_list_' + cfg.salt,[],'object']);

   }

   if (!__filter('session',[cfg.entity + '_index_' + cfg.salt])){
      __filter('session',[cfg.entity + '_index_' + cfg.salt,0,'number']);

   }


});



add_listener(cfg.entity + '_add',function(item){

   __action(cfg.entity + '_init');   

   var list = __filter('session',[cfg.entity + '_list_' + cfg.salt]);
   
   var index = __filter('session',[cfg.entity + '_index_' + cfg.salt]);
   
   ++index; 

   __filter('session',[cfg.entity + '_index_' + cfg.salt,index,'number']);

   item.salt_id = index;
   list.push(item);

   __filter('session',[cfg.entity + '_list_' + cfg.salt,list,'object']);

   __action(cfg.entity + '_list_updated',list);


});


add_listener(cfg.entity + '_remove',function(index){


   __action(cfg.entity + '_init');   

   var list = __filter('session',[cfg.entity + '_list_' + cfg.salt]);

   
   var $item = list[index];

   list.splice(index,1);


   __filter('session',[cfg.entity + '_list_' + cfg.salt,list,'object']);

   __action(cfg.entity + '_list_updated',list);


   return $item;
 
});



add_listener(cfg.entity + '_clear',function(index){


   __action(cfg.entity + '_init');   

   __action('session',[cfg.entity + '_list_' + cfg.salt,[],'object']);


   __action(cfg.entity + '_list_updated',[]);


});




add_listener(cfg.entity + '_all',function(){

   __action(cfg.entity + '_init');   

   var list = __filter('session',[cfg.entity + '_list_' + cfg.salt]);

   return list;

});



add_listener(cfg.entity + '_to_JSON',function(){

   return JSON.stringify(__action(cfg.entity + '_all'));

});


add_listener(cfg.entity + '_summary',function(cb){
 
 // var current_table = __filter('session',['current_table']);

 var list = __action(cfg.entity + '_all');
 var r = {};
 var count = 0;

 $.each(list,function(k,v){
    ++count;
   // total+= +(v.price);
    cb(k,v,r);

 });

 r.count = count;

 return r;

}); 



console.log('called init ... ');


add_listener(cfg.entity + '_reload_list',function(cfg2){  

  var list = __filter(cfg.entity + '_all');

  var $el = $($(cfg2.template).html());

  var $outlet = $(cfg2.outlet);

  $outlet.html('');

  console.log(list);

  $.each(list,function(k,v){

    var $el_ = $el.clone();

    if (cfg2.cb($el_,k,v)){
     
     $outlet.append($el_);     	
    
    }


  });


});
    

 

 // end crud

});



add_listener('currency',function(vl){

  if (isNaN(vl)){
    vl = 0;
  }
  
  var v = +vl;
  return ' =N= ' + v.toLocaleString();

});

