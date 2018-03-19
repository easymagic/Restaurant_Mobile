/////order_plugin.js//////////


add_listener('load_orders',function(){





__action('orders_reload_list',{
	template:'#template',
	outlet:'#outlet',
	cb:function($el,k,data){

      $el.find('#name').html(data.name + ' @ ' +  __filter('currency',data.price) );

      $el.find('#remove').on('click',function(){
         if (confirm("Do you want to remove this item?")){
           __action('orders_remove',k);
         }
      });

      return true;
	}
});





});



