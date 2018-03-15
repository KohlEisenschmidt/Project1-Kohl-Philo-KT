$( document ).ready(function() {
    // we will create a function to pass in the word
    var word = "disgust"

    var queryURL = "http://words.bighugelabs.com/api/2/d49d6cfaa20d4dd74f649fe59a83969e/" + word + "/json";
    console.log(queryURL)

     // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        var parsedresponse = JSON.parse(response);
        // response= JSON.parse(response);
        // console.log(parsedresponse.noun);
        // console.log(parsedresponse.noun.syn);
        // console.log(parsedresponse.noun.sim);
        // console.log(parsedresponse.noun.syn[0]);

        var synonymArray = [word];
        console.log(synonymArray);

        for (wordType in parsedresponse){
            console.log(wordType);          
            for (synOrsim in parsedresponse[wordType]){
                console.log("an " + synOrsim);
                for (word in parsedresponse[wordType][synOrsim]){
                    console.log(parsedresponse[wordType][synOrsim][word]);
                    if (synonymArray.length<5){
                        synonymArray.push(parsedresponse[wordType][synOrsim][word]);
                    }
                }
            }
        }

        console.log(synonymArray);
        console.log();
        alert(synonymArray);

        function createButtons() {
            // Deleting the words prior to adding new words
            // (this is necessary otherwise we will have repeat buttons)
            $("#buttons-view").empty();
    
            // Looping through the synonym array of words
            for (var i = 0; i < synonymArray.length; i++) {
                console.log(synonymArray.length);
                // Then dynamicaly generating buttons for each movie in the array
                // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
                var synonymButton = $("<button>");
                // Adding a class of movie to our button
                synonymButton.addClass("synonym");
                // Adding a data-attribute
                    //   synonymButton.attr("data-name", synonymArray[i]);
                // Providing the initial button text
                      synonymButton.text(synonymArray[i]);
                // Adding the button to the HTML
                    //    synonymButton.attr("data-name", synonymArray[i]);
                $("#buttons-view").append(synonymButton);
    
                // Calling renderButtons which handles the processing of our movie array
                
                
                // Adding the movie from the textbox to our array
                // word.push(movie);
            }
        }
        createButtons(synonymArray);

    });
        


    // Event listener for all button elements
    $("button").on("click", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var synonym = $(this).attr("data-synonym");

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        synonym + "&api_key=VB3BfFDW5sNyruOi6YZFWrgYA7apeTlC&limit=5";

        // Performing our AJAX GET request
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result synOrsim
            for (var i = 0; i < results.length; i++) {
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "synOrsim"
                    var gifDiv = $("<div class='synOrsim'>");

                    // Storing the result synOrsim's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result synOrsim's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var synonymImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result synOrsim
                    synonymImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                //   gifDiv.append(p);
                    gifDiv.append(synonymImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
    });

    
});
// createButtons();