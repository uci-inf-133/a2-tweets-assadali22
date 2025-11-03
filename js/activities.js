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
	var activities = []; //data
	//var distances = []; //parallel array to get data?
	//distances.push(tweet_array[i].distance);

	//frequencies (must be all initialized to 0, thought i could put them all in 1 line and have = 0 at the end)
	//now the graph renders
	var walk = 0, run = 0, ski = 0, bike = 0, activity = 0; 
	var swim = 0, workout = 0, meditation = 0, freestyle = 0, yoga = 0;
	
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
			case "yoga": {yoga++; break;}
			default: {break;}
		}
	}

	//push new Object
	activities.push(new Object({"activity" : "walk", "freq" : walk}));
	activities.push(new Object({"activity" : "run", "freq" : run}));
	activities.push(new Object({"activity" : "ski", "freq" : ski}));
	activities.push(new Object({"activity" : "bike", "freq" : bike}));
	activities.push(new Object({"activity" : "activity", "freq" : activity}));
	activities.push(new Object({"activity" : "swim", "freq" : swim}));
	activities.push(new Object({"activity" : "workout", "freq" : workout}));
	activities.push(new Object({"activity" : "meditation", "freq" : meditation}));
	activities.push(new Object({"activity" : "freestyle", "freq" : freestyle}));
	activities.push(new Object({"activity" : "yoga", "freq" : yoga}));
	
	//sort the activity array of data in descending order by doing b.freq - a.freq
	//can grab activities[0], activities[1], and activities[2] to make the other plots
	activities.sort((a, b) => b.freq - a.freq);
	console.log(activities);

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
		"x":
		{
			"field": "activity", //reference activity, the key
			"type": "nominal",
			//"axis": {"labelAngle": 0, "labelSeparation": 400}
		},

		"y":
		{
			"field": "freq",
			"type": "quantitative"
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//no freestyle activities found due to not being a written tweet
	//had to update activityType to check raw text, it does not matter
	//if the text was written by a human or automated, get activity only

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});