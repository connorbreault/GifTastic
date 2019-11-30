$(document).ready(function () {

    //--  APPEND TOPIC BUTTONS --//
    var topics = ["Skateboarding", "Snowboarding", "Music", "Movies", "Dogs", "Video Games", "Memes"]
    function renderButts() {
        $("#buttons").empty()
        for (var j = 0; j < topics.length; j++) {
            var topicButt = $("<button class='butts' id='butts'>")
            topicButt.attr("data", topics[j])
            topicButt.text(topics[j])
            $("#buttons").append(topicButt)
        }
    }
    renderButts()

    //--  MAIN SEARCH FUNCTION  --//
    $("#searchButt").on("click", function (event) {
        //--  VARIABLE SETUP  --//
        event.preventDefault();
        var userSearch = $("#searchInput").val();
        topics.push(userSearch);
        $("#buttons").empty()
        $("#gifContainer").removeClass("hidden")
        $(".instructions").removeClass("hidden")
        renderButts()
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=NcAZq5HVV69EeVh7Dh267J8RixNGJ3zn&limit=10"
        //--  AJAX  --//
        $.ajax({
            url: queryURL,
            method: "GET"
            //--  THEN APPEND GIFS  --//
        }).then(function sendIt(response) {
            var gifs = response.data
            $("#gifContainer").html("")
            for (var i = 0; i < gifs.length; i++) {
                var gifDiv = $("<div id='gifdiv'>")
                var gifRating = gifs[i].rating
                var gifImg = $("<img id='gifim'>")
                gifImg.attr({
                    "src": gifs[i].images.original_still.url,
                    "gifStill": gifs[i].images.original_still.url,
                    "gifAnimated": gifs[i].images.original.url,
                    "state": "still"
                })
                gifDiv.append(gifImg)
                gifDiv.append("<br>")
                gifDiv.append("Rating: " + gifRating)
                $("#gifContainer").prepend(gifDiv)
            }
        })
    })


    //-- BUTTONS CLICK --//
    $("#buttons").on("click", ".butts", function () {
        event.preventDefault()
        var buttonSearch = $(this).attr("data")
        $("#gifContainer").removeClass("hidden")
        $(".instructions").removeClass("hidden")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonSearch + "&api_key=NcAZq5HVV69EeVh7Dh267J8RixNGJ3zn&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
            //--  THEN APPEND GIFS  --//
        }).then(function sendIt(response) {
            gifs = response.data
            $("#gifContainer").html("")
            for (var i = 0; i < gifs.length; i++) {
                var gifDiv = $("<div id='gifdiv'>")
                var gifRating = gifs[i].rating
                var gifImg = $("<img id='gifim'>")
                gifImg.attr({
                    "src": gifs[i].images.original_still.url,
                    "gifStill": gifs[i].images.original_still.url,
                    "gifAnimated": gifs[i].images.original.url,
                    "state": "still",
                })
                gifDiv.append(gifImg)
                gifDiv.append("<br>")
                gifDiv.append(gifRating)
                $("#gifContainer").prepend(gifDiv)
            }
        })
    })

    //-- START & PAUSE CLICK -- //
    $("#gifContainer").on("click", "#gifim", function () {
        var state = $(this).attr("state")
        console.log("state = " + state)
        if (state == "still") {
            $(this).attr("src", $(this).attr("gifAnimated"))
            $(this).attr("state", "animated")
        } else {
            $(this).attr("src", $(this).attr("gifStill"))
            $(this).attr("state", "still")
        }
    })
})