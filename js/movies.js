$(function() {

    var $this,
        $window = $(window);

    $window.load(function() { if (window.localStorage) Movie.LoadMovies(); });

    var delay = (function(){
        var timer = 0;
        return function(cb, ms) {
            clearTimeout(timer);
            timer = setTimeout(cb, ms);
        };
    })();

    $("#form").on("submit", function(e) {
        e.preventDefault();

        var query = $(this).serialize();
        var search = "http://www.omdbapi.com/?" + query;
        var str = "";

        $.ajax({
            type: "GET",
            dataType: "json",
            url: search,
            success: function(data) {
                var Search = {
                    title: data.Title,
                    year: data.Year,
                    genre: data.Genre,
                    poster: data.Poster
                };

                delay(function() {
                    if (Search.title != undefined) {
                        str += "title: ";
                        str += "<strong class='title'>"+Search.title+"</strong><br>";
                        str += "year: ";
                        str += "<strong class='year'>"+Search.year+"</strong><br>";
                        str += "genre: ";
                        str += "<strong class='genre'>"+Search.genre+"</strong><br>";
                        str += "<img src='"+Search.poster+"' alt='"+Search.title+"' class='poster' width='100%'>";
                        str += "<a href='javascript:;' id='add'>add this movie</a>"

                        $("#results").html(str);
                    }
                }, 1000);
            }
        });
    });

    $("#form").on("keyup", "#t", function() {
        $(this).submit();
    });

    var Movie = {};
    Movie.SaveTo = "CoupleMovies12";

    $("body").delegate("#add", "click", function() {
        $this = $(this).parent();

        var newMovie = {
            title: $this.find(".title").text(),
            year: $this.find(".year").text(),
            genre: $this.find(".genre").text(),
            poster: $this.find(".poster").attr("src")
        };

        Movie.SaveMovie(Movie.SaveTo, newMovie);
    });

    Movie.SaveMovie = function(name, data) {
        var old = localStorage.getItem(name) || "[]";
        var oldObj = JSON.parse(old) || [];
        var merged = oldObj.concat(data);

        window.localStorage.setItem(name, JSON.stringify(merged));
    }

    Movie.LoadMovies = function() {
        var str;

        var local = window.localStorage.getItem(Movie.SaveTo);
        if (local) {
            str = JSON.parse(local);
            console.log(str);
        }
    }

});
