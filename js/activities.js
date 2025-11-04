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
	//and to update the span text
	activities.sort((a, b) => b.freq - a.freq);
	console.log(activities);

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A bar graph of the number of Tweets containing each type of activity.",
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

	//use array for day of week with getDay(). 0 = sunday, 6 = saturday
	const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

	//push top three activities from the sorted array
	var dataForDistance = []; //data for vega lite
	var topThreeActivities = []; //strings with the top 3 activities

	var dataForTopThree = []; //store the top three activities from the activities array from above
	dataForTopThree.push(activities[0]);
	dataForTopThree.push(activities[1]);
	dataForTopThree.push(activities[2]);

	//get the string for the actual activity from the top 3 using map function
	topThreeActivities = dataForTopThree.map(obj => obj.activity);
	console.log(dataForTopThree);
	console.log(topThreeActivities);
	
	//parse data. {"activity" : a, "day": d, "distance" : dist}
	for (var i = 0; i < tweet_array.length; i++)
	{
		if (tweet_array[i].activityType == topThreeActivities[0])
		{
			dataForDistance.push(new Object({"activity": topThreeActivities[0], "day": dayOfWeek[tweet_array[i].time.getDay()], "distance": math.format(tweet_array[i].distance, 2)}))
		}
		else if (tweet_array[i].activityType == topThreeActivities[1])
		{
			dataForDistance.push(new Object({"activity": topThreeActivities[1], "day": dayOfWeek[tweet_array[i].time.getDay()], "distance": math.format(tweet_array[i].distance, 2)}))
		}
		else if (tweet_array[i].activityType == topThreeActivities[2])
		{
			dataForDistance.push(new Object({"activity": topThreeActivities[2], "day": dayOfWeek[tweet_array[i].time.getDay()], "distance": math.format(tweet_array[i].distance, 2)}))
		}
	}

	console.log(dataForDistance);
	
	distancesTopThreeActivities = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A scatterplot of the distances for each day of the week for the top 3 activities.",
	  "data": {
	    "values": dataForDistance
	  },
	  "mark": "point",
	  "encoding":
	  {
		"x":
		{
			"field": "day",
			"type": "nominal",
			"sort": ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		},
		"y":
		{
			"field": "distance",
			"type": "quantitative"
		},

		"color": {"field": "activity", "type": "nominal"},
    	"shape": {"field": "activity", "type": "nominal"}
		
	  }
	}
	//distanceVis ID in activities html file
	vegaEmbed('#distanceVis', distancesTopThreeActivities, {actions:false});
	
	//Aggregate distances scatterplot
	aggregateDistances =
	{
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A scatterplot of the aggregate distances for each day of the week for the top 3 activities, aggregating by mean",
	  "data": {
	    "values": dataForDistance
	  },

	  "mark": "point",
	  "encoding":
	  {
		"x":
		{
			"field": "day",
			"type": "nominal",
			"sort": ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		},
		"y":
		{
			"field": "distance",
			"type": "quantitative",
			"aggregate": "mean"
		},

		"color": {"field": "activity", "type": "nominal"},
    	"shape": {"field": "activity", "type": "nominal"}

	  }

	}
	vegaEmbed('#distanceVisAggregated', aggregateDistances, {actions:false});

	//Update spans for number of activities description
	//use topThreeActivities array of strings
	document.getElementById('numberActivities').innerText = activities.length;
	document.getElementById('firstMost').innerText = topThreeActivities[0];
	document.getElementById('secondMost').innerText = topThreeActivities[1];
	document.getElementById('thirdMost').innerText = topThreeActivities[2];

	//Hardcoded spans for distances
	document.getElementById('longestActivityType').innerText = "bike";
	document.getElementById('shortestActivityType').innerText = "walk";
	document.getElementById('weekdayOrWeekendLonger').innerText = "weekends";


}


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});