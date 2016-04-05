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
from database.ClickDataDAO import ClickDataDAO


def readData():
    clickDataDAO = ClickDataDAO()
    clickData = clickDataDAO.readByPageTitle('David_Bowie')

    ## read the data and return in json format
    data = [ { 
        'pageTitle': clickData[0],
        'fromPages': toList(clickData[1]),
        'fromCounts': toList(clickData[2]),
        'fromPercentages': getPercentagesFromCounts(clickData[2]),
        'toPages': toList(clickData[3]),
        'toCounts': toList(clickData[4]),
        'toPercentages': getPercentagesFromCounts(clickData[4]),
        'jsonContent': clickData[5].strip('[').strip(']').split(' ')
    } ]
    return data
  
def getPercentagesFromCounts(counts):
    percentageList = []    
    ## covert to list    
    countsList = toList(counts)
    
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
    
def toList(clickDataOutput):    
    return clickDataOutput.strip('[').strip(']').split(' ')
