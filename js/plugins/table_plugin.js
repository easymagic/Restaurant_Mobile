add_listener('load_table_assist',function($el){
  

  var list = __action('session',['tables']);

  var $template = $($('#template').html());

  
  $.each(list.data,function(k,v){

     $el.append( __filter('init_table_assist',{template:$template,data:v} ) );

  });


});



add_listener('init_table_assist',function($cfg){

  var $el = $cfg.template.clone();
  var data = $cfg.data;

  $el.find('button').html(data.name);
  $el.find('button').on('click',function(){

    __action('session',['current_table',data.id,'string']);
  	
  	console.log('Downloading table data ...');

  });

  return $el;
  
});






add_listener('load_table_order',function($el){
  

  var list = __action('session',['tables']);

  var $template = $($('#template').html());

  
  $.each(list.data,function(k,v){

     $el.append( __filter('init_table_order',{template:$template,data:v} ) );

  });


});



add_listener('init_table_order',function($cfg){

  var $el = $cfg.template.clone();
  var data = $cfg.data;

  $el.find('button').html(data.name);
  $el.find('button').on('click',function(){
    
    __action('session',['current_table',data.id,'string']);
    location.href = 'menu_list.html';

  	console.log('Get items data ...');

  });

  return $el;
  
});



add_listener('get_table_name',function(table_id){
   
   var items = __action('session',['tables']);

   var table_name = '';

   $.each(items.data,function(k,v){
   	if (v.id == table_id){
      table_name = v.name;
      // break;
   	}
   });

   return table_name;

});

