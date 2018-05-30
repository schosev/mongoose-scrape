// Grab the articles as a json
$.getJSON("/articles", function(data) {
  populateData(data);
});

// Whenever someone clicks a p tag
$(document).on("click", "#newArticles", function() {

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    // With that done, add the note information to the page
    .then(function(data) {
      $.getJSON("/articles", function(data) {
        populateData(data);
      });
    });
});

$(document).on("click", "#save-article", function() {
  // Grab the id associated with the article from the save button
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
  })
});

function populateData(data) {
  $("#articles").text("");
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div class='row'>" +
                          "<div class='card'>" +
                          "<div class='card-body'>" +
                          "<a href='" + data[i].link + "'><h2 data-id='" + data[i]._id + "'>" + data[i].title + "</h2></a>" +
                          "<button class='btn btn-primary' data-id='" + data[i]._id + "' id='save-article'>Save Article</button>" +
                          "</div>" +
                          "</div>" +
                          "</div>");
  }
}
