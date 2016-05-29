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
                    director: data.Director,
                    genre: data.Genre,
                    description: data.Plot,
                    poster: data.Poster
                };

                if (Search.title != undefined) {
                    str += '<div class="tips">';
                    str += '<img src="'+ Search.poster +'" alt="'+ Search.title +'" class="tips-poster">';
                    str += '<div class="tips-description">';
                    str += '<h3><strong data-movie="title">'+ Search.title +'</strong> <span data-movie="year">'+ Search.year +'</span></h3><br>';
                    str += '<p data-movie="director"><strong>Director:</strong> '+ Search.director +'</p>';
                    str += '<p data-movie="genre"><strong>Genre:</strong> '+ Search.genre +'</p>';
                    str += '<p data-movie="description"><strong>Short description:</strong> '+ Search.description +'</p>';
                    str += '</div>'; // desc
                    str += '<a href="javascript:;" class="tips-add">add to list <i class="fa fa-check" aria-hidden="true"></i></a>';
                    str += '</div>'; // tips

                    $("#results").html(str);
                }
            }
        });
    });

    $("#form").on("keyup", "#t", function() {
        $(this).submit();
    });

    var Movie = {};
    Movie.SaveTo = "CoupleMovies12345";

    $("body").delegate(".tips-add", "click", function() {
        $this = $(this).parent().find(".tips-description");

        var newMovie = {
            title: $this.find("strong[data-movie='title']").text(),
            year: $this.find("span[data-movie='year']").text(),
            director: $this.find("p[data-movie='director']").text().replace("Director: ", ""),
            genre: $this.find("p[data-movie='genre']").text().replace("Genre: ", ""),
            description: $this.find("p[data-movie='description']").text().replace("Short description: ", ""),
            poster: $(this).parent().find("img").attr("src")
        };

        Movie.SaveMovie(Movie.SaveTo, newMovie);

        $(".notification").addClass("active");
        setTimeout(function() { $(".notification").removeClass("active"); }, 3000);
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
        } else {
            console.log("não");
        }
    }

});
