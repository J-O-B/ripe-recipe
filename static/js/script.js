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

    // Rating Field
    $('#rating').hide();
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

// Initial Star Color 
function getRating(){
    var rate = $('#rating-info').val();
    console.log(rate);

    if (rate == 1){
        $('.star2').css("color", "white");
        $('.star3').css("color", "white");
        $('.star4').css("color", "white");
        $('.star5').css("color", "white");
    }else if (rate == 2){
        $('.star3').css("color", "white");
        $('.star4').css("color", "white");
        $('.star5').css("color", "white");
    }else if (rate == 3){
        $('.star4').css("color", "white");
        $('.star5').css("color", "white");
    }else if (rate == 4){
        $('.star5').css("color", "white");
    }
}
getRating();

// On Click Values Of Rating Stars:
$('#rating1').click(function(){
    $("#rating").val('1');
});
$('#rating2').click(function(){
    $("#rating").val('2');
});
$('#rating3').click(function(){
    $("#rating").val('3');
});
$('#rating3').click(function(){
    $("#rating").val('3');
});
$('#rating4').click(function(){
    $("#rating").val('4');
});
$('#rating5').click(function(){
    $("#rating").val('5');
});
