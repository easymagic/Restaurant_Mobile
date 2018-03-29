///////////////////tables
add_listener('save_tables',function(resp){

  __action('session',['tables_list_',resp.data,'object']);

});


/////////////settings
add_listener('save_settings',function(resp){

 $.each(resp.data,function(k,v){

   __action('session',[v.name,v.value,'string']);
 	
 });


});


/////////////////items
add_listener('save_items',function(resp){

 __action('session',['items_list_',resp.data,'object']);

});


//////////////////order-items
add_listener('save_order_items',function(resp){

  // __action('session',['order_items_list_',resp,'object']);

});


//////////////user-data
add_listener('save_user_data',function(resp){

 __action('session',['user_data',resp,'object']);
 __action('session',['waiter_table_id',resp.admin_account.table_id,'string']);

});