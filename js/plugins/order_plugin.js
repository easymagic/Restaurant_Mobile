/////order_plugin.js//////////


add_listener('load_orders',function(){





__action('orders_reload_list',{
	template:'#template',
	outlet:'#outlet',
  reverse:true,
	cb:function($el,k,data){

      $el.find('#name').html(data.name + ' @ ' +  __filter('currency',data.price) );

      if (data.push_status == 'p'){

        $el.find('#remove').on('click',function(){
           if (confirm("Do you want to remove this item?")){
             __action('orders_remove',k);
           }
        });

        $el.find('#remove').show();
        
      }else{

        $el.find('#remove').hide();

      }


      return true;
	}
});





});



