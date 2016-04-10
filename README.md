
   **Disclaimer:** Submitted to Dublin City University, School of Computing for module CA675: Cloud      
   Technologies, 2016. We hereby certify that the work presented and the material contained          
   herein is our own except where explicitly stated references to other material are made.           

   Author | StudentId | Email
   ---|---|---
   John Segrave | 14212108 | john.segravedaly2@mail.dcu.ie 
   Paul O'Hara | 14212372 | paul.ohara6@mail.dcu.ie 
   Claire Breslin | 14210826 | claire.breslin4@mail.dcu.ie

# Introduction : Reader Insights with Wikipedia
## The Idea
You're a news agency or a freelance writer. You already know what the big news story of the day is - e.g. David Bowie passing away. There are so many angles you could potentially write about, but which one to pick? Ideally, you would peek inside the mind of (a lot of) your audience and find out "What angle about this do they find interesting right now? What do they want to know more about?"

Clickstream data can give insights into this. When people want to know more about something, they look it up (e.g. on Wikipedia). Then they click on other pages telling them more about the angle they find most useful or interesting.

What if we could make all those clicks visible? It would give content writers a window into the minds of readers - show the flow of their interests, their ‘stream of consciousness’ e.g. recently, when the news broke that David Bowie passed away, what could Wikipedia clickstream data tell us about the topics that people were finding interesting relating to David Bowie? What other pages were they reading that led them there and what pages on the David Bowie page did they find interesting enough to click on next?

# Application Setup and Dependencies
This application is a python flask server connecting to a mysql database, providing an interactive web browser front end to explore the results of the map reduced click stream data.  To enable the lanuching of the appliation, the following modules need to be installed.
- ConfigParser
- pymsql
- pandas
- flask
- flask_socketio

## Front End Third Parties
The UI frameworks made use of by this application are
- SocketIO (http://socket.io/)
- OpenUI5 (http://openui5.org/)
- jQuery (https://jquery.com/)
- d3js (http://d3js.org/d3.v3.js)

Third party code repurposed for use of by this application, and part of this repository, is stored within the third party folder,
static\thirdparty
- Sankey.js

## Database Setup
The application requires a connection to a mysql database.  Connection details for the database are stored in the file, dbconfig.cfg, located within the Database directory.  Sample values are provided within the configuration file.   To create the required tables by the application a schema is provided. The file, schema.sql, exists with the schema folder of this repository.

### Loading the data into the 

# Installation
Once


