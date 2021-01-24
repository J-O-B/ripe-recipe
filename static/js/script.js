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
$('#submitEdit').click(function(){
    $(this).val(1);
});


// Randomize advert:
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function randomAd(){
    randomNum = getRandomInt(3)
    if (randomNum == 0){
        $('#advert').prepend(`<img id="adImg" src="static/img/adverts/ad1.jpg" alt="Ripe Recipe Store">`);
    }else if (randomNum == 1){
        $('#advert').prepend(`<img id="adImg" src="static/img/adverts/ad2.jpg" alt="Ripe Recipe Store">`);
    }else if (randomNum == 2){
        $('#advert').prepend(`<img id="adImg" src="static/img/adverts/ad1.jpg" alt="Ripe Recipe Store">`);
    }
}
randomAd();
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

$('#view-more-info').click(function(){
    
    $("html, body").animate({ scrollTop: $('#title1').offset().top }, 1000);
})
