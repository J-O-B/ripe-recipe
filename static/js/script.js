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

    // Homepage States
    $('.about-ripe-expanded').hide();
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

// Homepage info section

$('#about-ripe').click(function(){
    // Initial View
    $('.about-ripe-expanded').fadeIn(3000);
});

$('.star1').mouseenter(function(){
    $('.star2').css("color", "white");
    $('.star3').css("color", "white");
    $('.star4').css("color", "white");
    $('.star5').css("color", "white");
});
$('.star1').mouseleave(function(){
    $('.star2').css("color", "black");
    $('.star3').css("color", "black");
    $('.star4').css("color", "black");
    $('.star5').css("color", "black");
});
$('.star2').mouseenter(function(){
    $('.star3').css("color", "white");
    $('.star4').css("color", "white");
    $('.star5').css("color", "white");
});
$('.star2').mouseleave(function(){
    $('.star3').css("color", "black");
    $('.star4').css("color", "black");
    $('.star5').css("color", "black");
});
$('.star3').mouseenter(function(){
    $('.star4').css("color", "white");
    $('.star5').css("color", "white");
});
$('.star3').mouseleave(function(){
    $('.star4').css("color", "black");
    $('.star5').css("color", "black");
});
$('.star4').mouseenter(function(){
    $('.star5').css("color", "white");
});
$('.star4').mouseleave(function(){
    $('.star5').css("color", "black");
});