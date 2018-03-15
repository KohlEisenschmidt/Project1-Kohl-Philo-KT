$( document ).ready(function() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBsJZ2ZSkf8F253DX2j3XY9wOzEnpxNFxQ",
      authDomain: "bootcampproject1-kohl-philo-kt.firebaseapp.com",
      databaseURL: "https://bootcampproject1-kohl-philo-kt.firebaseio.com",
      projectId: "bootcampproject1-kohl-philo-kt",
      storageBucket: "bootcampproject1-kohl-philo-kt.appspot.com",
      messagingSenderId: "903960143582"
    };
    firebase.initializeApp(config);
  
  
      $("#formSubmit").on('click', function(){
          event.preventDefault();
          ajaxCall()
      })
  
      function ajaxCall(){
      var API_URL = "https://api-us.faceplusplus.com/facepp/v3/detect";
      var API_KEY = "yOD8xeqc_2sZRuMQuL1zfKvce-MRAIwI";
      var API_SECRET = "SvehIfbpXzUXjvYBCqkiwhjwWukLQJs3";
      var image_url = $("#imgurl").val().trim()
      var return_attributes = "";
  
      var queryURL = API_URL + "?api_key=" + API_KEY + "&api_secret=" + API_SECRET + "&image_url=" + image_url + "&return_attributes=emotion"
  
      $.ajax({
          url: queryURL,
          method: "POST"
      })
          .then(function (response) {
              // console.log(response.faces[0].attributes.emotion);  //data response.faces[0].attributes.emotion
              var emotionsList = response.faces[0].attributes.emotion
              // console.log(emotionsList)
              var keys = Object.keys(emotionsList);
              keys.sort(function (a, b) { return emotionsList[b] - emotionsList[a] });
              // console.log(keys);
              // console.log(keys[0]);
  
              var emotion = keys[0];
              console.log(emotion);
          });
      }
      // we will create a function to pass in the word
      // var word = emotion
      var word = "anger"
  
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
          // alert(synonymArray);
  
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
                        synonymButton.attr("data-synonym", synonymArray[i]);
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
      $(document).on("click", "button", function() {
          console.log("teest")
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