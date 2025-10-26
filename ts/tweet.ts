class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        
        //lowercase the text then check for key phrases with .includes()
        if ((this.text.toLowerCase()).includes("completed") || 
            (this.text.toLowerCase()).includes("just posted")) {return "completed_event";}

        if ((this.text.toLowerCase()).includes("watch my") || 
            (this.text.toLowerCase()).includes("#rklive")) {return "live_event";}

        if ((this.text.toLowerCase()).includes("achieved")) {return "achievement";}

        return "miscellaneous";
        //spans to update: completedEvents, liveEvents, achievements, misc, miscellaneous
        //and their corresponding percentages...
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        //filter out "Check it out!", those indicate auto generated tweets

        if (!this.text.includes("Check it out!"))
            return true;

        if (!this.text.includes("TomTom MySports Watch")) //key phrase that indicates automated text
            return true;

        if (!this.text.includes("Watch my")) //filter out live events and automated text "Watch my [bike/run/walk/etc]"
            return true;

        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        var tempText = "";
        tempText = this.text.replace("#Runkeeper", "");
        //filter out url?
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet

        //depends on call to writtenText and return human text

        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}