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


class ClickDataDAO:
    """
        Data Access Object for the click data. Provides read and search
        operations for accessing the click data map reduce results.
    """    

    def readByPageTitle(self, pageTitle):
        """
           Retrieves and returns a record from the database based on the passed in page title parameter.
           
           Keyword arguments:
           pageTitle -- the title of the wiki page the details are to be read in relation to
        """        
        readByPageTitle = ("SELECT pagetitle, `from`, fromCount, `to`, toCount FROM clickdata "
                        " WHERE pageTitle = %s ")
        return DatabaseDAO.read(readByPageTitle, (pageTitle))

    def searchByPageTitle(self, pageTitle):
        """
           Retrieves and returns a record from the database based on the passed in page title parameter.
           
           Keyword arguments:
           pageTitle -- the title of the wiki page the details are to be read in relation to
        """        
        searchByPageTitle = ("SELECT pagetitle, FROM clickdata "
                        " WHERE pageTitle LIKE %s ")
        return DatabaseDAO.search(searchByPageTitle, (pageTitle))