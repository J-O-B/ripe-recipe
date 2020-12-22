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
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
