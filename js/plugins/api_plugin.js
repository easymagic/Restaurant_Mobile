/////api_plugin.js/////////////////

//base API
add_listener('ajax_call',function(cfg){
   
   __action('ajax_loading');

   $.ajax({
   	url:'http://emberpos.com/actions/api/' + cfg.api,
   	type:'post',
   	data:cfg.data,
   	success:function(response){
      
      var resp = JSON.parse(response);
      if (typeof(resp.error) != 'undefined'){

	      if (resp.error*1 == 1){
	       if (cfg.cb_error)cfg.cb_error();
	       __action('log_error',resp.message);
	      }else{
	       if (cfg.cb_success)cfg.cb_success(resp);	
	       __action('log_success',resp.message);
	      }

      }else{
      	cfg.cb_success(resp);
      }
      
      __action('ajax_done_loading');

   	}
   });

});


(function(){
 
 var $el = {};

 add_listener('current_element',function($el_){

     
   if ($el_){
     $el = $el_;
   }

   return $el;


 });
 
})();




add_listener('user_auth',function(cfg){
  
  __action('ajax_call',{
  	api:'admin/login',
  	data:{
     email:cfg[0],
     password:cfg[1]
  	},
  	cb_success:function(response){
  		// if (response.error){
         console.log(response.message);
  		// }
       __action('save_user_data',response);
  	}
  });

});

add_listener('is_logged',function(){
   
   if (__filter('session',['user_data']) ){
   	location.href = 'dashboard.html';
   }


});


add_listener('is_not_logged',function(){

   console.log(__filter('session',['user_data']) );
   
   if (!__filter('session',['user_data']) ){
   	location.href = 'index.html';
   }


});


add_listener('logout',function(){
  __action('session',['user_data','','__null__']);
  __action('is_not_logged');
});





add_listener('sync_tables',function(cfg){
  
  __action('ajax_call',{
  	api:'table/list',
  	cb_success:function(response){
  		// if (response.error){
         console.log(response.message);
  		// }
       __action('save_tables',response);
  	}
  });

});

//sync/settings
add_listener('sync_settings',function(cfg){
  
  __action('ajax_call',{
    api:'sync/settings',
    cb_success:function(response){
      // if (response.error){
         console.log(response.message);
      // }
       __action('save_settings',response);
    }
  });

});




add_listener('sync_items',function(cfg){
  
  __action('ajax_call',{
  	api:'item/list',
  	cb_success:function(response){
  		// if (response.error){
         console.log(response.message);
  		// }
       __action('save_items',response);
  	}
  });

});



add_listener('sync_up_table_orders',function(){
  
 var post_data = JSON.stringify(__filter('order_all_items'));
 var current_table = __filter('session',['current_table']);

  __action('ajax_call',{
  	api:'table_order/sync_up',
  	data:{
     post_data:post_data,
     current_table:current_table
  	},
  	cb_success:function(response){}
  });



});

//uc_table_order_create

add_listener('order_create',function(){
  
 // var post_data = JSON.stringify(__filter('order_all_items'));
 // var current_table = __filter('session',['current_table']);

 //  __action('ajax_call',{
 //  	api:'table_order/sync_up',
 //  	data:{
 //     post_data:post_data,
 //     current_table:current_table
 //  	},
 //  	cb_success:function(response){}
 //  });



});




add_listener('order_checkout',function(data){
  
  __action('ajax_call',{
  	api:'table_order/create',
  	data:data,
  	cb_success:function(response){
  		//clear customer and customer items



// __action('init_crud_engine',{
//    entity:'items', //items
//    salt:''
// });

var table_id = __action('session',['current_table']);

__action('init_crud_engine',{
entity:'customers',
salt:'_table_' + table_id
}); 


__action('init_crud_engine',{
   entity:'orders', //items
   salt:__filter('session',['current_table']) + '_' + __filter('session',['current_customer'])
});


var current_customer = __filter('session',['current_customer']);

__action('customers_remove',(+current_customer));
__action('orders_clear');
location.href = 'tables.html';

  		// if (response.error){
         console.log(response.message);
  		// }
       // __action('save_items',response);
  	}
  });

});




///pull_from_cloud
add_listener('pull_from_cloud',function(){ //called from the perspective of the customers section

  var table_id = __action('session',['current_table']);

  __action('ajax_call',{
    api:'table_order/sync_from_cloud',
    data:{
     table_id:table_id
    },
    cb_success:function(response){

      console.log(response);
      
      if (typeof response.data.length == 'undefined'){
  
        var orders = JSON.parse(response.data.orders_json_data);
        var customers = JSON.parse(response.data.customer_json_data);

         // __action('session',[cfg.entity + '_list_' + cfg.salt,[],'object']);
         //table '_table_' + table_id
         __action('session',['customers_list_' + '_table_' + table_id,customers,'object']);
         
         $.each(orders,function(k,v){
             // salt:__filter('session',['current_table']) + '_' + v.salt_id
           __action('session',['orders_list_' + table_id + '_' + k,v,'object']);

         });

        __action('load_customer_list');

      }
      //set current table data
      //set all orders in current table data

    }
  });

});


///push_to_cloud
add_listener('push_to_cloud',function(){

  var table_id = __action('session',['current_table']);
  var customer_data = [];
  var orders_data = {};

  var post_data = {};
   
  // __action('init_crud_engine',{
  //   entity:'customers',
  //   salt:'_table_' + table_id
  // }); 

  customer_data = __action('customers_all');

  if (!customer_data){
    __action('init_crud_engine',{
      entity:'customers',
      salt:'_table_' + table_id
    });
   
   customer_data = __action('customers_all'); 
  
  }
  
  post_data.customer_json_data = JSON.stringify(customer_data);
  post_data.orders_json_data = '';

  $.each(customer_data,function(k,v){

    // console.log(k,v);
   
   var check = []; //__action('orders_all');

   // if (!check){
     __action('init_crud_engine',{
       entity:'orders', //items
       salt:__filter('session',['current_table']) + '_' + v.salt_id
    });
    check = __action('orders_all');      
   // }

   orders_data[v.salt_id] = (check);
    
  });

  post_data.orders_json_data = JSON.stringify(orders_data);

  if (customer_data.length > 0){

      __action('ajax_call',{
        api:'table_order/sync_to_cloud',
        data:{
         post_data:post_data,
         table_id:table_id
        },
        cb_success:function(response){
          //set current table data
          //set all orders in current table data
        }
      });


  }





});
