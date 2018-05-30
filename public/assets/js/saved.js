$.getJSON("/saved", function(data) {
  savedData(data);
});

$(document).on("click", "#del-article", function() {
  // Grab the id associated with the article from the remove button
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/saved/" + thisId,
  })
  .then(function() {
    $.getJSON("/saved", function(data) {
      $("#articles").text("");
      savedData(data);
    });
  });
});

$(document).on("click", "#add-note", function() {
  // Grab the id associated with the article from the remove button
  var thisId = $(this).attr("data-id");
  $(".modal-footer").text("");
  $(".modal-footer").append("<button type='button' class='btn btn-primary' data-id='" + thisId + "' id='save-note'>Save Note</button>");
  $(".modal-footer").append("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>");

  $.ajax({
    method: "GET",
    url: "/notes/" + thisId,
  })
  .then(function(note) {
      console.log(note);
      addNotes(note);
    })
  .then(function(){
    $('#noteModal').modal('show');
  })
});

$(document).on("click", "#save-note", function() {
  // Grab the id associated with the article from the remove button
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/note/" + thisId,
    data: {
      // Value taken from title input
      title: $("#noteTitle").val(),
      // Value taken from note textarea
      body: $("#noteTextarea").val()
    }
  })
  .then(function(newNote) {
      addNotes(newNote);
      $("#noteTitle").val("");
      $("#noteTextarea").val("");
      $('#noteModal').modal('hide');
    });
});

$(document).on("click", "#del-note", function() {
  // Grab the id associated with the article from the remove button
  var thisId = $(this).attr("data-id");
  
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId,
  })
  .then(function(delNote) {
    $('#noteModal').modal('hide');
    })
});

function savedData(data) {
  for (var i = 0; i < data.length; i++) {

    $("#articles").append("<div class='row'>" +
            "<div class='card'>" +
            "<div class='card-body'>" +
            "<a href='" + data[i].link + "'><h2 data-id='" + data[i]._id + "'>" + data[i].title + "</h2></a>" +
            "<button class='btn btn-danger' data-id='" + data[i]._id + "' id='del-article'>Remove from Saved</button>" +
            "<button class='btn btn-primary' data-id='" + data[i]._id + "' id='add-note'>Notes</button>" +
            "</div>" +
            "</div>" +
            "</div>")
  }
}

function addNotes(note) {
  $("#notes").text("");
  for (var i = 0; i < note.length; i++) {
    for (var x = 0; x < note[i].note.length; x++ ) {
      if (note[i].note[x].title > "") {

    $("#notes").append("<div class='row'>" +
                      "<div class='card'>" +
                      "<div class='card-body'>" +
                      "<h6>Title: " + note[i].note[x].title + "</h6>" +
                      "<p>Note: " + note[i].note[x].body + "</p>" +
                      "<button class='btn btn-primary' data-id='" + note[i].note[x]._id + "' id='del-note'>Delete Note</button>" +
                      "</div>" +
                      "</div>" +
                      "</div>");
      }
    }
  }
}