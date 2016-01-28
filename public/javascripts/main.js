'use strict';

$(init);

function init(){
  $('#senditem').on('click', addNewItem);
  $('#updateitem').on('click', updateItem);
  console.log('main js loaded');
  $(document).on('click', '.itemInList', getItemView);

}


//TODO add jquery sort using dom manipulation and lodash in main.js

function addNewItem(){

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

function updateItem(){

  var editedItem = {
      description: $('#itemdescinput').val(),
      price: $('#itempriceinput').val(),
      name: $('#itemnameinput').val(),
      image: $('#itemimgurl').val(),
      id: $('#updateitem').data('id').replace(/^"(.*)"$/, '$1')
    };

    // $.put('http://stackoverflow.com/posts/22786755/edit', {text:'new text'}, function(result){
    //    console.log(result);
    // })
    // JSON.stringify

    $.ajax({
      url: '/items/edit/'+editedItem.id,
      type: 'PUT',
      data: editedItem,
      success: function(data) {
        var id = data;
        window.location.href = '/items/view/'+id;
      }
    });


    // $.put( "/items/edit"+editedItem.id, editedItem, function( data ) {
    //     var id = data._id;
    //     window.location.href = '/items/view/'+id;
    // });
}
