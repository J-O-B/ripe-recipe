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
  
    // Full Width Slider 
    $('.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
    });

    // Messenger Box Visibility
    $('#messenger').hide();
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

$('#leaveComment').click(function(){
    $(this).val(1);
});

// Instant Messenger
$('#open-messenger').click(function(){
    $('#open-messenger').hide();
    $('#messenger').show();
});

$('#close-messenger').click(function(){
    $('#messenger').hide();
    $('#open-messenger').show();
})



