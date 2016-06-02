$(function() {

    $(window).load(function() { $("body").removeClass("opacity"); });

    // menu
    $(".menu").click(function() {
        $("#menu-open").toggleClass("active");
        $("#menu-close").toggleClass("active");
    });

    // close tips
    var isClosed = window.localStorage.getItem("CoupleMoviesTips");

    if (isClosed) {
        $(".tips-container").remove();
    } else {
        $("#close-tips").click(function() {
            $(".tips-container").css("opacity", 0);
            $(".tips-container").one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oatransitionend transitionend", function() {
                $(".tips-container").hide("slow", function() { $(".tips-container").remove(); });
            });

            var closed = true;
            window.localStorage.setItem("CoupleMoviesTips", closed);
        });
    }

});
