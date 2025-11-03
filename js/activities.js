function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	//var namesOfActivities = ["walk", "run", "ski", "bike", "activity", "swim", "workout", "meditation", "freestyle"]
	var activities = []; //data
	//var distances = []; //parallel array to get data?
	//distances.push(tweet_array[i].distance);

	//frequencies
	var walk, run, ski, bike, activity, swim, workout, meditation, freestyle = 0;
	
	for (var i = 0; i < tweet_array.length; i++)
	{
		switch (tweet_array[i].activityType)
		{
			case "walk": {walk++; break;} 
			case "run": {run++; break;}
			case "ski": {ski++; break;}

			case "bike": {bike++; break;}
			case "activity": {activity++; break;}
			case "swim": {swim++; break;}

			case "workout": {workout++; break;}
			case "meditation": {meditation++; break;}
			case "freestyle": {freestyle++; break;}
			default: {break;}
		}
	}

	activities.push({"activity" : "walk", "freq" : walk});
	activities.push({"activity" : "run", "freq" : run});
	activities.push({"activity" : "ski", "freq" : ski});
	activities.push({"activity" : "bike", "freq" : bike});
	activities.push({"activity" : "activity", "freq" : activity});
	activities.push({"activity" : "swim", "freq" : swim});
	activities.push({"activity" : "workout", "freq" : workout});
	activities.push({"activity" : "meditation", "freq" : meditation});
	activities.push({"activity" : "freestyle", "freq" : freestyle});
	

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activities
	  },
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding":
	  {
		x:
		{
			"field": "activity",
			"type": "nominal",
			"axis": {"labelAngle": 0}
		},

		y:
		{
			"field": "freq",
			"type": "quantitative"
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});