//GIPHY BASICS
//add html search box and button
//set up gif ajax
//search button function for ajax query
//ajax queries the user input in search box
//GIF START & STOP


src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"

$("#gifButt").on("click", function(event) {
    
    var userSearch = $("#searchInput").val()

    console.log(userSearch)
    
    event.preventDefault();

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=NcAZq5HVV69EeVh7Dh267J8RixNGJ3zn&limit=10"
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)
      $("#gifContainer").text();
    })
})