'use strict';

$(init);

function init(){
  $('#senditem').on('click', addNewItem);
  $('#updateitem').on('click', updateItem);
  $('#deleteItem').on('click', deleteItem);
  console.log('main js loaded');
  $('tr.itemInList').on('click', getItemView);

}


//TODO add jquery sort using dom manipulation and lodash in main.js

function addNewItem(){

  //TO AVOID ISSUE WHERE ERRONEOUS IMAGE URL TRIGGERS ROUTES FROM BROWSER
  var validatedImageUrl;
  var userImageInput = $('#itemimgurl').val();
  if ( (/\.(gif|jpg|jpeg|tiff|png)$/i).test( userImageInput ) ){
    validatedImageUrl = $('#itemimgurl').val();
  }else{
    validatedImageUrl = 'http://3kxl3hnswm72ehkzb1ywbkd1.wpengine.netdna-cdn.com/wp-content/themes/brant/images/after-photo-placeholder.jpg'
  }

  var newItem = {
      description: $('#itemdescinput').val(),
      price: $('#itempriceinput').val(),
      name: $('#itemnameinput').val(),
      image: validatedImageUrl
      //category: $('#itemcatinput').val()
    };

    $.post( "/items/add", newItem)
      .done(function( data ) {
        var id = data._id;
        window.location.href = '/items/view/'+id ;
    });
}

function getItemView(){
  console.log("i have run");
  // debugger;
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


    $.ajax({
      url: '/items/edit/'+editedItem.id,
      type: 'PUT',
      data: editedItem,
      success: function(data) {
        var id = data;
        window.location.href = '/items/view/'+id;
      }
    });

}

function deleteItem(){

  var itemId = $(this).data('id');

  $.ajax({
    url: '/items/delete/'+itemId.replace(/^"(.*)"$/, '$1'),
    type: 'DELETE',
    data: 'delete please',
    success: function(data) {

      window.location.href = '/';
    }
  });
}



//TODO  to sort Array.isArray($('tr').toArray())
