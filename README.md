
**Disclaimer:** Submitted to Dublin City University, School of Computing for module CA675: Cloud      
   Technologies, 2016. We hereby certify that the work presented and the material contained          
   herein is our own except where explicitly stated references to other material are made.           

   Author | StudentId | Email
   ---|---|---
   John Segrave | 14212108 | john.segravedaly2@mail.dcu.ie 
   Paul O'Hara | 14212372 | paul.ohara6@mail.dcu.ie 
   Claire Breslin | 14210826 | claire.breslin4@mail.dcu.ie

# Introduction: Reader Insights with Wikipedia
## The Idea
You're a news agency or a freelance writer. You already know what the big news story of the day is - e.g. David Bowie passing away. There are so many angles you could potentially write about, but which one to pick? Ideally, you would peek inside the mind of (a lot of) your audience and find out "What angle about this do they find interesting right now? What do they want to know more about?"

Clickstream data can give insights into this. When people want to know more about something, they look it up (e.g. on Wikipedia). Then they click on other pages telling them more about the angle they find most useful or interesting.

What if we could make all those clicks visible? It would give content writers a window into the minds of readers - show the flow of their interests, their ‘stream of consciousness’ e.g. recently, when the news broke that David Bowie passed away, what could Wikipedia clickstream data tell us about the topics that people were finding interesting relating to David Bowie? What other pages were they reading that led them there and what pages on the David Bowie page did they find interesting enough to click on next?

# Click Stream Data Processing Workflow
The below describes the workflow of our idea.  From it you can see the click stream data is consumed by the Click Stream Spark Engine.  The Spark Engine processes the click stream data producing the map reduced results in the format required by the application.  For both the February and March click stream data over 1.4 million resulting rows are produced.  The click stream results are picked up by the Click Stream Data Loader, chunked over and loaded into the database.  Finally the user can access and search the click stream results though the application.

![workflow from map reduce to application](https://cloud.githubusercontent.com/assets/6463140/14412634/aeecb910-ff5e-11e5-881a-1d52e8af3122.png)

# Application Setup and Dependencies
This application is a python flask server connecting to a mySQL database.  The application provides an interactive web browser front end to explore the results of the map reduced click stream data.  To enable the launching of the application, the following modules need to be installed.
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
The application requires a connection to a mySQL database.  Connection details for the database are stored in the file, dbconfig.cfg, located within the Database directory.  Sample values are provided within the configuration file.   
### Creating the Required Tables
To create the required tables by the application a schema is provided. The file, schema.sql, exists with the schema folder of this repository.
### Loading the data into the Database 
Before loading the data into the database,  the property max_allowed_packet, needs to be updated within mySQL, increasing to a value such as 1004193792.  This is due to some rows of data to be inserting containing 6mb+ of data, the default maximum allowed by mySQL is 4mb.  Once the property is updated, the following steps outlined can be followed.

The data to be loaded is referenced through a property, url, contained in the configuration file, dbdata.cfg. Update this property to reference the name/location of the file containing the data to be placed in the database.  Note, use backslashes and be careful of folders with spaces in the name.  For example, url: C:/Users/Downloads/js_wikipedia_data/2016_03_clickstream_RESULTS.tsv.gz

Once the property has been updated, in the Console and at the root of the repo, type the following
- import DatabaseDataLoader
- loadDatabaseData()

The data will now be loading in the mySQL database in the background, you can do a SELECT count(*) FROM ca675assignment3.clickdata; to watch it incrementally. There are about 1.4 million rows to load.  From this point on, it is a case of starting the application and verifying it is all ok

# Starting the Application
To start the application, from the root of the application, enter 
- python runserver.py
or if within IDE such as Spyder
- open runserver.py and press f5
- Launch Firefox browser (the one we tested against) and go to [http://localhost:5000](http://localhost:5000)
- Grab some popcorn and enjoy browsing!
