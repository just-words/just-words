/*(DELETE THESE FOUR WORDS) Copyright 2014 just-words. This Source Code Form is subject to the terms of the Mozilla Public License, v.2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/*/
var stories = [];
function getUserInfo() {
 alert("Not Implemented! (Sorry)");
 return "get on it knighty";
}
function addStory() {
 $("#error").hide("slow");
 $.ajax({
  url: "https://www.fimfiction.net/api/story.php?story=" + $("#addedstory").val(),
  type: "GET",
  crossDomain: true,
  dataType: "jsonp"
 })
  .done(function (data) {
   var name, words, status, likes, dislikes;
   if(data.error === "Invalid story id") {
    $("#error").show("slow");
    return;
   }
   words = data.story.words;
   status = data.story.status;
   likes = data.story.likes;
   dislikes = data.story.dislikes;
   name = data.story.title;
   stories.push([name, words, status, likes, dislikes]);
   $("#stories").html($("#stories").html() + name + 
    "&nbsp;<a title=\"Remove Story\" onclick=\"removeStory("
    + stories.length + ")\">&#10006;</a>, ");
  })
  .fail(function () { $("#error").show("slow"); });
 $("#addedstory").val("");
}
function removeStory(id) {
 var i;
 stories.splice(id, 1);
 $("#stories").html("");
 for (i = 0; i < stories.length; i++) {
  $("#stories").html($("#stories").html() + stories[i][0] + 
   "&nbsp;<a title=\"Remove Story\" onclick=\"removeStory(" + i +
   ")\">&#10006;</a>, ");
 }
}
function clearStat() {
 $("#stories").html("");
 $("#error").hide('slow');
 $("#stats").hide('slow');
 while (stories.length > 0) { stories.pop(); }
}
function stat() {
 var words = 0, complete = 0, incomplete = 0, likes = 0, dislikes = 0, i;
 for (i = 0; i < stories.length; i++) {
  words = words + Number(stories[i][1]);
  likes = likes + Number(stories[i][3]);
  dislikes = dislikes + Number(stories[i][4]);
  if (stories[i][2] === "Complete") { complete = complete + 1;
   } else if (stories[i][2] === "Incomplete") { incomplete = incomplete + 1; }
 }
 $("#total_words").html(words);
 if (words / 275 > 5760) {
  $("#word_time").html((words / $("#wpm").val() / 60 / 60).toFixed(2) + " days");
 } else if (words / 275 > 240) {
  $("#word_time").html((words / $("#wpm").val() / 60).toFixed(1) + " hours");
 } else { $("#word_time").html((words / $("#wpm").val()).toFixed(0) + " minutes"); }
 $("#completness").html(complete);
 $("#incompletness").html(incomplete);
 $("#likes").html(likes);
 $("#dislikes").html(dislikes);
 $("#stats").show("slow");
}
