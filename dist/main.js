$(function(){$(".menu").click(function(){$("#menu-open").toggleClass("active"),$("#menu-close").toggleClass("active")})}),$(function(){var t,e=$(window);e.load(function(){window.localStorage&&i.LoadMovies()});(function(){var t=0;return function(e,i){clearTimeout(t),t=setTimeout(e,i)}})();$("#form").on("submit",function(t){t.preventDefault();var e=$(this).serialize(),i="http://www.omdbapi.com/?"+e,o="";$.ajax({type:"GET",dataType:"json",url:i,success:function(t){var e={title:t.Title,year:t.Year,director:t.Director,genre:t.Genre,description:t.Plot,poster:t.Poster};void 0!=e.title&&(o+='<div class="tips">',o+='<img src="'+e.poster+'" alt="'+e.title+'" class="tips-poster">',o+='<div class="tips-description">',o+='<h3><strong data-movie="title">'+e.title+'</strong> <span data-movie="year">'+e.year+"</span></h3><br>",o+='<p data-movie="director"><strong>Director:</strong> '+e.director+"</p>",o+='<p data-movie="genre"><strong>Genre:</strong> '+e.genre+"</p>",o+='<p data-movie="description"><strong>Short description:</strong> '+e.description+"</p>",o+="</div>",o+='<a href="javascript:;" class="tips-add">add to list <i class="fa fa-check" aria-hidden="true"></i></a>',o+="</div>",$("#results").html(o))}})}),$("#form").on("keyup","#t",function(){$(this).submit()});var i={};i.SaveTo="CoupleMovies12345",$("body").delegate(".tips-add","click",function(){t=$(this).parent().find(".tips-description");var e={title:t.find("strong[data-movie='title']").text(),year:t.find("span[data-movie='year']").text(),director:t.find("p[data-movie='director']").text().replace("Director: ",""),genre:t.find("p[data-movie='genre']").text().replace("Genre: ",""),description:t.find("p[data-movie='description']").text().replace("Short description: ",""),poster:$(this).parent().find("img").attr("src")};i.SaveMovie(i.SaveTo,e),$(".notification").addClass("active"),setTimeout(function(){$(".notification").removeClass("active")},3e3)}),i.SaveMovie=function(t,e){var i=localStorage.getItem(t)||"[]",o=JSON.parse(i)||[],a=o.concat(e);window.localStorage.setItem(t,JSON.stringify(a))},i.LoadMovies=function(){var t,e=window.localStorage.getItem(i.SaveTo);e?(t=JSON.parse(e),console.log(t)):console.log("não")}});