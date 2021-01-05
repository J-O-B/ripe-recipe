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
    $('.welcome-card').fadeIn(3000);
    $('.about-ripe-expanded').hide();
    $('#firstCard').hide();
    $('#secondCard').hide();
    $('#thirdCard').hide();

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
    $('.welcome-card').fadeOut(1000);
    $('.about-ripe-expanded').fadeIn(1000);
    // track where user is using variable:
    var x = 1;
    cards(1);
});

function cards(x){
    $('#firstCard').hide();
    $('#secondCard').hide();
    $('#thirdCard').hide();

    if (x == 1){
        $('#firstCard').show();
        $('.next').click(function(){
            x=2;
            cards(x);
        });
        $('.previous').click(function(){
            x = 3;
            cards(x);
        });
    }
    else if (x == 2){
        $('#secondCard').show();
        $('.next').click(function(){
            x=3;
            cards(x);
        });
        $('.previous').click(function(){
            x = 1;
            cards(x);
        });
    }
    else if (x == 3){
        $('#thirdCard').show();
        $('.next').click(function(){
            x=1;
            cards(x);
        });
        $('.previous').click(function(){
            x = 2;
            cards(x);
        });
    }
}
