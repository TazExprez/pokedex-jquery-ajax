// $(function () {
//   var pokemonSearch;
//   var defaultPokemon = "1";
//   var defaultPokemonData;

//   var initFunc = function () {
//     // https://pokeapi.co/api/v2/pokemon/?limit=811
//     defaultPokemonData = $.ajax({
//       url: "https://pokeapi.co/api/v2/pokemon/" + defaultPokemon,
//       method: "GET"
//     });

//     defaultPokemonData.done(function (data) {
//       defaultPokemonData = data;

//       $(".loading-container").removeClass("active");

//       $(".pokedex h3").text(data.name.toUpperCase());

//       $(".poke-img img").attr("src", data.sprites.front_default);

//       console.log(defaultPokemonData);
//     });

//     defaultPokemonData.fail(function (jqXHR, textStatus, error) {
//       alert("Request failed: " + textStatus + error);
//     });
//   };

//   initFunc();

//   $(".btn").on("click", function () {
//     pokemonSearch = $(".pokedex input[type='text']").val();

//     var request = $.ajax({
//       url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
//       method: "GET"
//     });

//     request.done(function (data) {
//       $(".pokedex h3").text(data.name.toUpperCase());

//       $(".poke-img img").attr("src", data.sprites.front_default);

//       console.log(data);
//     });

//     request.fail(function (jqXHR, textStatus, error) {
//       alert("Request failed: " + textStatus + error);
//     });
//   });
// });

$(function () {
  var pokemonSearch;
  var defaultPokemon = "1";
  var defaultPokemonData;
  var choosePokemon;

  var initFunc = function () {
    // https://pokeapi.co/api/v2/pokemon/?limit=811
    defaultPokemonData = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + defaultPokemon,
      method: "GET"
    });

    defaultPokemonData.done(function (data) {
      defaultPokemonData = data;

      // $(".loading-container").removeClass("active");

      $(".pokedex h3").text(data.name.toUpperCase());

      $(".poke-img img").attr("src", data.sprites.front_default);

      console.log(defaultPokemonData);
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
          "<div>" + data.results[i].name + "</div>"
        );
      }

      console.log(data);
    });

    loadAllPokemon.fail(function (jqXHR, textStatus, erro) {
      alert("Request failed: " + textStatus + error);
    });
  };

  initFunc();

  $(".btn").on("click", function () {
    pokemonSearch = $(".pokedex input[type='text']").val();

    var request = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
      method: "GET"
    });

    request.done(function (data) {
      $(".pokedex h3").text(data.name.toUpperCase());

      $(".poke-img img").attr("src", data.sprites.front_default);

      console.log(data);
    });

    request.fail(function (jqXHR, textStatus, error) {
      alert("Request failed: " + textStatus + error);
    });
  });

  $(".all-pokemon-list").on("click", "div", function () {
    // console.log($(this).text());

    choosePokemon = $(this).text();

    var chooseRequest = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + choosePokemon,
      method: "GET"
    });

    chooseRequest.done(function (data) {
      $(".pokedex h3").text(data.name.toUpperCase());

      $(".poke-img img").attr("src", data.sprites.front_default);

      console.log(data);
    });

    chooseRequest.fail(function (jqXHR, textStatus, error) {
      alert("Request failed: " + textStatus + error);
    });
  });
});
