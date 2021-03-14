// Materialize Required JavaScript
$(document).ready(function(){

    backToZero();
    randomAd();
    $('.headingText').hide();
    $('.navLogoSmall').hide();

    $('.homeItems').show();

    $('#recipeShow').hide();
    $('.homePagination').hide();

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
$('.addToCart').click(function(){
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

$('#deleteProf').click(function(){
    $(this).val(1);
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
    randomNum = Math.floor(Math.random() * Math.floor(3));
    $('#advert-row').css("height", "auto").css("width", "auto");
    if (randomNum == 0){
        $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd1.jpg" alt="Ripe Recipe Store">`);
    }else if (randomNum == 1){
        $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd2.jpg" alt="Ripe Recipe Store">`);
    }else if (randomNum == 2){
        $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd3.jpg" alt="Ripe Recipe Store">`);
        }else{
            $('#advert-link').html(`<img id="adImgTop" src="/static/img/adverts/topAd1.jpg" alt="Ripe Recipe Store">`);
        }
};

$('.close-advert').click(function(){
    $('#advert-row').fadeOut(500);
});

// View More Info Homepage
$('#view-more-info').click(function(){
    $('.logo-home').hide(500);
    $('.more-info-cards').show(1500);
    $("html, body").animate({ scrollTop: $('.first-card').offset().top }, 1000);
});
$('#view-less-info').click(function(){
    $("html, body").animate({ scrollTop: $('.welcome-card').offset().top }, 2000);
    $('.more-info-cards').hide(1500);
    $('.logo-home').show(1500);
});

function animate(){
    $('.glass').fadeIn(1000);
    $('.welcome-card').show(1400);
    $('.welcome-image').fadeIn(1600);
    $('.headingText').fadeIn(1000);
    $('.navLogoSmall').fadeIn(1000);
    function categories(){
        $('#firstRow').show(1200);
        $('#secondRow').show(1600);   
    }
    categories();
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
    $('#previewProfPic').show(1500);
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
    $('#largerImgDisplay').children('img').hide(500, function() {
        $('#largerImgDisplay').children('img').attr("src", image);
        $('#largerImgDisplay').children('img').show(500);
    });
})

function prices(){
    let total = 0;
    $('.prices').each(function(){
        total += parseFloat($(this).text());
        return total;
    });
    $('#totalPrice').text("$" + total.toFixed(2));
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
        $('#aboutDataH2').hide(500);
        $('#aboutDataDiv').hide(500);
        $('#aboutDataP').hide(500);

        //Promise
        $('#promise').hide(500);
        $('#promiseH2').hide(500);
        $('#promiseDiv').hide(500);
        $('#promiseP').hide(500);

        //Database
        $('#database').hide(500);
        $('#databaseH2').hide(500);
        $('#databaseDiv').hide(500);
        $('#databaseP').hide(500);

        //Store
        $('#seeAboutStore').hide(500);
        $('#seeAboutStoreH2').hide(500);
        $('#seeAboutStoreDiv').hide(500);
        $('#seeAboutStoreP').hide(500);

    }
    $('#values').click(function(){
        hide();
        $('#aboutData').removeClass("hidden").show(2000);
        $('#aboutDataH2').show(1000);
        $('#aboutDataDiv').fadeIn(1200);
        $('#aboutDataP').show(1500);
    })
    $('#ripePromise').click(function(){
        hide();
        $('#promise').removeClass("hidden").show(2000);
        $('#promiseH2').show(1000);
        $('#promiseDiv').fadeIn(1200);
        $('#promiseP').show(1500);
    })
    $('#ripeDatabase').click(function(){
        hide();
        $('#database').removeClass("hidden").show(2000);
        $('#databaseH2').show(1000);
        $('#databaseDiv').fadeIn(1200);
        $('#databaseP').show(1500);
    })
    $('#aboutRipeStore').click(function(){
        hide();
        $('#seeAboutStore').removeClass("hidden").show(2000);
        $('#seeAboutStoreH2').show(1500);
        $('#seeAboutStoreDiv').fadeIn(1200);
        $('#seeAboutStoreP').show(1500);
    })
}
aboutPage();

// Menu Searchbox
$('#searchBox').submit(function(event){
    let searchTerm = $('#searchbar').val();
    $('#searchBox').attr('action', `/results/${searchTerm}`);
});

// View Page Searchbox
$('#viewSearchForm').submit(function(event){
    let searchQuery = $('#viewSearchBox').val();
    $('#viewSearchForm').attr('action', `/results/${searchQuery}`);
});
// Search Results
$('#moreDetails')

// Homepage Image Slideshow
$('#viewHome').click(function(){
    $(".welcome-card").hide(500);
    $.when().done(function(){
        $('.welcome-message').hide();
        $('#home_logo').hide();
        $(".recipeShow").css("min-height", "100vh");
        $('#secCol').removeClass("l6");
        $.when().done(function(){
            $(".welcome-card").show(500);
            $('#recipeShow').show(1500);
            $('.homePagination').show(1500);
        });
    });
})

$('.homeRecImage').mouseenter(function(){
    $(this).find('.recName').removeClass("hidden");
});
$('.homeRecImage').mouseleave(function(){
    $(this).find('.recName').addClass("hidden");
});
if ($(window).width() < 960) {
    $('.homeRecImage').find('.recName').removeClass("hidden");
    $('.homeRecImage').find("h3").css("top","0").css("font-size", "20px").css("padding-top", "0");
}

// Ingredients Shopping List
let shoppingList = [];
$('.shopList').click(function(){
    let itemAdd = $(this).parents().siblings('.itemToAdd').find('li').text();
    // If checked or not
    if ($(this).is(':checked')){
        $(this).siblings('span').text("Item Added");
        if (shoppingList.includes(itemAdd)){
            return;
        }else {
            shoppingList.push(itemAdd);
        }
    } else{
        $(this).siblings('span').text("Add To Shopping List");
        if (shoppingList.includes(itemAdd)){
            for( var i = 0; i < shoppingList.length; i++){        
                if ( shoppingList[i] === itemAdd) { 
                    shoppingList.splice(i, 1); 
                    i--; 
                }
            }
        }
    }
});

let text = "";
$('.openList').click(function(){
    text = "";
    let i;
    // Loop through array
    for (i = 0; i < shoppingList.length; i++) {
        // Loop through characters
        for (x = 0; x < shoppingList[i].length; x++){
            if (shoppingList[i][x] == ","){
                text += shoppingList[i].substring(0, x) + "\n";
                console.log(x + " with ,");
                break;
            } else if (shoppingList[i][x] == "."){
                text += shoppingList[i].substring(0, x) + "\n";
                console.log(x + " with .");
                break;
            } else {
                // Pass
            }
        }
    }
    // check browser and output either text or canvas.
    function setupCanvas(){
        let canvas = document.getElementById("shoppingItems");
        let ctx = canvas.getContext("2d");
        ctx.font = '12px Arial';
        let txt = text;
        let x = 30;
        let y = 30;
        let lineheight = 15;
        let lines = txt.split('\n');

        for (let i = 0; i<lines.length; i++){
            ctx.fillText(lines[i], x, y + (i*lineheight) );
        }
    }
    setupCanvas();
});