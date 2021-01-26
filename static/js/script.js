// Materialize Required JavaScript
$(document).ready(function(){

    backToZero();
    randomAd();
    // Navbar
    $('#secondNavbar').hide();

    // Side Navbar
    $('.sidenav').sidenav();

    // Homepage Initial Display
    $('.glass').hide();
    $('.welcome-card').hide();
    $('.welcome-image').hide();
    $('.more-info-cards').hide();

    // Recipe Categories
    $('#firstRow').hide();
    $('#secondRow').hide();

    // Time Picker In Forms
    $('.timepicker').timepicker();

    // Select Function In Forms
    $('select').formSelect();

    // Carousel Functionality
    $('.carousel').carousel();
  
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
 
    // Search Page
    $('#searchBox').hide();
   animate();
});

// Date Generator
function dateGen(){
    var d = new Date();
    var date = d.getFullYear();
    $('#date').text(date)
}
dateGen();


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
$('#deleteMessage').click(function(){
    $(this).val(1);
});


// Submit button value to 1 "Send"
$('#submit').click(function(){
        $(this).val(1);
    });
$('#seeRecipe').click(function(){
        $(this).val(1);
    });
$('#saveRecipe').click(function(){
    $(this).val(1);
})
$('#delete').click(function(){
    $(this).val(1);
})
$('#newMessage').click(function(){
    $(this).val(1);
})

// Open A Ticket From Profile:
$('#openTicket').click(function(){
    $(this).val(1);
});

// Editing A Ticket:
$('#submitEdit').click(function(){
    $(this).val(1);
});
function backToZero(){
    $('#submit').val(0);
    $('#seeRecipe').val(0);
    $('#saveRecipe').val(0);
    $('#delete').val(0);
    $('#newMessage').val(0);
    $('#openTicket').val(0);
    $('#submitEdit').val(0);
}

// Randomize advert:
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function randomAd(){
    randomNum = getRandomInt(2)
    var screenSize = screen.width;
    console.log(screenSize);
    if (screenSize > 768){
        $('#advert-row').css("position", "fixed").css("right", "10px").css("top","20%").css("width", "225px");
        if (randomNum == 0){
            $('#advert-link').html(`<img id="adImg" src="static/img/adverts/sideAd1.jpg" alt="Ripe Recipe Store">`);
        }else if (randomNum == 1){
            $('#advert-link').html(`<img id="adImg" src="static/img/adverts/sideAd2.jpg" alt="Ripe Recipe Store">`);
        }else{
            $('#advert-link').html(`<img id="adImg" src="static/img/adverts/sideAd1.jpg" alt="Ripe Recipe Store">`);
        }
    }else{
        $('#advert-row').css("display", "none");
    }
}
$(function(){
        //prepare Your data array with img urls
        var dataArray=new Array();
        dataArray[0]=`../static/img/adverts/ad1.jpg`;
        dataArray[1]=`../static/img/adverts/ad2.jpg`;

        //start with id=0 after 5 seconds
        var thisId=0;

        window.setInterval(function(){
            $('#advert').attr('src',dataArray[thisId]);
            thisId++; //increment data array id
            if (thisId==2) thisId=0; //repeat from start
        },15000);        
    });

$('.close-advert').click(function(){
    $('#advert-row').fadeOut(1000);
});

// View More Info Homepage
$('#view-more-info').click(function(){
    $('.logo-home').hide(1000);
    $('.more-info-cards').show(2000);
    $("html, body").animate({ scrollTop: $('.first-card').offset().top }, 1500);
});
$('#view-less-info').click(function(){
    $("html, body").animate({ scrollTop: $('.welcome-card').offset().top }, 2500);
    $('.more-info-cards').hide(2000);
    $('.logo-home').show(2000);
});

function animate(){
    $('.glass').fadeIn(2000);
    $('.welcome-card').show(3000);
    $('.welcome-image').fadeIn(4000);
    function categories(){
        $('#firstRow').show(2000);
        $('#secondRow').fadeIn(4000);   
    }
    function searchPage(){
        $('#searchBox').show(3000);
    }
    categories();
    searchPage();
    $("html, body").animate({ scrollTop: $('#firstRow').offset().top }, 2000);
}

$('.expandNav').click(function(){
    toggleArrow();
    $('#secondNavbar').toggle(1500);
});
function toggleArrow(){
    if ($('.expandNav').val() == 0){
        $('.expandNav').removeClass("fa-chevron-circle-down").addClass("fa-chevron-circle-up");
        $('.expandNav').val(1);
    }else if ($('.expandNav').val() == 1){
        $('.expandNav').removeClass("fa-chevron-circle-up").addClass("fa-chevron-circle-down");
        $('.expandNav').val(0);
    }
}