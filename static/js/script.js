// Materialize Required JavaScript
$(document).ready(function(){

    backToZero();
    randomAd();
    // Navbar
    $('#secondNavbar').hide();

    //editUser
    $('#previewProfPic').hide();

    //editForm
    $('#editForm').hide();
    
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
    $('#starters').hide();
    $('#mains').hide();
    $('#dessert').hide();
    $('#drink').hide();

    // Collapsible
    $('.collapsible').collapsible();

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
    $('#searchBox').show();
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
    backToZero();
});

// Submit button value to 1 "Send"
$('#submit').click(function(){
        $(this).val(1);
        backToZero();
    });
$('#seeRecipe').click(function(){
        $(this).val(1);
        backToZero();
    });
$('#saveRecipe').click(function(){
    $(this).val(1);
    backToZero();
})
$('#delete').click(function(){
    $(this).val(1);
    backToZero();
})
$('#newMessage').click(function(){
    $(this).val(1);
    backToZero();
})
$('#addToCart').click(function(){
    $(this).val(1);
    backToZero();
})

// Open A Ticket From Profile:
$('#openTicket').click(function(){
    $(this).val(1);
    backToZero();
});

// Editing A Ticket:
$('#submitEdit').click(function(){
    $(this).val(1);
    backToZero();
});

// Deleting an item from cart:
$('#delete').click(function(){
    $(this).val(1);
    backToZero();
})

// By changing values, to stop this value from remaining at the new value for 
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
function randomAd(){
    randomNum = Math.floor(Math.random() * Math.floor(4));
    console.log(randomNum);
    var size = screen.width;
    
    // Large Screens Show Vertical Advert On Right
    if (size > 1450){
        console.log("large");
        $('#advert-row').css("position", "fixed").css("right", "10px").css("top","20%").css("height", "600px");
        if (randomNum == 0){
            $('#advert-link').html(`<img id="adImgSide" src="static/img/adverts/sideAd1.jpg" alt="Ripe Recipe Store">`);
        }else if (randomNum == 1){
            $('#advert-link').html(`<img id="adImgSide" src="static/img/adverts/sideAd2.jpg" alt="Ripe Recipe Store">`);
        }else if (randomNum == 2){
            $('#advert-link').html(`<img id="adImgSide" src="static/img/adverts/sideAd1.jpg" alt="Ripe Recipe Store">`);
        }else{
            $('#advert-link').html(`<img id="adImgSide" src="static/img/adverts/sideAd2.jpg" alt="Ripe Recipe Store">`);
        }
    // Smaller Screens (iPad etc.) Show Horizontal Advert Below Navbar
    }else if (size <= 1450 && size > 500) {
        console.log("small");
        $('#advert-row').css("height", "200px").css("width", "100vw");
        if (randomNum == 0){
            $('#advert-link').html(`<img id="adImgTop" src="static/img/adverts/topAd1.jpg" alt="Ripe Recipe Store">`);
        }else if (randomNum == 1){
            $('#advert-link').html(`<img id="adImgTop" src="static/img/adverts/topAd2.jpg" alt="Ripe Recipe Store">`);
        }else if (randomNum == 2){
            $('#advert-link').html(`<img id="adImgTop" src="static/img/adverts/topAd3.jpg" alt="Ripe Recipe Store">`);
        }else{
            $('#advert-link').html(`<img id="adImgTop" src="static/img/adverts/topAd1.jpg" alt="Ripe Recipe Store">`);
        }
    }
}

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
        $('#secondRow').show(4000);   
    }
    categories();
}

//Navbar to expand the lower tier of the menu
$('.expandNav').click(function(){
    toggleArrow();
    $('#secondNavbar').toggle(750);
});
//Toggle between up and down arrow (navbar)
function toggleArrow(){
    if ($('.expandNav').val() == 0){
        $('.expandNav').removeClass("fa-chevron-circle-down").addClass("fa-chevron-circle-up").css("color", "var(--first");
        $('.expandNav').val(1);
    }else if ($('.expandNav').val() == 1){
        $('.expandNav').removeClass("fa-chevron-circle-up").addClass("fa-chevron-circle-down").css("color", "#000");
        $('.expandNav').val(0);
    }
}

//Profile:
$('#go').click(function(){
    $(this).val(1);
})

$('#goToEdit').click(function(){
    if ($('#goToEdit').val() == 1){
        $('#editForm').show();
        $('#pass').hide();
    }
});
$('#genPreview').click(function(){
    var url = $('#prof_pic').val();
    $('#previewProfPic').show(2000);
    $('#prevPic').attr("src", url)
});


// View Recipe Page
// Starters
$('#showStart').mouseover(function(){
    $("#placeholder").hide(500);
    $('#starters').show(500);
    $('#mains').hide(500);
    $('#dessert').hide(500);
    $('#drink').hide(500);
});
$('#showMains').mouseover(function(){
    $("#placeholder").hide(500);
    $('#starters').hide(500);
    $('#mains').show(500);
    $('#dessert').hide(500);
    $('#drink').hide(500);
});
$('#showDessert').mouseover(function(){
    $("#placeholder").hide(500);
    $('#starters').hide(500);
    $('#mains').hide(500);
    $('#dessert').show(500);
    $('#drink').hide(500);
});
$('#showDrink').mouseover(function(){
    $("#placeholder").hide(500);
    $('#starters').hide(500);
    $('#mains').hide(500);
    $('#dessert').hide(500);
    $('#drink').show(500);
});

// Store
$('.smallProdPhotos').click(function(){
    let image = $(this).html();
    $('.largeProdPhotos').html(image).addClass("overflowHidden").removeClass("hidden");
})

// Product Page

$('.smallProdImg').click(function(){
    let image = $(this).children('img').attr("src");
    $('#largerImgDisplay').children('img').hide(1000, function() {
        $('#largerImgDisplay').children('img').attr("src", image);
        $('#largerImgDisplay').children('img').show(1000);
    });
})

function prices(){
    let total = 0;
    $('.prices').each(function(){
        total += parseFloat($(this).text());
        return total
    });
    $('#totalPrice').text("$" + total);
    let discount = (total * 0.1).toFixed(2);
    $('#tenPercent').text("- $" + discount);
    let newTotal = (total * 0.9).toFixed(2);
    $('#newTotal').text("$" + newTotal);
}
prices();