$(document).ready(function(){

    // 1- Hide All Cards
    $('#firstAddCard').hide();
    $('#secondAddCard').hide();
    $('#thirdAddCard').hide();
    $('#fourthAddCard').hide();
    $('#fifthAddCard').hide();
    $('#sixthAddCard').hide();
    $('#seventhAddCard').hide();
    $('#eigthAddCard').hide();
    $('#ninthAddCard').hide();
    $('#tenthAddCard').hide();
    $('#firstAddCard').hide();
    $('#spacer').hide();
});

// Movement Between Sections:
//show first
$('#showFirstCard').click(function(){
    $('#addRecipeIntro').hide(1000);
    $('#firstAddCard').show(1000);
});
//show second
$('#showSecondCard').click(function(){
    $('#firstAddCard').hide(1000);
    $('#secondAddCard').show(1000);
});
//show third
$('#showThirdCard').click(function(){
    $('#secondAddCard').hide(1000);
    $('#thirdAddCard').show(1000);
    if ($('#category').val() == "drink"){
        $('#cook').hide();
        $('#spacer').show();
        $('#inText').text("Prep");
    }else{
        $('#inText').text("Prep & Cooking");
    }
});
//show fourth
$('#showFourthCard').click(function(){
    $('#thirdAddCard').hide(1000);
    $('#fourthAddCard').show(1000);
});
//show fifth
$('#showFifthCard').click(function(){
    $('#fourthAddCard').hide(1000);
    $('#fifthAddCard').show(1000);
});
//show six
$('#showSixthCard').click(function(){
    $('#fifthAddCard').hide(1000);
    $('#sixthAddCard').show(1000);
});
//show seven
$('#showSeventhCard').click(function(){
    $('#sixthAddCard').hide(1000);
    $('#seventhAddCard').show(1000);
});
//show eight
$('#showEigthCard').click(function(){
    $('#seventhAddCard').hide(1000);
    $('#eigthAddCard').show(1000);
});
//show nine
$('#showNinthCard').click(function(){
    $('#eigthAddCard').hide(1000);
    $('#ninthAddCard').show(1000);
});
//show ten
$('#showTenthCard').click(function(){
    $('#ninthAddCard').hide(1000);
    $('#tenthAddCard').show(1000);
});


// Previous Buttons:

$('#backToFirst').click(function(){
    $('#secondAddCard').hide(1000);
    $('#firstAddCard').show(1000);
});
$('#backToSecond').click(function(){
    $('#thirdAddCard').hide(1000);
    $('#secondAddCard').show(1000);
});

$('#backToThird').click(function(){
    $('#fourthAddCard').hide(1000);
    $('#thirdAddCard').show(1000);
});
$('#backToFourth').click(function(){
    $('#fifthAddCard').hide(1000);
    $('#fourthAddCard').show(1000);
});
$('#backToFifth').click(function(){
    $('#sixthAddCard').hide(1000);
    $('#fifthAddCard').show(1000);
});
$('#backToSixth').click(function(){
    $('#seventhAddCard').hide(1000);
    $('#sixthAddCard').show(1000);
});
$('#backToSeventh').click(function(){
    $('#eigthAddCard').hide(1000);
    $('#seventhAddCard').show(1000);
});
$('#backToEigth').click(function(){
    $('#ninthAddCard').hide(1000);
    $('#eigthAddCard').show(1000);
});
$('#backToNinth').click(function(){
    $('#tenthAddCard').hide(1000);
    $('#ninthAddCard').show(1000);
});