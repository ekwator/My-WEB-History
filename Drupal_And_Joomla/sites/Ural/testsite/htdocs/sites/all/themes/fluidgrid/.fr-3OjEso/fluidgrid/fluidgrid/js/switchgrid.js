Drupal.fluidgrid = function() {
  $('#switchgrid').click(function(){
    $(".grid_24").toggleClass('display');
    $(".grid_16").toggleClass('display');
    $(".grid_12").toggleClass('display');
    $(".container_24").toggleClass('debug');
    $(".container_16").toggleClass('debug');
    $(".container_12").toggleClass('debug');
  });
};
$(document).ready(function(){
 Drupal.fluidgrid();
});