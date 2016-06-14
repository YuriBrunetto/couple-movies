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
                    poster: data.Poster
                };

                if (Search.title != undefined) {
                    str += '<div class="tips">';
                    str += '<img src="'+ Search.poster +'" alt="'+ Search.title +'" class="tips-poster">';
                    str += '<div class="tips-description">';
                    str += '<h3><strong data-movie="title">'+ Search.title +'</strong> <span data-movie="year">'+ Search.year +'</span></h3><br>';
                    str += '<p data-movie="director"><strong>Director:</strong> '+ Search.director +'</p>';
                    str += '<p data-movie="genre"><strong>Genre:</strong> '+ Search.genre +'</p>';
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
    Movie.SaveTo = "CoupleMovies55";

    $("body").delegate(".tips-add", "click", function() {
        $this = $(this).parent().find(".tips-description");

        var newMovie = {
            title: $this.find("strong[data-movie='title']").text(),
            year: $this.find("span[data-movie='year']").text(),
            director: $this.find("p[data-movie='director']").text().replace("Director: ", ""),
            genre: $this.find("p[data-movie='genre']").text().replace("Genre: ", ""),
            poster: $(this).parent().find("img").attr("src")
        };

        Movie.SaveMovie(Movie.SaveTo, newMovie);
    });

    $("body").delegate(".tips-remove", "click", function() {
        $this = $(this).parent();
        Movie.DeleteMovie($this);
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

            $(".notification").addClass("active");
            setTimeout(function() { $(".notification").removeClass("active"); }, 3000);
        } else {
            console.log("already exists");
        }
    }

    Movie.LoadMovies = function() {
        var str, data;

        var local = window.localStorage.getItem(Movie.SaveTo);
        if (local) {
            data = JSON.parse(local);

            for (var i in data) {
                var movie = data[i];

                str += '<div class="tips">';
                str += '<img src="'+ movie.poster +'" alt="'+ movie.title +'" class="tips-poster">';
                str += '<div class="tips-description">';
                str += '<h3><strong data-movie="title">'+ movie.title +'</strong> <span data-movie="year">'+ movie.year +'</span></h3><br>';
                str += '<p data-movie="director"><strong>Director:</strong> '+ movie.director +'</p>';
                str += '<p data-movie="genre"><strong>Genre:</strong> '+ movie.genre +'</p>';
                str += '</div>'; // desc
                str += '<a href="javascript:;" class="tips-remove">remove</a>';
                str += '</div>'; // tips
            }

            str = str.replace("undefined", "");
            $("#my-list").html(str);
        } else {
            console.log("não");
        }
    }

    Movie.DeleteMovie = function(movie) {
        var mv_name = movie.find("strong[data-movie='title']").text();
        var movies = JSON.parse(localStorage.getItem(Movie.SaveTo));
        var del = false;
        for (var i = 0; i < movies.length; i++) {
            if (mv_name == movies[i].title) {
                del = true;
            }
        }
        if (del) {

        }
    }

});
