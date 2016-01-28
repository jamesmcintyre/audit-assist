'use strict';

$(init);

function init(){
  $('#senditem').on('click', addNewItem);
  $('#updateitem').on('click', updateItem);
  $('#deleteItem').on('click', deleteItem);
  $("th:contains('Price')").on('click', sortByPrice);
  $("th:contains('Item Name')").on('click', sortByName);
  $("th:contains('Item Description')").on('click', sortByDescription);
  $('tr.itemInList').on('click', getItemView);

}

var modiferPrice = 1;
var modiferName = 1;
var modiferDesc = 1;



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


function sortByPrice(){
  var $sorted = $("tbody.tableData tr");
  $sorted.sort(function(a,b){
        var aVal = parseFloat($(a).children("td.col-price").find("p").text().slice(1).replace(/\,/g,""));
        var bVal = parseFloat($(b).children("td.col-price").find("p").text().slice(1).replace(/\,/g,""));
        return (aVal - bVal)* modiferPrice;
  });
  $("tbody.tableData").empty().append($sorted);
  modiferPrice *= -1;
}


function sortByName(){
  var $sorted = $("tbody.tableData tr");
  $sorted.sort(function(a,b){
        var aVal = $(a).children("td.col-name").find("p").text();
        var bVal = $(b).children("td.col-name").find("p").text();

        return (aVal > bVal) ? 1 : ((aVal < bVal) ? - 1 : 0) * modiferName;
  });
  $("tbody.tableData").empty().append($sorted);
  modiferName *= -1;
}


function sortByDescription(){
  var $sorted = $("tbody.tableData tr");
  $sorted.sort(function(a,b){
        var aVal = $(a).children("td.col-description").find("p").text();
        var bVal = $(b).children("td.col-description").find("p").text();

        return (aVal > bVal) ? 1 : ((aVal < bVal) ? - 1 : 0) * modiferDesc;
  });
  $("tbody.tableData").empty().append($sorted);
  modiferDesc *= -1;
}
