//item_plugin.js




add_listener('load_menu_items',function(){

__action('init_crud_engine',{
   entity:'items', //items
   salt:''
});


__action('init_crud_engine',{
   entity:'orders', //items
   salt:__filter('session',['current_table']) + '_' + __filter('session',['current_customer_salt'])
});



console.log('...loaded...');
 
 __action('items_reload_list',{
 	template:'#template-parent-item',
 	outlet:'#outlet',
 	cb:function($el,k,data){

 		console.log(data);
      
      var check = (data.parent_id*1 <= 0); 
      
      if (check){


		    $el.find('button').find('span').html(data.name);

		    var $sub = $el.find('#sub-items');

		    var clicked = false;

		    
		    $el.find('button').on('click',function(){
		      
		      if (!clicked){
		          $sub.slideDown();
		      }else{
		          $sub.slideUp();
		      } 

		      clicked = !clicked;

		    });


      	   __action('items_reload_list',{
             template:'#template-child-item',
             outlet:$sub,
             cb:function($el_,ky,data_){

                var $check2 = (+data.id == +data_.parent_id);

				      if ($check2){

				      	// var $el_sub = $el.clone();

				      	$el_.find('#name').html(data_.name + '&nbsp;/&nbsp;=N= ' + data_.price);
				        
				        $el_.find('button').on('click',function(){
				           data_.push_status = 'p';	 //p->pending,s->sent
				        	// __action('order_add_item',data_); //call the add item hook here...
				        	__action('orders_add',data_);
				        	console.log(data_);
				        });

				        // cfg.el.append($el_sub);

				      }

                
                 return $check2;

             }

      	   });

      }

      return check;

 	}
 });
 


});



