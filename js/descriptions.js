var writtenTweets = []; //global scope (it works), especially for event listener

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets

	//From before in the starter code
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});


	for (var i = 0; i < tweet_array.length; i++)
	{
		if (tweet_array[i].written)
			writtenTweets.push(tweet_array[i]);
	}

	//reference the input tag with id textFilter from HTML file. 
	//then call the listener using the userInput variable
	var userInput = document.getElementById('textFilter');

	//create listener with input as the parameter
	userInput.addEventListener('input', addEventHandlerForSearch);

}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	
	//helps remove the previous results at the bottom as search text changes
	document.getElementById('tweetTable').innerText = "<tr></tr>";

	var search_text = "";
	var search_count = 0;
	//var results = [];

	//get the search text using document id getter then .value
	search_text = document.getElementById('textFilter').value.toLowerCase();

	if (search_text != "")
	{
		for (var i = 0; i < writtenTweets.length; i++)
		{
			//add onto the results with += if query does include text of any of the written tweets
			//lowercase the text and check with lowercase search text
			//use the inner HTML method to actually add table row instead of raw text
			if (writtenTweets[i].text.toLowerCase().includes(search_text))
			{
				document.getElementById('tweetTable').innerHTML += writtenTweets[i].getHTMLTableRow(search_count + 1);
				search_count++;
				//results.push(writtenTweets[i]);
			}
				
		}
		
	}
	else
	{
		//innerText should overwrite
		document.getElementById('tweetTable').innerText = "<tr></tr>";
	}

	document.getElementById('searchCount').innerText = search_count;
	document.getElementById('searchText').innerText = search_text;
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});