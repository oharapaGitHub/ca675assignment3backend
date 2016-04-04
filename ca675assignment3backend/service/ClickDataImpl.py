# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 19:00:52 2016

@author: I310684
"""

import ClickDataDetails
from ca675assignment3backend.database.ClickDataDAO import ClickDataDAO


class ClickDataImpl:
    def readData(self, pageTitle):
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
        output = ClickDataDetails.ClickDataDetails(clickData[0], self.toList(clickData[1]),
                                self.toList(clickData[2]),
                                self.getPercentagesFromCounts(clickData[2]),
                                self.toList(clickData[3]),
                                self.toList(clickData[4]),
                                self.getPercentagesFromCounts(clickData[4])
                                )
        return data

    def getPercentagesFromCounts(self, counts):
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
        return clickDataOutput.strip('[').strip(']').strip().split(' ')
