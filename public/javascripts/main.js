'use strict';

$(init);

function init(){
  $('#senditem').on('click', addNewItem);
  console.log('main js loaded');

}



function addNewItem(){
  console.log($(this));
}
