function random() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
}

function search() {
  var parameter = document.getElementById("parameter").value;

  if (parameter == "") {
    $("#hits").html("Please enter a search term.");
  }

  $.ajax({
    dataType: "json",
    url:
      "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&limit=10&srsearch=" +
      parameter,
    success: function(result) {
      var hits = document.getElementById("hits");
      $("#hits").html(
        "There are " +
          result.query.searchinfo.totalhits +
          " total hits for '" +
          parameter +
          "'"
      );

      console.log(result);
      var titles = [];
      var links = [];
      for (var i = 0; i < 10; i++) {
        titles.push(result.query.search[i].title);
        links.push(
          "http://en.wikipedia.org/?curid=" + result.query.search[i].pageid
        );
      }

      console.log("Search result titles: " + titles.join("\n"));
      console.log("Search result titles: " + links.join("\n"));
      // to clear the search results between searches
      $("#results").html("");
      for (var j = 0; j < 10; j++) {
        $("#results").append(
          "<div class=box><a href=" +
            links[j] +
            " target=_blank>" +
            titles[j] +
            "</a></div>"
        );
      }
    }
  });
}

