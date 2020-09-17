$(function () {
  var pokemonSearch;
  var defaultPokemon = "1";
  var defaultPokemonData;
  var choosePokemon;

  // This is the function that gets and loads the first pokemon when you first load the page.
  var initFunc = function () {
    defaultPokemonData = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + defaultPokemon,
      method: "GET"
    });

    defaultPokemonData.done(function (data) {
      defaultPokemonData = data;
      $(".pokedex h3").text(data.name.toUpperCase());
      $(".poke-img img").attr("src", data.sprites.front_default);
    });

    defaultPokemonData.fail(function (jqXHR, textStatus, error) {
      alert("Request failed: " + textStatus + error);
    });

    loadAllPokemon = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/?limit=811",
      method: "GET"
    });

    loadAllPokemon.done(function (data) {
      for (i in data.results) {
        $(".all-pokemon-list").append(
          "<div>" + data.results[i].name.toUpperCase() + "</div>"
        );
      }

      $(".loading-container").removeClass("active");
    });

    loadAllPokemon.fail(function (jqXHR, textStatus, error) {
      alert("Request failed: " + textStatus + error);
    });
  };

  // Here you are executing the initFunc function, which will perform the two ajax get requests above in order to retrieve the initial pokemon's name and image for the pokedex's main element and the names of all of the pokemon for the left and bottom slide out elements.
  initFunc();

  // Here you are assigning a click handler to the element that has the .btn class.  When you click this element, you will get the value of whatever is inside of the input element.  After this, a get ajax request will be executed, if the input was valid.  This request will return a pokemon's information and an image and the name of this pokemon will be displayed.
  $(".btn").on("click", function () {
    pokemonSearch = $(".pokedex input[type='text']").val();

    var request = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
      method: "GET"
    });

    request.done(function (data) {
      $(".pokedex h3").text(data.name.toUpperCase());
      $(".poke-img img").attr("src", data.sprites.front_default);
    });

    request.fail(function (jqXHR, textStatus, error) {
      alert("Request failed: " + textStatus + error);
    });
  });

  // This adds a click handler to the two elements that contain the .all-pokemon-list class.  This is a delegated click handler because it handles events that bubble up from the child div elements inside of the .all-pokemon-list elements.
  $(".all-pokemon-list").on("click", "div", function () {
    $(".pokedex input[type='text']").val("");

    choosePokemon = $(this).text().toLowerCase();

    var chooseRequest = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + choosePokemon,
      method: "GET"
    });

    chooseRequest.done(function (data) {
      $(".pokedex h3").text(data.name.toUpperCase());
      $(".poke-img img").attr("src", data.sprites.front_default);
    });

    chooseRequest.fail(function (jqXHR, textStatus, error) {
      alert("Request failed: " + textStatus + error);
    });
  });

  // These two variables keep track of whether the left or bottom elements that contain the pokemon lists are open.
  var isAllPokemonBoxLeftOpen = false;
  var isAllPokemonBoxBottomOpen = false;

  // This function will display the left or bottom element that contains the pokemon list.  Which element is opened will depend on the screen size.
  $(".show-all-pokemon").on("click", function () {
    $(".pokedex input[type='text']").val("");

    if (!isAllPokemonBoxLeftOpen && !isAllPokemonBoxBottomOpen) {
      $(".show-all-pokemon").text("Close");

      if ($(window).width() >= 768) {
        $(".all-pokemon-box-left").addClass("active");
        $(".pokedex").addClass("active");
        isAllPokemonBoxLeftOpen = true;
      } else {
        $(".all-pokemon-box-bottom").addClass("active");
        $(".pokedex").addClass("active");
        isAllPokemonBoxBottomOpen = true;
      }
    } else {
      isAllPokemonBoxLeftOpen = false;
      isAllPokemonBoxBottomOpen = false;
      $(".all-pokemon-box-left").removeClass("active");
      $(".all-pokemon-box-bottom").removeClass("active");
      $(".pokedex").removeClass("active");
      $(".show-all-pokemon").text("Show All");
    }
  });

  // This function will detect if the screen is resized and it will check if one of the two elements that contains the list of pokemon is open.  If the screen is resized and one of the elements is showing, it will automatically close that element and open the other, if the new screen size requires it.
  $(window).resize(function () {
    if ($(window).width() >= 768 && isAllPokemonBoxBottomOpen) {
      $(".all-pokemon-box-bottom").removeClass("active");
      isAllPokemonBoxBottomOpen = false;
      $(".all-pokemon-box-left").addClass("active");
      isAllPokemonBoxLeftOpen = true;
    } else if ($(window).width() < 768 && isAllPokemonBoxLeftOpen) {
      $(".all-pokemon-box-left").removeClass("active");
      isAllPokemonBoxLeftOpen = false;
      $(".all-pokemon-box-bottom").addClass("active");
      isAllPokemonBoxBottomOpen = true;
    }
  });
});
