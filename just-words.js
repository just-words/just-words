/*Copyright 2014 just-words. This Source Code Form is subject to the terms of the Mozilla Public License, v.2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/*/
var stories = [];
function addStory() {
 $("#error").hide("slow");
 $.ajax({
  url: "//www.fimfiction.net/api/story.php?story=" + $("#addedstory").val(),
  type: "GET",
  crossDomain: true,
  dataType: "jsonp"
 })
  .done(function (data) {
   var name, words, status, likes, dislikes, chapters, rating, g_romance, 
       g_tragedy, g_sad, g_dark, g_comedy, g_random, g_crossover, g_adventure,
       g_slice, g_alternate, g_human, g_anthro;
   if(data.error === "Invalid story id") {
    $("#error").html("<strong>ERROR:</strong> Could not load story. Check the Story ID and try again.")
    $("#error").show("slow");
    return;
   }
   words = data.story.words;
   status = data.story.status;
   likes = data.story.likes;
   dislikes = data.story.dislikes;
   name = data.story.title;
   chapters = data.story.chapter_count;
   rating = data.story.content_rating;
   g_romance = data.story.categories.Romance;
   g_tragedy = data.story.categories.Tragedy;
   g_sad = data.story.categories.Sad;
   g_dark = data.story.categories.Dark;
   g_comedy = data.story.categories.Comedy;
   g_random = data.story.categories.Random;
   g_crossover = data.story.categories.Crossover;
   g_adventure = data.story.categories.Adventure;
   g_slice = data.story.categories['Slice of Life'];
   g_alternate = data.story.categories['Alternate Universe'];
   g_human = data.story.categories.Human;
   g_anthro = data.story.categories.Anthro;
   views = data.story.views;
   stories.push([name, words, status, likes, dislikes, chapters, rating, 
                [g_romance, g_tragedy, g_sad, g_dark, g_comedy, g_random, 
                 g_crossover, g_adventure, g_slice, g_alternate, g_human,
                 g_anthro], views]);
   $("#stories").html($("#stories").html() + name + 
    "&nbsp;<a title=\"Remove Story\" onclick=\"removeStory("
    + stories.length + ")\">&#10006;</a>, ");
  })
  .fail(function () { $("#error").show("slow"); });
 $("#addedstory").val("");
}
function addFeatured() {
 
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
function toggleOptions() {
 if($('.options').css("display") === "none") {
  $('.options').show('slow');
  $('.toggleOptions').html("&#9650;");
 } else {
  $('.options').hide('slow');
  $('.toggleOptions').html("&#9660;");
 }
}
function getChartType(location) {
 if($('#chartType').val() === 'pie')
  return new google.visualization.PieChart(location);
 else if($('#chartType').val() === 'bar')
  return new google.visualization.BarChart(location);
 else if($('#chartType').val() === 'column')
  return new google.visualization.ColumnChart(location);
 else if($('#chartType').val() === 'area')
  return new google.visualization.SteppedAreaChart(location);
}
function stat() {
 var words = 0, complete = 0, incomplete = 0, hiatus = 0, cancelled = 0, likes = 0, dislikes = 0, chapters = 0,
     storieslen = [['Story', 'Words']], viewslen = [['Story', 'Views']], everyone = 0, teen = 0, mature = 0, g_romance = 0, 
       g_tragedy = 0, g_sad = 0, g_dark = 0, g_comedy = 0, g_random = 0, g_crossover = 0,
       g_adventure = 0, g_slice = 0, g_alternate = 0, g_human = 0, g_anthro = 0, i;
 if(stories.length < 1) {
  $("#error").html("<strong>ERROR:</strong> No stories to statisticify.")
  $("#error").show("slow");
  return;
 } else if($("#wpm").val() < 1) {
  $("#error").html("<strong>ERROR:</strong> Please learn how to read before using just-words.")
  $("#error").show("slow");
  return;
 } else if($("#wpm").val() > 1500) {
  $("#error").html("<strong>ERROR:</strong> Please learn how to tell at least somewhat realistic lies before using just-words.")
  $("#error").show("slow");
  return;
 }
 $("#error").hide("slow");
 for (i = 0; i < stories.length; i++) {
  words = words + Number(stories[i][1]);
  likes = likes + Number(stories[i][3]);
  dislikes = dislikes + Number(stories[i][4]);
  chapters = chapters + Number(stories[i][5]);
  g_romance = g_romance + stories[i][7][0];
  g_tragedy = g_tragedy + stories[i][7][1];
  g_sad = g_sad + stories[i][7][2];
  g_dark = g_dark + stories[i][7][3];
  g_comedy = g_comedy + stories[i][7][4];
  g_random = g_random + stories[i][7][5];
  g_crossover = g_crossover + stories[i][7][6];
  g_adventure = g_adventure + stories[i][7][7];
  g_slice = g_slice + stories[i][7][8];
  g_alternate = g_alternate + stories[i][7][9];
  g_human = g_human + stories[i][7][10];
  g_anthro = g_anthro + stories[i][7][11];
  storieslen.push([stories[i][0],Number(stories[i][1])]);
  viewslen.push([stories[i][0],Number(stories[i][8])]);
  if (stories[i][2] === "Complete") { complete = complete + 1;
   } else if (stories[i][2] === "Incomplete") { incomplete = incomplete + 1;
   } else if (stories[i][2] === "On Hiatus") { hiatus = hiatus + 1;
   } else { cancelled = cancelled + 1; }
  if (stories[i][6] === 0) { everyone = everyone + 1;
   } else if (stories[i][6] === 1) { teen = teen + 1;
   } else { mature = mature + 1; }
 }
 $("#total_words").html(words);
 $("#total_chapters").html(chapters);
 if (words / 275 > 5760) {
  $("#word_time").html((words / $("#wpm").val() / 60 / 60).toFixed(2) + " days");
 } else if (words / 275 > 240) {
  $("#word_time").html((words / $("#wpm").val() / 60).toFixed(1) + " hours");
 } else { $("#word_time").html((words / $("#wpm").val()).toFixed(0) + " minutes"); }
 $("#stats").show("slow");
 var completness = google.visualization.arrayToDataTable([
  ['Status', 'Number'],
  ['Complete', complete],
  ['Incomplete', incomplete],
  ['On Hiatus', hiatus],
  ['Cancelled', cancelled]
 ]);
 var completnessOptions = {
  title: 'Completness',
  legend: 'none'
 };
 var completnesschart = getChartType($('#stats_completeness')[0]);
 var wordsearch = google.visualization.arrayToDataTable(storieslen);
 var wordsearchOptions = {
  title: 'Word Breakdown',
  legend: 'none'
 };
 var wordsearchchart = getChartType($('#stats_words_individual')[0]);
 var likesVdislikes = google.visualization.arrayToDataTable([
  ['Likes', 'Number'],
  ['Likes', likes],
  ['Dislikes', dislikes]
 ]);
 var likesVdislikesOptions = {
  title: 'Likes v Dislikes',
  legend: 'none',
  slices: {
   0: { color: '#547F1D' },
   1: { color: '#952525' }
  }
 };
 var likesVdislikeschart = getChartType($('#stats_likes')[0]);
 var ratings = google.visualization.arrayToDataTable([
  ['Rating', 'Number'],
  ['Everyone', everyone],
  ['Teen', teen],
  ['Mature', mature]
 ]);
 var ratingsOptions = {
  title: 'Ratings',
  legend: 'none',
  slices: {
   0: { color: '#89C738' },
   1: { color: '#C78238' },
   2: { color: '#C73838' }
  }
 };
 var ratingschart = getChartType($('#stats_ratings')[0]);
 var genre = google.visualization.arrayToDataTable([
  ['Genre', 'Number'],
  ['Romance', g_romance],
  ['Tragedy', g_tragedy],
  ['Sad', g_sad],
  ['Dark', g_dark],
  ['Comedy', g_comedy],
  ['Random', g_random], 
  ['Crossover', g_crossover],
  ['Adventure', g_adventure],
  ['Slice of Life', g_slice],
  ['Alternate Universe', g_alternate],
  ['Human', g_human],
  ['Anthro', g_anthro]
 ]);
 var genreOptions = {
  title: 'Genres',
  legend: 'none',
  slices: {
   0: { color: '#773DB3' },
   1: { color: '#D95E87' },
   2: { color: '#E09D2B' },
   3: { color: '#982323' },
   4: { color: '#CAA600' },
   5: { color: '#3F74CE' },
   6: { color: '#45C950' },
   7: { color: '#3F49CF' },
   8: { color: '#47B8A0' },
   9: { color: '#888' },
   10: { color: '#B5835A' },
   11: { color: '#B5695A' }
  }
 };
 var genrechart = getChartType($('#stats_genres')[0]);
 var view = google.visualization.arrayToDataTable(viewslen);
 var viewOptions = {
  title: 'Popularity (by views)',
  legend: 'none'
 };
 var viewchart = getChartType($('#stats_popularity')[0]);
 completnesschart.draw(completness, completnessOptions);
 wordsearchchart.draw(wordsearch, wordsearchOptions);
 likesVdislikeschart.draw(likesVdislikes, likesVdislikesOptions);
 ratingschart.draw(ratings, ratingsOptions);
 genrechart.draw(genre, genreOptions);
 viewchart.draw(view, viewOptions);
}
function loadSample() {
 stories.push(["Sample Story 1", 66711, "Cancelled", 1, 24, 10, 2, [true, false, false, false, true, false, false, false, true, false, false, false], 8]);
 stories.push(["Sample Story 2", 2997, "Complete", 12, 1, 1, 0, [false, true, false, false, false, true, false, false, false, true, false, false], 159]);
 stories.push(["Sample Story 3", 271828, "Incomplete", 3141, 592, 123, 1, [false, false, true, false, false, false, true, false, false, false, true, false], 2801]);
 stories.push(["Sample Story 4", 0, "On Hiatus", 0, 5, 0, 0, [false, false, false, true, false, false, false, true, false, false, false, true], 3145]);
 for (i = 0; i < stories.length; i++) {
  $("#stories").html($("#stories").html() + stories[i][0] + 
   "&nbsp;<a title=\"Remove Story\" onclick=\"removeStory(" + i +
   ")\">&#10006;</a>, ");
 }
 stat();
}
