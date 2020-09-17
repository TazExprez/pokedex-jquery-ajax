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
      $(".loading-container").removeClass("active");

      for (i in data.results) {
        $(".all-pokemon-list").append(
          "<div>" + data.results[i].name.toUpperCase() + "</div>"
        );
      }
    });

    loadAllPokemon.fail(function (jqXHR, textStatus, erro) {
      alert("Request failed: " + textStatus + error);
    });
  };

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

  var isAllPokemonBoxLeftOpen = false;
  var isAllPokemonBoxBottomOpen = false;

  $(".show-all-pokemon").on("click", function () {
    $(".pokedex input[type='text']").val("");

    if (!isAllPokemonBoxLeftOpen && !isAllPokemonBoxBottomOpen) {
      $(".show-all-pokemon").text("Close");

      if ($(window).width() >= 768) {
        $(".all-pokemon-box-left").addClass("active");
        isAllPokemonBoxLeftOpen = true;
      } else {
        $(".all-pokemon-box-bottom").addClass("active");
        isAllPokemonBoxBottomOpen = true;
      }
    } else {
      isAllPokemonBoxLeftOpen = false;
      isAllPokemonBoxBottomOpen = false;
      $(".all-pokemon-box-left").removeClass("active");
      $(".all-pokemon-box-bottom").removeClass("active");
      $(".show-all-pokemon").text("Show All");
    }
  });

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
