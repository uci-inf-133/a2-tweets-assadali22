function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//the rest of this function should edit just index html file

	//find earliest and latest date (which can cross months or years)
	//comparasions done here
	var earliestDate = tweet_array[0].time;
	var latestDate = tweet_array[0].time;

	for (var i = 1; i < tweet_array.length; i++)
	{
		//earliest date checks
		//November 5th 2024 vs December 4th 2024 vs December 31st 2024 vs January 2nd 2025

		//if year is less, that date is earliest
		if (tweet_array[i].time.getFullYear() < earliestDate.getFullYear())
			earliestDate = tweet_array[i].time;

		//if month is less, that date is earliest
		if (tweet_array[i].time.getMonth() < earliestDate.getMonth())
			earliestDate = tweet_array[i].time;

		//if day is less, that date is earliest
		if (tweet_array[i].time.getDay() < earliestDate.getDay())
			earliestDate = tweet_array[i].time;
		

		//latest date checks
		if (tweet_array[i].time.getFullYear() > latestDate.getFullYear())
			latestDate = tweet_array[i].time;

		if (tweet_array[i].time.getMonth() > latestDate.getMonth())
			latestDate = tweet_array[i].time;

		if (tweet_array[i].time.getDay() > latestDate.getDay())
			latestDate = tweet_array[i].time;
	}
	//not hitting sept 30 as latest for some reason...

	//spans to update: completedEvents, liveEvents, achievements, miscellaneous
    //and their corresponding percentages
	var completedActivities = 0;	
	var liveActivites = 0;
	var achievementActivities = 0;
	var miscActivities = 0;
	var writtenCompleted = 0;

	for (var j = 0; j < tweet_array.length; j++)
	{
		if (tweet_array[j].source == "completed_event")
		{
			if (tweet_array[j].written)
				writtenCompleted++;

			completedActivities++;
		}
		else if (tweet_array[j].source == "live_event")
		{
			liveActivites++;
		}
		else if (tweet_array[j].source == "achievement")
		{
			achievementActivities++;
		}
		else
		{
			miscActivities++;
		}

	}

	console.log(completedActivities);
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	//this puts the number of tweets in line 47 of index html file

	document.getElementById('firstDate').innerText = earliestDate;
	document.getElementById('lastDate').innerText = latestDate;

	//none of the below updates even work, text is still ??? somehow

	//rest of these elements are CLASS NAMES, use getElementsByClassName
	//very different method name, with elements (not element) and className
	document.getElementsByClassName('completedEvents').innerText = completedActivities;
	document.getElementsByClassName('liveEvents').innerText = liveActivites;
	document.getElementsByClassName('achievements').innerText = achievementActivities;
	document.getElementsByClassName('miscellaneous').innerText = miscActivities;
	document.getElementsByClassName('written').innerText = writtenCompleted;

	//Percentages
	document.getElementsByClassName('completedEventsPct').innerText = math.format(completedActivities / tweet_array.length, 2);
	document.getElementsByClassName('liveEventsPct').innerText = math.format(liveActivites / tweet_array.length, 2);
	document.getElementsByClassName('achievementsPct').innerText = math.format(achievementActivities / tweet_array.length, 2);
	document.getElementsByClassName('miscellaneousPct').innerText = math.format(miscActivities / tweet_array.length, 2);
	document.getElementsByClassName('writtenPct').innerText = math.format(writtenCompleted / completedActivities, 2);

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});