// Materialize Required JavaScript
$(document).ready(function(){
    // Side Navbar
    $('.sidenav').sidenav();
    // Time Picker In Forms
    $('.timepicker').timepicker();
    // Select Function In Forms
    $('select').formSelect();
    // Carousel Functionality
    $('.carousel').carousel();
  });

  // Full Width Slider 
  $('.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });

 // Date Generator
function dateGen(){
    var d = new Date();
    var date = d.getFullYear();
    $('#date').text(date)
}
dateGen();

