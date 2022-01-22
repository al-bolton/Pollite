# Pollite

Pollite is a website designed to make life easier for the organisers of the world. It provides an easy way of creating a poll to set out the date and place for an event, with a unique link code which can be provided to other users for them to vote on their date/venue choices.

Once the poll has been voted on, the results are given to users, telling them exactly where they're going, on what date, and how many people can attend.

Pollite makes use of NextJS for both the Front and Back end. The Front end has been created using Chakra UI components, and data for the polls and responses is stored on a MongoDB database, accessed through Mongoose. The app also makes use of interaction with the Google Maps and Google Places platform, as well as grabbing relevant venue information from the RapidAPI Travel Advisor API.

A walkthrough video for the product can be found at https://youtu.be/g7kXuq2Uveg

Planned upcoming changes to the codebase include:
- Chakra theme usage, to replace current individual styling on elements
- Implementation of user input validation
- User authentication to track polls created
- Smarter results set, with responses requiring a name to be added, and votes on venues only accounted for those able to make the optimal date
