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
};
Gallery.json = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-2.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let photo = new Gallery(item);
        console.log(photo);
        photo.render();
      });
    });
};
$(() => Gallery.json());