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
from ca675assignment3backend.database.ClickDataDAO import ClickDataDAO


class ClickDataImpl:
    """
        Click Data Class. This class is use to access the click data and perform 
        various operations on the click data
    """ 
    def readData(self, pageTitle):
        """
           Retrieves the click data details. The retrived click data details contains the following
           
           pageTitle -- the title of the wiki page the details are to be read in relation to
           fromPage -- an array containing the list of all page titles the current page title was navigated to from
           fromCount -- an array containing the counts for the number of times the current page title was
                        navigated to for each of the page titles contained in the fromPage
                        array parameter
           fromPercentage -- an array containing the percentage representation of each 
                           inbound page from which the searched page title was navigated to from
           toPage -- an array containing the list of all page titles users navigated to from the current page title 
           toCount -- an array containing the counts for the number of times each page navigated to from the 
                       current page title             
           toPercentages --  an array of the counts of each outbound page, an array containing the percentage 
                             representation of each outbound page clicked.           
           

           Keyword arguments:
           url -- the location of the csv file to be read

        """
        clickDataDAO = ClickDataDAO()
        clickData = clickDataDAO.readByPageTitle(pageTitle)

        ## read the data and return in json format
        data = [ { 
            'pageTitle': clickData[0],  
            'fromPages': self.toList(clickData[1]),
            'fromCounts': self.toList(clickData[2]),
            'fromPercentages': self.getPercentagesFromCounts(clickData[2]),
            'toPages': self.toList(clickData[3]),
            'toCounts': self.toList(clickData[4]),
            'toPercentages': self.getPercentagesFromCounts(clickData[4])
            } ]
        return data

    def getPercentagesFromCounts(self, counts):
        """
           Retrieves an array of integers representing the percentage value each item in the passed in array of counts represents.           

           Keyword arguments:
           counts -- an array of integers representing page counts to be converted into the percentage array
        """
        
        percentageList = []    
        ## covert to list    
        countsList = self.toList(counts)
    
        # convert the list of strings to ints
        countsList = map(float, countsList)
        print(countsList)
        # determine the total and get percentage of each
        countsListsSum = sum(countsList)
        print(countsListsSum)
        
        for item in countsList:
            percentage = (item * 100) / countsListsSum 
            percentageList.append(round(percentage, 0))
            
        return map(int, percentageList)
    
    def toList(self,clickDataOutput):
        """
           Parses one of the stored click data variabes retrieved from the database, transforming into a list and 
           returning the list

           Keyword arguments:
           clickDataOutput -- The click data variable to be converted into an list
        """
        return clickDataOutput.strip('[').strip(']').strip().split(' ')
