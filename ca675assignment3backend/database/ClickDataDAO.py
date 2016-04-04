# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 09:57:56 2016

@author: I310684
"""
import DatabaseDAO
import pandas as pd

class ClickDataDAO:
    def readCSV(self,url) :
            df = pd.read_csv(url, names=['PageTitle','FromPage','FromCount','ToPage','ToCount'], sep='\t');
            return df;

    def loadClickDataThroughCSV(self):
        clickDataUrl = './data/demo/2015_2_clickstream_bowie_UTF8_RESULTS v3.tsv'
        dataFrameIn = self.readCSV(clickDataUrl)
        for index, row in dataFrameIn.iterrows():
            self.insertClickData(row['PageTitle'].strip(), row['FromPage'].strip(), row['FromCount'].strip(),row['ToPage'].strip(),row['ToCount'].strip())

    # reads a record from the database based on the page title passed in
    def readByPageTitle(self, pageTitle):
        readByPageTitle = ("SELECT pagetitle, `from`, fromCount, `to`, toCount FROM clickdata "
                        " WHERE pageTitle = %s ")
        return DatabaseDAO.read(readByPageTitle, (pageTitle))

    # insert new row to click data
    def insertClickData(self, pageTitle, fromPage, fromCount, toPage, toCount):
        create_clickData = ("INSERT INTO clickdata "
                   "(pagetitle, `from`, fromCount, `to`, toCount) "
                   "VALUES (%s, %s, %s, %s, %s);")
        add_clickData= (pageTitle, fromPage, fromCount, toPage, toCount)
        DatabaseDAO.insert(create_clickData, add_clickData)
