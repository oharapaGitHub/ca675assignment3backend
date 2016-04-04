# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 19:00:52 2016

@author: I310684
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
