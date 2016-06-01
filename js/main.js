$(function() {

    $(window).load(function() { $("body").removeClass("opacity"); });

    // menu
    $(".menu").click(function() {
        $("#menu-open").toggleClass("active");
        $("#menu-close").toggleClass("active");
    });

});
