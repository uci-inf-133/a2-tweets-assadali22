--Readme document for *YOUR NAME*, *YOUR_EMAIL@uci.edu*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

*/10
- */3 Summarizing tweets
- */4 Identifying the most popular activities
- */3 Adding a text search interface

2. How long, in hours, did it take you to complete this assignment?
Started 10-24-2025 at 9:30pm. 9:30pm-11:15pm
10-25-2025 10:15pm-11:20pm
10-28-2025 12:45pm-1:30pm during office hour
10-30-2025 9:35pm-11:15pm
10-31-2025 12:30pm-3:15pm, 9:30pm-11:15pm
11-1-2025 6-7:45pm, 9-10:50pm
11-2-2025 10:25pm-11:45pm
11-3-2025 10am-12:10pm, 1pm-4pm

commit message for 11-2-2025 11:50pm:
Fixed typo in tweet class on activityType for returning meditation. 
Wrote code for getHTMLTableRow (WORKS); now returns the tweet text with the URL
being clickable using match() and replace() string method. Just not sure how to
format the text/table nicely similar to the sample run in assignment description.
Wrote search event handler in descriptions JS (FINALLY WORKING).
Attempted to make a vega bar chart on frequency of activities (NOT WORKING).

commit for 11-3-2025 12:15pm
Updated activityType to just return activity, doesn't matter if it was written by 
human or automated. Do this.text.includes(...). Rearranged order of if statements 
as well as some tweets may contain an actual activity with the word "activity"; 
put the check for "activity" at the very bottom. Vega lite bar graph FINALLY RENDERS
for counting number of tweets having each type of activity; had to initialize all counters to 0. 
Sorted activity array of objects is also ready. Added yoga as an activity.

3. What online resources did you consult when completing this assignment? (list sites like StackOverflow or specific URLs for tutorials; describe queries to Generative AI or use of AI-based code completion)
W3Schools on string manipulation in JavaScript/Typescript for includes function, replace function

Developer Mozilla MDN
 -getting elements by class name syntax (https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
 -regular expression quantifier syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers)
 -sorting an array of objects (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#examples)

Stack overflow: regular expression syntax for matching decimals (https://stackoverflow.com/questions/12117024/decimal-number-regular-expression-where-digit-after-decimal-is-optional)
clickable URL links: https://stackoverflow.com/questions/2536004/making-links-clickable-in-javascript

Vega-Lite
-Specifiy custom sort order x-axis (for day of week in my case) https://vega.github.io/vega-lite/docs/sort.html
-Colored scatterplot with legend and shapes https://vega.github.io/vega-lite/examples/point_color_with_shape.html

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

5. Is there anything special we need to know in order to run your code?

