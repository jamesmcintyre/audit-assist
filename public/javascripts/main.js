'use strict';

$(init);

function init(){
  $('#senditem').on('click', addNewItem);
  console.log('main js loaded');
  $(document).on('click', '.itemInList', getItemView);

}



function addNewItem(){

  // var getPrice = $('#itempriceinput').val();
  // var priceFormatted = numeral( getPrice ).format('$0,0.00');

  var newItem = {
    description: $('#itemdescinput').val(),
    price: $('#itempriceinput').val(),
    name: $('#itemnameinput').val(),
    image: $('#itemimgurl').val()
    //category: $('#itemcatinput').val()
  };

  $.post( "/items/add", newItem)
    .done(function( data ) {
      var id = data._id;

      window.location.href = '/items/view/'+id ;
  });
}

function getItemView(){
  var itemId = $(this).attr('data-id');
  window.location.href = '/items/view/'+itemId.replace(/^"(.*)"$/, '$1');
}
