//GIPHY BASICS
//add html search box and button
//set up gif ajax
//search button function for ajax query
//ajax queries the user input in search box
//GIF START & STOP


src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"


$("#gifButt").on("click", function(event) {
    
    event.preventDefault();
    
    var userSearch = $("#searchInput").val()

    console.log(userSearch)

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=NcAZq5HVV69EeVh7Dh267J8RixNGJ3zn&limit=10"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)

        var gifs = response.data
        $("#gifContainer").html("")
        for(var i = 0; i < gifs.length; i++){

            $("#gifContainer").prepend("<div id='gif'>" + "<img src='"+gifs[i].images.original_still.url+"' style='height:300px; width:300px'>" + "<br>" + gifs[i].rating + "</div>") 
        }
        $("#gifContainer").prepend("<br>" + userSearch + "<hr>")
        $("#buttons").prepend("<button class='butts' id='butts'>" + userSearch + "</button>")
    })
    $("#buttons").on("click", "#butts", function(){
        var buttSearch = $(this).val()
        console.log(buttSearch)
        
    })
})