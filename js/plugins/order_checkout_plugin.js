/////order_checkout_plugin.js//////////

add_listener('order_checkout_init_list',function(){
  
  var current_table = __filter('session',['current_table']);


   if (!__filter('session',['order_checkout_items_' + current_table])){
      __filter('session',['order_checkout_items_' + current_table,[],'object']);
   }

});



add_listener('order_checkout_add_item',function(item){

   var current_table = __filter('session',['current_table']);

   __action('order_checkout_init_list');   

   var list = __filter('session',['order_checkout_items_' + current_table]);
   // var current_table = __filter('session',['current_table']);

   // item.table_id = current_table;
   list.push(item);

  
   // __action('order_reload_list');

   __filter('session',['order_checkout_items_' + current_table,list,'object']);

   __action('order_checkout_item_updated',list);

   // __action('sync_up_table_orders');

});


add_listener('order_checkout_remove_item',function(index){

   var current_table = __filter('session',['current_table']);

   __action('order_checkout_init_list');   

   var list = __filter('session',['order_checkout_items_' + current_table]);

   // list.push(item);

   var $item = list[index]; 

   list.splice(index,1);

   // __action('order_item_removed',list);

   __filter('session',['order_checkout_items_' + current_table,list,'object']);

   __action('order_checkout_item_updated',list);

   // __action('sync_up_table_orders');
   return $item;
 
});



add_listener('order_checkout_clear_items',function(index){

   var current_table = __filter('session',['current_table']);

   __action('order_checkout_init_list');   

   __action('session',['order_checkout_items_' + current_table,[],'object']);

   // __action('order_reload_list');

   // list.push(item);

   // __action('order_item_cleared',list);

   __action('order_checkout_item_updated',list);

   // __action('sync_up_table_orders');


});




add_listener('order_checkout_all_items',function(){

   var current_table = __filter('session',['current_table']);

   __action('order_checkout_init_list');   

   var list = __filter('session',['order_checkout_items_' + current_table]);

   // list.push(item);

   // list.splice(index,1);

   // __action('order_item_removed',list);

   // __filter('session',['order_items',list]);

   return list;

});

add_listener('order_checkout_summary',function(){
 
 // var current_table = __filter('session',['current_table']);

 var list = __action('order_checkout_all_items');
 var total = 0;
 var count = 0;

 $.each(list,function(k,v){
   ++count;
   total+= +(v.price);
 });

 return {
  total:total,
  count:count
 };

}); 

// add_listener('currency',function(vl){
   
//    var vl_ = +vl;
//    return vl_.toLocaleString();

// });



add_listener('order_checkout_reload_list',function(){
  

  var list = __filter('order_checkout_all_items');

  var $el = $($('#template_order_checkout').html());

  var $outlet = $('#outlet_order_checkout');

  $outlet.html('');

  $.each(list,function(k,v){

    var $el_ = $el.clone();

    $el_.find('#name').html(v.name + ' , =N=' + v.price);

    $el_.find('#remove').on('click',function(){
    	
    	// if (confirm('Do you want to remove this item?')){
          var $item = __action('order_checkout_remove_item',k);
          __action('order_add_item',$item);
    	// }
        
    });


    $outlet.append($el_); 

  });





});