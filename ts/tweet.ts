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
        
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        //filter out "Check it out!", TomTom MySports Watch, 
        //"Watch my" (live event walk, bike..)
        //those indicate auto generated tweets

        //if text contains any of these phrases, return false
        if (this.text.includes("Check it out!") ||
            this.text.includes("TomTom MySports Watch") ||
            this.text.includes("Watch my")) {return false;}
           
        return true;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        var tempText = "";
        tempText = this.text.replace("#Runkeeper", "");
        
        //filter out url with regular expression
        tempText = tempText.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        
        //starts with, split???
        //alternative backup: most text ends with the link and hashtag. find where https starts
        //and do substring to exclude out that part

        return tempText;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet

        //depends on call to writtenText and return human text
        var humanText = this.writtenText;

        if (humanText.includes("walk")) 
            return "walk";

        if (humanText.includes("run")) 
            return "run";

        if (humanText.includes("ski")) 
            return "ski";

        if (humanText.includes("bike")) 
            return "bike";

        if (humanText.includes("activity")) 
            return "activity";

        if (humanText.includes("swim")) 
            return "swim";

        if (humanText.includes("workout")) 
            return "workout";

        if (humanText.includes("mediation")) 
            return "mediation";

        if (humanText.includes("Freestyle") || humanText.includes("freestyle"))
            return "freestyle";


        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: parse the distance from the text of the tweet
        //use a regular expression, match any decimal number [..].XX 2 decimal places
        var distance = 0.00;

        if (this.text.includes("km"))
        {
            distance = this.text.search(/^\d+\.?\d*$/);
            //^ is start of line, $ is end of line
            // \d* matches 0 or more digits, \d matches 1 or more digits
            // \.? match the dot

            //convert to miles
            return distance / 1.609; // miles / 1.609
        }
        else if (this.text.includes("mi"))
        {
            distance = this.text.search(/^\d+\.?\d*$/);
            return distance;
        }

        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}