$( document ).ready(function() {
    
var topics = ["Skateboarding", "Snowboarding", "Music", "Movies", "Dogs", "Video Games", "Memes", "Charlie Murphy Laugh"]
    for(var j=0; j < topics.length; j++){
    $("#buttons").append("<button id='butts'>" + topics[j] + '</button>')
}

//--  MAIN SEARCH FUNCTION  --//
    $("#gifButt").on("click", function(event) {
        //--  VARIABLE SETUP  --//
        event.preventDefault();
        var userSearch = $("#searchInput").val()
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=NcAZq5HVV69EeVh7Dh267J8RixNGJ3zn&limit=10"
        //--  AJAX  --//
        $.ajax({
            url: queryURL,
            method: "GET"
        //--  THEN APPEND GIFS  --//
        }).then(function sendIt(response) {
            var gifs = response.data
            $("#gifContainer").html("")
            for(var i = 0; i < gifs.length; i++){
                var gifDiv = $("<div id='gifdiv'>")
                var gifRating = gifs[i].rating
                var gifImg = $("<img id='gifim'>")
                gifImg.attr("src", gifs[i].images.original_still.url)
                gifImg.attr("state", "still")
                var p = $("<p>").text("Rating : " + gifRating)
                gifDiv.append(gifImg)
                gifDiv.append("<br>")
                gifDiv.append(gifRating)
                $("#gifContainer").prepend(gifDiv) 
                }


        //--  CREATE BUTTON FROM SEARCH  --//
            $("#buttons").append("<button id='butts'>" + userSearch + "</button>")
            $("#butts").attr("data", userSearch) //<-<-<- TARGET THE TEXT INSIDE THE BUTTON RATHER THAN USERSEARCH
        })})


    //-- BUTTONS CLICK --//
    $("#buttons").on("click", "#butts", function(){
        var buttonSearch = $("#butts").attr("data")
        alert("Having issues targeting the gifs path")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonSearch + "&api_key=NcAZq5HVV69EeVh7Dh267J8RixNGJ3zn&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        //--  THEN APPEND GIFS  --//
        }).then(function sendIt(response) {
            var gifs = response.data
            $("#gifContainer").html("")
            for(var i = 0; i < gifs.length; i++){
                var gifDiv = $("<div id='gifdiv'>")
                var gifRating = gifs[i].rating
                var gifImg = $("<img id='gifim'>")
                gifImg.attr("src", gifs[i].images.original_still.url)
                gifImg.attr("state", "still")
                var p = $("<p>").text("Rating : " + gifRating)
                gifDiv.append(gifImg)
                gifDiv.append("<br>")
                gifDiv.append(gifRating)
                $("#gifContainer").prepend(gifDiv) 
                }
        console.log(buttonSearch)
        })
    })


    //-- START & PAUSE FUNCTION --//
    function startStop(e){
    if($(this).state === "still"){
    $(this).attr("src", gifs.images.original.url) //<-<-<- GET VAR GIFS FROM sendIt FUNCTION, SCOPE ISSUE
    $(this).attr("state")
    } else{
    $(this).attr("src", gifs.images.original_still.url)
    }}

    //-- START & PAUSE CLICK -- //
    $("#gifContainer").on("click", "#gifim", function(){
        alert("Having issues retargeting gif path :(")
        startStop()
    })
})