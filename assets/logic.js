   $( document ).ready(function() { 
   	var results;
    var animals = ["cat", "dog", "bird", "cow"];
        $("#add-animal").on("click", function(event) {
	        event.preventDefault();
	        // This line grabs the input from the textbox
	        var animal = $("#animal-input").val().trim();
	        // Adding animal from the textbox to our array
	        animals.push(animal);
	         renderButtons();
	        })

       
    //renders buttons
	function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < animals.length; i++) {
          var a = $("<button>");
          a.addClass("animal");
          a.attr("data-name", animals[i]);
          a.text(animals[i]);
          $("#buttons-view").append(a);
        } 
    }

  
      
	       
      
	function displayAnimals() {
	    
			$( "#gifs-appear-here" ).empty();
	      // Grabbing and storing the data-animal property value from the button
	      var dataName = $(this).attr("data-name");
	      // Constructing a queryURL using the animal name
	      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        dataName + "&api_key=dc6zaTOxFJmzC&limit=10";
	      // Performing an AJAX request with the queryURL
	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })
	        // After data comes back from the request
	        .done(function(response) {
	          console.log(queryURL);
	          console.log(response);
	          // storing the data from the AJAX request in the results variable
	          results = response.data;
	          // Looping through each result item
	          for (var i = 0; i < results.length; i++) {
	            // Creating and storing a div tag
	            var animalDiv = $("<div>");
	            // Creating a paragraph tag with the result item's rating
	            var p = $("<p>").text("Rating: " + results[i].rating);
	            // Creating and storing an image tag
	            var animalGif = $("<img>");
	            animalDiv.addClass("animalDiv");
	            // Setting the src attribute of the image to a property pulled off the result item
	            //animalGif.attr("data-animate", results[i].images.fixed_height.url);
	            //animalGif.attr("data-still", results[i].images.original_still.url);
	            animalGif.attr("src", results[i].images.fixed_height_still.url);
	            animalGif.attr("data-state", "still");
	             animalGif.attr("data-index", i);
	            animalGif.addClass("gif");
	            // Appending the paragraph and image tag to the animalDiv
	            
	            
	            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" di
	         
	            animalDiv.append(p);
	            animalDiv.append(animalGif);
	            $("#gifs-appear-here").prepend(animalDiv);



	          }
	        });
	};

	            
	 

	   $(document).on("click", ".animal", displayAnimals);
	   renderButtons();


	   	 $(document).on("click", ".gif", function() {
	      	console.log("clicked gif", this)
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
     			 var state = $(this).attr("data-state");
     			 var i = $(this).attr("data-index");

      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
     			 if (state === "still") {
        			$(this).attr("src", results[i].images.fixed_height.url);
        			$(this).attr("data-state", "animate");
      			} else {
        			$(this).attr("src", results[i].images.fixed_height_still.url);
        			$(this).attr("data-state", "still");
     			 }
   			 });

	 
})