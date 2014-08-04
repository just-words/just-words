function addStory(){$("#error").hide("slow");$.ajax({url:"//www.fimfiction.net/api/story.php?story="+$("#addedstory").val(),type:"GET",crossDomain:true,dataType:"jsonp"}).done(function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b;if(e.error==="Invalid story id"){$("#error").html("<strong>ERROR:</strong> Could not load story. Check the Story ID and try again.");$("#error").show("slow");return}n=e.story.words;r=e.story.status;i=e.story.likes;s=e.story.dislikes;t=e.story.title;o=e.story.chapter_count;u=e.story.content_rating;a=e.story.categories.Romance;f=e.story.categories.Tragedy;l=e.story.categories.Sad;c=e.story.categories.Dark;h=e.story.categories.Comedy;p=e.story.categories.Random;d=e.story.categories.Crossover;v=e.story.categories.Adventure;m=e.story.categories["Slice of Life"];g=e.story.categories["Alternate Universe"];y=e.story.categories.Human;b=e.story.categories.Anthro;views=e.story.views;stories.push([t,n,r,i,s,o,u,[a,f,l,c,h,p,d,v,m,g,y,b],views]);$("#stories").html($("#stories").html()+t+'&nbsp;<a title="Remove Story" onclick="removeStory('+stories.length+')">&#10006;</a>, ')}).fail(function(){$("#error").show("slow")});$("#addedstory").val("")}function addFeatured(){}function removeStory(e){var t;stories.splice(e,1);$("#stories").html("");for(t=0;t<stories.length;t++){$("#stories").html($("#stories").html()+stories[t][0]+'&nbsp;<a title="Remove Story" onclick="removeStory('+t+')">&#10006;</a>, ')}}function clearStat(){$("#stories").html("");$("#error").hide("slow");$("#stats").hide("slow");while(stories.length>0){stories.pop()}}function toggleOptions(){if($(".options").css("display")==="none"){$(".options").show("slow");$(".toggleOptions").html("&#9650;")}else{$(".options").hide("slow");$(".toggleOptions").html("&#9660;")}}function getChartType(e){if($("#chartType").val()==="pie")return new google.visualization.PieChart(e);else if($("#chartType").val()==="bar")return new google.visualization.BarChart(e);else if($("#chartType").val()==="column")return new google.visualization.ColumnChart(e);else if($("#chartType").val()==="area")return new google.visualization.SteppedAreaChart(e)}function stat(){var e=0,t=0,n=0,r=0,i=0,s=0,o=0,u=0,a=[["Story","Words"]],f=[["Story","Views"]],l=0,c=0,h=0,p=0,d=0,v=0,m=0,g=0,y=0,b=0,w=0,E=0,S=0,x=0,T=0,N;if(stories.length<1){$("#error").html("<strong>ERROR:</strong> No stories to statisticify.");$("#error").show("slow");return}else if($("#wpm").val()<1){$("#error").html("<strong>ERROR:</strong> Please learn how to read before using just-words.");$("#error").show("slow");return}else if($("#wpm").val()>1500){$("#error").html("<strong>ERROR:</strong> Please learn how to tell at least somewhat realistic lies before using just-words.");$("#error").show("slow");return}$("#error").hide("slow");for(N=0;N<stories.length;N++){e=e+Number(stories[N][1]);s=s+Number(stories[N][3]);o=o+Number(stories[N][4]);u=u+Number(stories[N][5]);p=p+stories[N][7][0];d=d+stories[N][7][1];v=v+stories[N][7][2];m=m+stories[N][7][3];g=g+stories[N][7][4];y=y+stories[N][7][5];b=b+stories[N][7][6];w=w+stories[N][7][7];E=E+stories[N][7][8];S=S+stories[N][7][9];x=x+stories[N][7][10];T=T+stories[N][7][11];a.push([stories[N][0],Number(stories[N][1])]);f.push([stories[N][0],Number(stories[N][8])]);if(stories[N][2]==="Complete"){t=t+1}else if(stories[N][2]==="Incomplete"){n=n+1}else if(stories[N][2]==="On Hiatus"){r=r+1}else{i=i+1}if(stories[N][6]===0){l=l+1}else if(stories[N][6]===1){c=c+1}else{h=h+1}}$("#total_words").html(e);$("#total_chapters").html(u);if(e/275>5760){$("#word_time").html((e/$("#wpm").val()/60/60).toFixed(2)+" days")}else if(e/275>240){$("#word_time").html((e/$("#wpm").val()/60).toFixed(1)+" hours")}else{$("#word_time").html((e/$("#wpm").val()).toFixed(0)+" minutes")}$("#stats").show("slow");var C=google.visualization.arrayToDataTable([["Status","Number"],["Complete",t],["Incomplete",n],["On Hiatus",r],["Cancelled",i]]);var k={title:"Completness",legend:"none"};var L=getChartType($("#stats_completeness")[0]);var A=google.visualization.arrayToDataTable(a);var O={title:"Word Breakdown",legend:"none"};var M=getChartType($("#stats_words_individual")[0]);var _=google.visualization.arrayToDataTable([["Likes","Number"],["Likes",s],["Dislikes",o]]);var D={title:"Likes v Dislikes",legend:"none",slices:{0:{color:"#547F1D"},1:{color:"#952525"}}};var P=getChartType($("#stats_likes")[0]);var H=google.visualization.arrayToDataTable([["Rating","Number"],["Everyone",l],["Teen",c],["Mature",h]]);var B={title:"Ratings",legend:"none",slices:{0:{color:"#89C738"},1:{color:"#C78238"},2:{color:"#C73838"}}};var j=getChartType($("#stats_ratings")[0]);var F=google.visualization.arrayToDataTable([["Genre","Number"],["Romance",p],["Tragedy",d],["Sad",v],["Dark",m],["Comedy",g],["Random",y],["Crossover",b],["Adventure",w],["Slice of Life",E],["Alternate Universe",S],["Human",x],["Anthro",T]]);var I={title:"Genres",legend:"none",slices:{0:{color:"#773DB3"},1:{color:"#D95E87"},2:{color:"#E09D2B"},3:{color:"#982323"},4:{color:"#CAA600"},5:{color:"#3F74CE"},6:{color:"#45C950"},7:{color:"#3F49CF"},8:{color:"#47B8A0"},9:{color:"#888"},10:{color:"#B5835A"},11:{color:"#B5695A"}}};var q=getChartType($("#stats_genres")[0]);var R=google.visualization.arrayToDataTable(f);var U={title:"Popularity (by views)",legend:"none"};var z=getChartType($("#stats_popularity")[0]);L.draw(C,k);M.draw(A,O);P.draw(_,D);j.draw(H,B);q.draw(F,I);z.draw(R,U)}function loadSample(){stories.push(["Sample Story 1",66711,"Cancelled",1,24,10,2,[true,false,false,false,true,false,false,false,true,false,false,false],8]);stories.push(["Sample Story 2",2997,"Complete",12,1,1,0,[false,true,false,false,false,true,false,false,false,true,false,false],159]);stories.push(["Sample Story 3",271828,"Incomplete",3141,592,123,1,[false,false,true,false,false,false,true,false,false,false,true,false],2801]);stories.push(["Sample Story 4",0,"On Hiatus",0,5,0,0,[false,false,false,true,false,false,false,true,false,false,false,true],3145]);for(i=0;i<stories.length;i++){$("#stories").html($("#stories").html()+stories[i][0]+'&nbsp;<a title="Remove Story" onclick="removeStory('+i+')">&#10006;</a>, ')}stat()}var stories=[]
