'use strict';

$(init);

function init(){
  $('#senditem').on('click', addNewItem);
  console.log('main js loaded');

}



function addNewItem(){

  var newItem = {
    description: $('#itemdescinput').val(),
    price: parseFloat( $('#itempriceinput').val() ),
    name: $('#itemnameinput').val(),
    image: $('#itemimgurl').val(),
    //category: $('#itemcatinput').val()
  };

  $.post( "/items/add", newItem)
    .done(function( data ) {
      var id = data._id;
      window.location.href = '/items/view/'+id ;
  });
}
