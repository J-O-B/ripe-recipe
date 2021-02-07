$(document).ready(function(){
    $('#userCard').hide();
    $('#emailCard').hide();
    $('#foodCard').hide();
    $('#profPic').hide();
    $('#profBio').hide();
    $('#profPass').hide();
    $('#previewWindow').hide();
});
// Welcome Card
$('#showUser').click(function(){
    $('#startSignup').hide(1000);
    $('#userCard').show(1000);
})
// Username Card
$('#showEmail').click(function(){
    $('#userCard').hide(1000);
    $('#emailCard').show(1000);
})
// Email Card
$('#showFood').click(function(){
    $('#emailCard').hide(1000);
    $('#foodCard').show(1000);
})
$('#prevUsername').click(function(){
    $('#emailCard').hide(1000);
    $('#userCard').show(1000);
})
// Food Card
$('#prevEmail').click(function(){
    $('#foodCard').hide(1000);
    $('#emailCard').show(1000);
})
$('#showProfPic').click(function(){
    $('#foodCard').hide(1000);
    $('#profPic').show(1000);
})
// Profile Pic
$('#prevFoodCard').click(function(){
    $('#profPic').hide(1000);
    $('#foodCard').show(1000);
})
$('#showProfBio').click(function(){
    $('#profPic').hide(1000);
    $('#profBio').show(1000);
})
$('#prevPic').click(function(){
    let preview = $('#prof_pic').val();
    $('#previewWindow').show(1000);
    $('#previewWindow').html(`<img src="${preview}" id="previewProfPhoto" alt="Preview Picture" class="soft-corners">`);
})
// Bio Card
$('#prevProfPic').click(function(){
    $('#profBio').hide(1000);
    $('#profPic').show(1000);
})
$('#showPass').click(function(){
    $('#profBio').hide(1000);
    $('#profPass').show(1000);
})
// Password Card
$('#prevProfBio').click(function(){
    $('#profPass').hide(1000);
    $('#profBio').show(1000);
})