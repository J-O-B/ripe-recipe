$(document).ready(function(){
    $('#userCard').hide();
    $('#emailCard').hide();
    $('#foodCard').hide();
    $('#profPic').hide();
    $('#profBio').hide();
    $('#profPass').hide();
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
$('#prevUsername').click(function(){
    $('#emailCard').hide(1000);
    $('#userCard').show(1000);
})