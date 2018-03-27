var animalGifs = ["cat", "dog", "pig", "rat", "elephant", "tiger", "lion", "giraffe"];


function renderButtons() {
    $("#animalButtons").empty();
    for (var i = 0; i < animalGifs.length; i++) {
        var a = $("<button>");
        a.addClass("search");
        a.attr("data-name", animalGifs[i]);
        a.text(animalGifs[i]);
        $("#animalButtons").append(a);
        }
    }


$("#addAnimals").on("click", function (event) {
    event.preventDefault();
    var newAnimal = $("#input").val().trim();
    animalGifs.push(newAnimal);
    renderButtons();
    }
);

renderButtons();


$("body").on("click", ".search", function () {
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=D9N8f2kxjfmVHCOILPqAHhii1wV1lurQ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var j = 0; j < response.data.length; j++) {
            var newGif = $("<div>");
            var playGif = response.data[j].images.original.url;
            var stopGif = response.data[j].images.original_still.url;
            var ratingGif = response.data[j].rating;
            var titleGif = response.data[j].title;
            var imgGif = $("<img>");
            imgGif.attr("data-play", playGif);
            imgGif.attr("src", stopGif);
            imgGif.attr("data-still", stopGif);
            imgGif.attr("data-state", "still");
            imgGif.attr("alt", "giphy");
            newGif.prepend(imgGif);
            newGif.prepend("<div>Rating: " + ratingGif + "</div>");
            newGif.prepend("<div>Title: "+ titleGif + "</div>");
            $("#showGifs").prepend(newGif);
        }

        $("body").on("click", "img", function () {
            var gifState = $(this).attr("data-state");
            if (gifState === "still") {
                $(this).attr("src", $(this).attr("data-play"));
                $(this).attr("data-state", "play");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            then();
        })

    })
});




