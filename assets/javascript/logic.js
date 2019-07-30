$(document).ready(function () {

    //--  APPEND TOPIC BUTTONS --//
    var topics = ["Skateboarding", "Snowboarding", "Music", "Movies", "Dogs", "Video Games", "Memes", "Charlie Murphy Laugh"]
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
        //$("#buttons").push(userSearch);
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
            //--  CREATE BUTTON FROM SEARCH  --//
            $("#buttons").append("<button class='butts' id='newbutts'>" + userSearch + "</button>")
            $("#newbutts").attr("data", userSearch) //<-<-<- TARGET THE TEXT INSIDE THE BUTTON RATHER THAN USERSEARCH
        })
    })


    //-- BUTTONS CLICK --//
    $("#buttons").on("click", ".butts", function () {
        event.preventDefault()
        var buttonSearch = $(this).attr("data")
        //alert("Having issues targeting the button correctly :(")
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
            } console.log("buttonSerach = " + buttonSearch)
        })
    })

    //-- START & PAUSE CLICK -- //
    $("#gifContainer").on("click", "#gifim", function () {
        //alert("Having issues retargeting gif path :(")
        var state = $(this).attr("state")
        console.log("state = " + state)
        if (state == "still") {
            $(this).attr("src", $(this).attr("gifAnimated")) //<-<-<- GET VAR GIFS FROM sendIt FUNCTION, SCOPE ISSUE
            $(this).attr("state", "animated")
        } else {
            $(this).attr("src", $(this).attr("gifStill"))
            $(this).attr("state", "still")
        }
    })
})