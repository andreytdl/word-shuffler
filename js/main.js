(function() {
  
  var infoButton = document.getElementById("info-button"),
      infoSpan = document.getElementById("info-text"),
      formButton = document.getElementById("shuffler-form-button"),
      textarea = document.getElementById("shuffler-form-textarea"),
      span = document.getElementById("shuffled-text");
  
  /**
   * Shuffle one or many words in string
   *
   * @param string
   * @return string
   *
   */
  shuffleWords = function(string) {
    
    // Make every single word in string to a value in array
    // Make newlines to spaces and then split into array by spaces
    var array = string.replace(/\n/g, " ").split(" ")
    
    // Create empty array to put in shuffled words
    var shuffledWordsInArray = [];
   
    // Loop as many times as there are words
    for(var i = 0; i < array.length; i++) {
      
      // Shuffle each word using function oneWordShuffle, then put in to empty array as a value
      shuffledWordsInArray.push(oneWordShuffle(array[i]));
      
    }
    
    // Return the string from param with all words shuffled
    return(shuffledWordsInArray.join([separator = " "]));
  };
  
  /**
   * Randomize array element order in-place.
   * Using Fisher-Yates shuffle algorithm.
   * [Found on StackOverflow]
   *
   * @param array
   * @return array
   *
   */
  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }
  
  /**
   * Shuffle order of characters in string/word
   * Only allow characters a-z, A-Z, 0-9 and !?.
   * Always put characters !?. at end of words
   *
   * @param string
   * @return string
   *
   */
  oneWordShuffle = function(string) {
    
    var reg = /[^a-zA-Z0-9\!\?\.]+/;
    
    // If string contains characters other than a-z A-Z 0-9 or ?.1, remove these ugly characters
    if(reg.test(string)) {
      string = string.replace(/[^a-zA-Z0-9\!\?\.]/g, "");
    }
    
    // Make word in to array with each letter being a value
    var array = string.split("");
    
    // Shuffle the array using Fisher-Yates
    array = shuffleArray(array);
    
    // Loop as many times as there are characters
    // Find characters ?!., remove them, and put in same ones at end of array
    for(var i = array.length -1; i >= 0; i--) {
      
      if(array[i] === ".") {
        array.splice(i, 1);
        array.push(".");
      }
      
      if(array[i] === "?") {
        array.splice(i, 1);
        array.push("?");
      }
      
      if(array[i] === "!") {
        array.splice(i, 1);
        array.push("!");
      }
      
    }
    
    // Make array in to string
    var string = array.join([separator = ""]);
    
    // If string isn't all caps, make everything except first letter lowercase
    if(string !== string.toUpperCase()) {
      array = fixUppercase(array);
      string = array.join([separator = ""]);
    }
    
    return string;
    
  };
  
  /**
   * Check if an array value is uppercase, make it lowercase and make the first value of array uppercase
   *
   * @param array
   * @return array
   *
   */
  fixUppercase = function(array) {
    
    // Regex to find uppercase letter
    var reg = /^[A-Z]*$/;
    
    // Loop as many times as there are letters
    for(var i = 0; i < array.length; i++) {
      
      // If an uppercase value is found convert it to lowercase, make the first value in array uppercase
      if(reg.test(array[i])) {
        array[i] = array[i].toLowerCase();
        array[0] = array[0].toUpperCase();
      }
    }
    
    return array;
    
  };
  
  
  formButton.addEventListener("click", function(){
    span.className = "do-fade-in";
    span.textContent = shuffleWords(textarea.value);
    setTimeout(function() {
      span.className = "";
    }, 750);
  }, false);
  
  infoButton.addEventListener("click", function() {
    
    if(infoSpan.style.display == "inline-block") {
      infoSpan.className = "do-fade-out";
      setTimeout(function() {
        infoSpan.style.display = "none";
      }, 400);
    }
    else {
      infoSpan.style.display = "inline-block";
      infoSpan.className = "do-fade-in";
    }
    
  }, false);
  
})();