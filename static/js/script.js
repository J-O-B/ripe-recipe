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
    $('.carousel').carousel({        
        fullWidth: false,
        indicators: true,
        dragged: true,
        duration: 100});

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
$('#newTicket').click(function(){
    $(this).val(1);
});

// Editing A Ticket:
$('#submitEdit').click(function(){
    $(this).val(1);
});

// Shopping List:
function shopList(){

}
$('#shoppingList').click(function(){
    $(this).val("Add Items To Shopping List.");
});

$('.shopListCheck').click(function(){
    let check = $('.shopListCheck');
    let sub = $('#shoppingList');
    let list = []
    
    $('.shopListCheck').click(function(){
        if ($(this).hasClass("off")){
            $(this).removeClass("off").addClass("on");
            
        }else{
            $(this).removeClass("on").addClass("off");
            $(this).val() = "off"
        }
    })
    console.log($(this).val());
})


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
}

// Randomize advert:
function randomAd(){
    randomNum = Math.floor(Math.random() * Math.floor(4));
    var size = screen.width;
    // Large Screens Show Vertical Advert On Right
    if (size > 1450){
        $('#advert-row').css("position", "fixed").css("right", "10px").css("top","16.2%").css("height", "500px").css("overflow", "hidden");
        let sideOne = "/static/img/adverts/sideAd1.jpg";
        let sideTwo = "/static/img/adverts/sideAd2.jpg";
        if (randomNum == 0){
            $('#advert-link').html(`<img id="adImgSide" src=${sideOne} alt="Ripe Recipe Store">`);
        }else if (randomNum == 1){
            $('#advert-link').html(`<img id="adImgSide" src=${sideTwo} alt="Ripe Recipe Store">`);
        }else if (randomNum == 2){
            $('#advert-link').html(`<img id="adImgSide" src=${sideOne} alt="Ripe Recipe Store">`);
        }else{
            $('#advert-link').html(`<img id="adImgSide" src=${sideTwo} alt="Ripe Recipe Store">`);
        }
    // Smaller Screens (iPad etc.) Show Horizontal Advert Below Navbar
    }else if (size <= 1450 && size > 500) {
        console.log("small");
        $('#advert-row').css("height", "200px").css("width", "100vw");
        if (randomNum == 0){
            $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd1.jpg" alt="Ripe Recipe Store">`);
        }else if (randomNum == 1){
            $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd2.jpg" alt="Ripe Recipe Store">`);
        }else if (randomNum == 2){
            $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd3.jpg" alt="Ripe Recipe Store">`);
        }else{
            $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd1.jpg" alt="Ripe Recipe Store">`);
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

$('.front-card').mouseover(function(){
    $(this).hide();
    $('.back-card').show();
})
$('.back-card').mouseout(function(){
    $(this).hide();
    $('.front-card').show();
})

// Email Form:
// Required code for API
function sendMail(contactForm) {
    emailjs.send("gmail", "john", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "project_request": contactForm.message.value
    })
    .then(
        function(response) {
            $('#submit-text').text("Your email has been send successfully. Thank you for your message", response);
        },
        function(error) {
            $('#submit-text').text("It seems like an error has occured, please feel free to try again, alternatively you can email me at: JonathanMichaelOBrien@Gmail.com", error);
        }
    );
    return false;  // To block form loading a new page
}

function aboutPage(){
    function hide(){
        // Initial Image
        $('#about_image').hide(500);

        //Values
        $('#aboutData').hide(500);
        $('#aboutDataH2').hide(1000);
        $('#aboutDataDiv').hide(1000);
        $('#aboutDataP').hide(1000);

        //Promise
        $('#promise').hide(500);
        $('#promiseH2').hide(1000);
        $('#promiseDiv').hide(1000);
        $('#promiseP').hide(1000);

        //Database
        $('#database').hide(500);
        $('#databaseH2').hide(1000);
        $('#databaseDiv').hide(1000);
        $('#databaseP').hide(1000);

        //Store
        $('#seeAboutStore').hide(500);
        $('#seeAboutStoreH2').hide(1000);
        $('#seeAboutStoreDiv').hide(1000);
        $('#seeAboutStoreP').hide(1000);

    }
    $('#values').click(function(){
        hide();
        $('#aboutData').removeClass("hidden").show(2000);
        $('#aboutDataH2').show(1500);
        $('#aboutDataDiv').fadeIn(1700);
        $('#aboutDataP').show(2000);
    })
    $('#ripePromise').click(function(){
        hide();
        $('#promise').removeClass("hidden").show(2000);
        $('#promiseH2').show(1500);
        $('#promiseDiv').fadeIn(1700);
        $('#promiseP').show(2000);
    })
    $('#ripeDatabase').click(function(){
        hide();
        $('#database').removeClass("hidden").show(2000);
        $('#databaseH2').show(1500);
        $('#databaseDiv').fadeIn(1700);
        $('#databaseP').show(2000);
    })
    $('#aboutRipeStore').click(function(){
        hide();
        $('#seeAboutStore').removeClass("hidden").show(2000);
        $('#seeAboutStoreH2').show(2000);
        $('#seeAboutStoreDiv').fadeIn(1700);
        $('#seeAboutStoreP').show(2000);
    })
}
aboutPage();