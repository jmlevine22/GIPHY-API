

$(document).ready(function() {



//topics function 
var topics = ["vacation", "suitcase", "holiday", "travel", "airplane", 
"plane tickets" ,"beach", "skiing", "sightseeing", "museums", "gelato", "islands", 
"cruise", "road trip", "adventure", "hiking", "mountains", 
]; //end of topics 


//Function for adding the butttons 
function addButtons (){

//$("#topics-buttons").empty();


for (var i=0; i < topics.length; i++) {
	var x = $("<button>");
	x.addClass("topics");
	x.attr("data-type", topics[i]);
	x.text(topics[i]);
	$("#topics-buttons").append(x);
}

}



$(document).on("click", ".topics", function() {
	$("#giphy-div").empty();



	var info = $(this).attr("data-type"); //this is the topic button and name on button 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + info +  "&api_key=S8N0Yg5QqDxD0Kff2vTMNrHXHjUVjNHr&limit=5"; 

	$.ajax({
		url : queryURL,
		method: "GET"

	})// end ajax

	.then(function(response) {

		var results = response.data;
		

			for( var i = 0; i < results.length; i++) {

				
				var gifDiv = $("<div class = 'item'>");
				var rating = results[i].rating;
				var p = $("<h3>").text("Rating: " + rating.toUpperCase());

	//image animation
	var animated = results[i].images.fixed_height.url;
    var still = results[i].images.fixed_height_still.url;


	//$("#giphy-div").append(p);

	var topicImage = $("<img>");

        topicImage.attr("src", still);
        topicImage.attr("data-still", still);
        topicImage.attr("data-animate", animated);
        topicImage.attr("data-state", "still");
        topicImage.addClass("topic-image");

        gifDiv.append(p);
        gifDiv.append(topicImage);

        $("#giphy-div").append(gifDiv);
      }
    });
  });



 $(document).on("click", ".topic-image", function() {

    var condition = $(this).attr("data-state");

    if (condition === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  //takes user input and creates a new button 
$("#user-button").on("click", function(event) {

	event.preventDefault();

	var user = $("#user-text").val().trim();

	topics.push(user);

$("#topics-buttons").empty();
$("#topics-buttons2").append(topics);


addButtons();	

});



addButtons();	


}); //end of document.ready function