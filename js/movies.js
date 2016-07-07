$(function() {

    var $this,
        $window = $(window);

    $window.load(function() { if (window.localStorage) Movie.LoadMovies(); });

    $("#form").on("submit", function(e) {
        e.preventDefault();

        var query = $(this).serialize();
        var search = "https://www.omdbapi.com/?" + query + "&type=movie";
        var str = "";

        $.ajax({
            type: "GET",
            dataType: "json",
            url: search,
            success: function(data) {
                var s = {};

                if (data.Search != undefined) {
                    var s_len = data.Search.length;

                    if (s_len) {
                        for (var i = 0; i < s_len; i++) {
                            s[i] = {
                                title: data.Search[i].Title,
                                year: data.Search[i].Year,
                                poster: data.Search[i].Poster
                            }

                            str += '<div class="tips">';
                            if (s[i].poster != "N/A") {
                                str += '<img src="'+ s[i].poster +'" alt="'+ s[i].title +'" class="tips-poster">';
                            }
                            str += '<div class="tips-description">';
                            str += '<h3><strong data-movie="title">'+ s[i].title +'</strong> <span data-movie="year">'+ s[i].year +'</span></h3><br>';
                            str += '</div>'; // desc
                            str += '<a href="javascript:;" class="tips-add">add to list <i class="fa fa-check" aria-hidden="true"></i></a>';
                            str += '</div>'; // tips
                        }

                        $("#results").html(str);
                    }
                } else {
                    $("#results").html("<p class='no-movies'>No matches found.</p>");
                }
            }
        });
    });

    var delay = (function() {
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    $("#t").on("keydown", function() {
        $this = $(this);
        delay(function() {
            $this.submit();
        }, 1000);
    });

    var Movie = {};
    /**
     ** Movie.SaveTo
     */
    Movie.SaveTo = "CoupleMovies";
    /**
     ** Movie.SaveTo
     */

    $("body").delegate(".tips-add", "click", function() {
        $this = $(this).parent().find(".tips-description");

        var newMovie = {
            title: $this.find("strong[data-movie='title']").text(),
            year: $this.find("span[data-movie='year']").text(),
            poster: $(this).parent().find("img").attr("src")
        };

        Movie.SaveMovie(Movie.SaveTo, newMovie);
    });

    $("body").delegate(".tips-remove", "click", function() {
        $this = $(this).parent();
        $this.css("opacity", "0").one("webkitTransitionEnd transitionend", function() {
            $this.hide(300, function() {
                Movie.DeleteMovie($this);
            });
        });
    });

    Movie.SaveMovie = function(name, data) {
        var old = localStorage.getItem(name) || "[]";
        var oldObj = JSON.parse(old) || [];
        var merged = oldObj.concat(data);

        var _length = merged.length - 1;
        var exists = false;

        // loop through all movies already on localStorage to see if there's a duplicate
        for (var i = 0; i < oldObj.length; i++) {
            if (merged[_length].title == oldObj[i].title) exists = true;
        }

        if (!exists) { // if there isn't a duplicate, add movie to the list
            window.localStorage.setItem(name, JSON.stringify(merged));
            // refresh my list
            Movie.LoadMovies();

            $("#notification-added").addClass("active");
            setTimeout(function() { $("#notification-added").removeClass("active"); }, 3000);
        } else {
            $("#notification-exists").addClass("active");
            setTimeout(function() { $("#notification-exists").removeClass("active"); }, 3000);
        }
    }

    Movie.LoadMovies = function() {
        var str, data;

        var local = window.localStorage.getItem(Movie.SaveTo);
        if (local) {
            data = JSON.parse(local);

            if (data.length >= 1) {
                for (var i in data) {
                    var movie = data[i];

                    str += '<div class="tips">';
                    if (movie.poster != undefined) {
                        str += '<img src="'+ movie.poster +'" alt="'+ movie.title +'" class="tips-poster">';
                    }
                    str += '<div class="tips-description">';
                    str += '<h3><strong data-movie="title">'+ movie.title +'</strong> <span data-movie="year">'+ movie.year +'</span></h3><br>';
                    str += '</div>'; // desc
                    str += '<a href="javascript:;" class="tips-remove">remove</a>';
                    str += '</div>'; // tips
                }

                str = str.replace("undefined", "");
                $("#my-list").html(str);
            } else {
                $("#my-list").html("<p class='no-movies'>There are no movies on your list.</p>");
            }
        } else {
            $("#my-list").html("<p class='no-movies'>There are no movies on your list.</p>");
        }
    }

    Movie.DeleteMovie = function(movie) {
        var mv_name = movie.find("strong[data-movie='title']").text();
        var movies = JSON.parse(localStorage.getItem(Movie.SaveTo));
        var deleted = $.grep(movies, function(i) {
            return i.title !== mv_name;
        });

        window.localStorage.setItem(Movie.SaveTo, JSON.stringify(deleted));
        setTimeout(function() {
            Movie.LoadMovies();

            $("#notification-del").addClass("active");
            setTimeout(function() { $("#notification-del").removeClass("active"); }, 3000);
        }, 1000); // refresh
    }

});
