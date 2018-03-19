// customer_plugin.js
add_listener('load_customer_list',function(){
  


__action('customers_reload_list',{
  template:'#template',
  outlet:'#outlet',
  cb:function($el,k,data){

    console.log(data);
    
    $el.find('button').find('span').html(data.name);

    $el.find('button').on('click',function(){
      
       __action('session',['current_customer',k,'string']);
       __action('session',['current_customer_salt',data.salt_id,'string']);
       __action('session',['current_customer_name',data.name,'string']);

       location.href = 'items.html';


    });

    return true;

  }
 });   


});            