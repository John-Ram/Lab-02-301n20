'use strict';
function Gallery(photo) {
  this.keyword = photo.keyword;
  this.horns = photo.horns;
  this.image_url = photo.image_url;
  this.description = photo.description;
  this.title = photo.title;
}
Gallery.prototype.render = function () {
  let $photoClone = $('.photo-template').clone();
  $('main').append($photoClone);
  $photoClone.find('h2').text(this.title);
  $photoClone.find('img').attr('src', this.image_url);
  $photoClone.find('p').text(this.description);
  $photoClone.removeAttr('class');
  $photoClone.addClass('clonedImg');
};
Gallery.json = () => {
 
  imgRender();
};
$(() => Gallery.json());

// Code for filter below:

// $( "#filter option:selected" ).text();

// $(document).ready(function() {
//   $('input').change(function() {
//     let filter = $(this).val();
//     $('option').each(function() {
//       if ($(this).val() == filter) {
//         $(this).show();
//       } else {
//         $(this).hide();
//       }
//       $('selector').val(filter);
//     })
//   })
// })
const clearImg = () => {
  $(".clonedImg").remove();
}

const imgRender = (keyword) =>{
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  clearImg();
  $.ajax('data/horns.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let photo = new Gallery(item);
        console.log(photo);
        if (keyword) {
          if (photo.keyword === keyword){
            photo.render();
          }
        } else {
          photo.render();
        }
       });
    });
}

$("#selector").change(function () {
  imgRender($(this).val())
})