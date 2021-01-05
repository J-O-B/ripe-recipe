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
    //Homepage divs
    $('.social').hide();
    $('.membership').hide();
    $('.profiles').hide();
    $('.board').hide();
    $('.rating').hide();
    $('.store').hide();
    $('#expand').hide();
    $('.view-more').hide();

    //on off toggle
    var io = this.io ^= 1;
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
$('#social').mouseenter(function(){
    $('.view-more', this).show(500);
    $('#social').click(function(){
        $('#wheel').hide(1000);
        $('#expand').show();
        $('.social').show();
    })
})
$('#social').mouseleave(function(){
    $('.view-more').hide(500);
})

$('#membership').mouseenter(function(){
    $('.view-more', this).show(500);
    $('#membership').click(function(){
        $('#wheel').hide(1000);
        $('#expand').show();
        $('.membership').show();
    })
})
$('#membership').mouseleave(function(){
    $('.view-more').hide(500);
})

$('#profiles').mouseenter(function(){
    $('.view-more', this).show(500);
    $('#profiles').click(function(){
        $('#wheel').hide(1000);
        $('#expand').show();
        $('.profiles').show();
    })
})
$('#profiles').mouseleave(function(){
    $('.view-more').hide(500);
})

$('#board').mouseenter(function(){
    $('.view-more', this).show(500);
    $('#board').click(function(){
        $('#wheel').hide(1000);
        $('#expand').show();
        $('.board').show();
    })
})
$('#board').mouseleave(function(){
    $('.view-more').hide(500);
})

$('#rating').mouseenter(function(){
    $('.view-more', this).show(500);
    $('#rating').click(function(){
        $('#wheel').hide(1000);
        $('#expand').show();
        $('.rating').show();
    })
})
$('#rating').mouseleave(function(){
    $('.view-more').hide(500);
})

$('#store').mouseenter(function(){
    $('.view-more', this).show(500);
    $('#store').click(function(){
        $('#wheel').hide(1000);
        $('#expand').show();
        $('.store').show();
    })
})
$('#store').mouseleave(function(){
    $('.view-more').hide(500);
})

//back button
$('#back-to-main').click(function(){
    $('#expand').toggle(1500);
    $('#wheel').toggle(1500);
    $('.social').hide();
    $('.membership').hide();
    $('.profiles').hide();
    $('.board').hide();
    $('.rating').hide();
    $('.store').hide();
})
