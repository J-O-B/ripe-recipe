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
    $('#previewCard').hide();
    $('#eleventhAddCard').hide();
    $('#spacer').hide();
});

// Record As We Go Along
var type = "";
var name = "";
var desc = "";
var serve = "";
var prep = "";
var cook = "";
var diff = "";
var pic = "";
var ing = "";
var ins = "";
var tag = "";

var kcal = "";
var fat = "";
var sat = "";
var carb = "";
var sug = "";
var fib = "";
var pro = "";
var sal = "";

// Movement Between Sections:
//show first
$('#showFirstCard').click(function(){
    $('#addRecipeIntro').hide(1000);
    $('#firstAddCard').show(1000);
});
//show second
$('#showSecondCard').click(function(){
    type = $('#category').val();
    $('#firstAddCard').hide(1000);
    $('#secondAddCard').show(1000);
});
//show third
$('#showThirdCard').click(function(){
    name = $('#recipe_name').val();
    serve = $('#serves').val();
    // Hide Cook Time If Recipe Is For A Drink
    if ($('#category').val() == "drink"){
        $('#cook').hide();
        $('#spacer').show();
        // Change Text If Recipe Is For Drink Or Food
        $('#inText').text("Prep");
    }else{
        $('#inText').text("Prep & Cooking");
    }
    if ($('#recipe_name').val() == ""){
        alert("Please Add A Recipe Name");
    }else if ($('#serves').val() == ""){
        alert("Please Add A Value To 'Serves'");
    }else if ($('#recipe_name').val() == "" && $('#serves').val() == ""){
        alert("Please Add A Recipe Name & Serves Value")
    }else if ($('#recipe_name').val() != "" && $('#serves').val() != ""){
        $('#secondAddCard').hide(1000);
        $('#thirdAddCard').show(1000);
    }
});
//show fourth
$('#showFourthCard').click(function(){
    prep = $('#prep_time').val();
    cook = $('#cook_time').val();
    if ($('#prep_time').val() == ""){
        alert("Please Add A Prep Time");
    }else{
        $('#thirdAddCard').hide(1000);
        $('#fourthAddCard').show(1000); 
    }
});
//show fifth
$('#showFifthCard').click(function(){
    if ($('#recipe_pic').val() == ""){
        alert("Please Add A Recipe Picture URL");
    }else{
        diff = $('#difficulty').val();
        pic = $('#recipe_pic').val();
        $('#fourthAddCard').hide(1000);
        $('#fifthAddCard').show(1000);
    }
});
//show six
$('#showSixthCard').click(function(){
    if ($('#ingredients').val() == ""){
        alert("Please Add Ingredients To Your Recipe");
    }else{
        ing = $('#ingredients').val();
        $('#fifthAddCard').hide(1000);
        $('#sixthAddCard').show(1000); 
    }
});
//show seven
$('#showSeventhCard').click(function(){
    if ($('#description').val() == ""){
        alert("Please Add A Description To Your Recipe");
    }else{
        desc = $('#description').val();
        $('#sixthAddCard').hide(1000);
        $('#seventhAddCard').show(1000);
    }
});
//show eight
$('#showEigthCard').click(function(){
    if ($('#instructions').val() == ""){
        alert("Please Add A Description To Your Recipe");
    }else{
        ins = $('#instructions').val();
        $('#seventhAddCard').hide(1000);
        $('#eigthAddCard').show(1000);
    }
});
//show nine
$('#showNinthCard').click(function(){
    kcal = $('#kcal').val();
    fat = $('#fat').val();
    sat = $('#saturates').val();
    carb = $('#carbs').val();
    sug = $('#sugar').val();
    fib = $('#fibre').val();
    pro = $('#protein').val();
    sal = $('#salt').val();
    $('#eigthAddCard').hide(1000);
    $('#ninthAddCard').show(1000);
});
//show ten
$('#showTenthCard').click(function(){
    
    if ($('#tags').val() == ""){
        alert("Please Add At Least One Tag To Your Recipe");
    }else{
    tag = $('#tags').val();    
    $('#ninthAddCard').hide(1000);
    $('#previewCard').show(1000);
    // Update The Preview Screen
    $('#previewType').text(type);
    $('#previewName').text(name);
    $('#previewDescription').text(desc);
    $('#previewServes').text(serve);
    $('#previewPrep').text(prep);
    if ($('#category').val() != "drink"){
    $('#previewCook').text("Cook Time: " + cook + " minutes"); 
    }else{}
    $('#previewDifficulty').text(diff);
    $('#previewIngredients').text(ing);
    $('#previewInstructions').text(ins);
    $('#previewNutrition').text(kcal + fat + sat + carb + sug + fib + pro + salt);
    $('#previewTags').text(tag);
    }
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









