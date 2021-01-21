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
    $('.about-ripe-expanded').fadeIn(3000);
  
    // Full Width Slider 
    $('.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
    });

    // Messenger Box Visibility
    $('#messenger').hide();
    $('#reply').hide();

    // User Ticket Form
    $('#edit-user-ticket').hide();

    // Modal Init
    $('.modal').modal();
});
 // Date Generator
function dateGen(){
    var d = new Date();
    var date = d.getFullYear();
    $('#date').text(date)
}
dateGen();

// Homepage info section
/*
$('#about-ripe').click(function(){
    // Initial View
    $('.about-ripe-expanded').fadeIn(3000);
});*/

// Comment on recipe submit button
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
$('.IMreply').click(function(){
    var replyTo = $('#messageFrom').text();
    $('#title').text("Reply:")
    $('#msg').toggle();
    $('#reply').toggle();
    $('#sendTo').attr("value", replyTo); 
});
$('#sendReply').click(function(){
    $(this).val(1);
});
$('#closeReply').click(function(){
    $('#messenger').hide();
    $('#open-messenger').show();
});
$('.deleteMessage').click(function(){
    $(this).val("1");
})




// Submit button value to 1 "Send"
$('#submit').click(function(){
        $(this).val(1);
        return false
    });
$('#seeRecipe').click(function(){
        $(this).val(1);
        return false
    });


// Open A Ticket From Profile:
$('#openTicket').click(function(){
    $(this).val(1);
});

// Editing A Ticket:
$('#submitEdit').on(click, function(){
    $(this).val(1);
});