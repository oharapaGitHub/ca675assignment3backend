# -*- coding: utf-8 -*-
"""                                                                                              
   Disclaimer: Submitted to Dublin City University, School of Computing for module CA675: Cloud      
   Technologies, 2016. We hereby certify that the work presented and the material contained          
   herein is our own except where explicitly stated references to other material are made.           
                                                                                                     
   Author, StudentId, Email                                                                          
   - John Segrave, 14212108, john.segravedaly2@mail.dcu.ie                                           
   - Paul O'Hara, 14212372, paul.ohara6@mail.dcu.ie                                                  
   - Claire Breslin, 14210826, claire.breslin4@mail.dcu.ie                                           
                                                                                                     
   Code available online:                                                                            
     https://github.com/oharapaGitHub/ca675assignment3backend                                        
"""    
import DatabaseDAO
import pandas as pd


class ClickDataDAO:
    """
        Data Access Object for the click data. Provides insert, read and 
        operations for accessing the click data map reduce results.
    """    

    def readCSV(self,url):
       """
           Retrieves the results of the map reduce operation from the outputted csv
           file, returning it as a dataframe.
           
           Keyword arguments:
           url -- the location of the csv file to be read
       """
       df = pd.read_csv(url, names=['PageTitle','FromPage','FromCount','ToPage','ToCount'], sep='\t', chunksize=10000, encoding='utf8');
       return df;

    def loadClickDataThroughCSV(self):
        """
           Loads the results of map reduce operation on the wiki click data into the database for access
           by the application.
           
        """
        clickDataUrl = './data/demo/2016_03_clickstream_UTF8_RESULTS.tsv.gz'
        TextFileReader =self.readCSV(clickDataUrl)
        for dataFrameIn in TextFileReader:
            databaseConnection = DatabaseDAO.getConnection("localhost", 3306, "root", "Password1", "ca675Assignment3" )
            for index, row in dataFrameIn.iterrows():
                self.insertClickData(row['PageTitle'], row['FromPage'].strip(), row['FromCount'].strip(),row['ToPage'].strip(),row['ToCount'].strip(), databaseConnection)
            try:
                databaseConnection.commit()
            except:     
                databaseConnection.rollback()
            databaseConnection.close()

    def readByPageTitle(self, pageTitle):
        """
           Retrieves and returns a record from the database based on the passed in page title parameter.
           
           Keyword arguments:
           pageTitle -- the title of the wiki page the details are to be read in relation to
        """        
        readByPageTitle = ("SELECT pagetitle, `from`, fromCount, `to`, toCount FROM clickdata "
                        " WHERE pageTitle = %s ")
        return DatabaseDAO.read(readByPageTitle, (pageTitle))

    def insertClickData(self, pageTitle, fromPage, fromCount, toPage, toCount, databaseConnection):
        """
           Inserts a click data record into the database
           
           Keyword arguments:
           pageTitle -- the title of the wiki page the details are to be read in relation to
           fromPage -- an array containing the list of all page titles the current page title was navigated to from
           fromCount -- an array containing the counts for the number of times the current page title was
                        navigated to for each of the page titles contained in the fromPage
                        array parameter
           toPage -- an array containing the list of all page titles users navigated to from the current page title 
           toCount -- an array containing the counts for the number of times each page navigated to from the 
                       current page title 
        """           
        create_clickData = ("INSERT INTO clickdata "
                   "(pagetitle, `from`, fromCount, `to`, toCount) "
                   "VALUES (%s, %s, %s, %s, %s);")
        add_clickData= (pageTitle, fromPage, fromCount, toPage, toCount)
        DatabaseDAO.insert(create_clickData, add_clickData, databaseConnection)
