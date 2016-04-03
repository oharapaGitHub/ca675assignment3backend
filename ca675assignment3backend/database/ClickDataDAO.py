# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 09:57:56 2016

@author: I310684
"""
import DatabaseDAO
import pandas as pd

class ClickDataDAO:
    def readCSV(self,url) :
            df = pd.read_csv(url, names=['PageTitle','FromPage','FromCount','ToPage','ToCount','Content']);
            return df;

    def loadClickDataThroughCSV(self):
        clickDataUrl = './data/demo/sample.csv'
        dataFrameIn = self.readCSV(clickDataUrl)
        for index, row in dataFrameIn.iterrows():
            self.insertClickData(row['PageTitle'].strip(), row['FromPage'].strip(), row['FromCount'].strip(),row['ToPage'].strip(),row['ToCount'].strip(),row['Content'].strip())

    # reads a record from the database based on the page title passed in
    def readByPageTitle(self, pageTitle):
        readByPageTitle = ("SELECT pagetitle, `from`, fromCount, `to`, toCount, content FROM clickdata "
                        " WHERE pageTitle = %s ")
        return DatabaseDAO.read(readByPageTitle, (pageTitle))

    # insert new row to click data
    def insertClickData(self, pageTitle, fromPage, fromCount, toPage, toCount, content):
        create_clickData = ("INSERT INTO clickdata "
                   "(pagetitle, `from`, fromCount, `to`, toCount, content) "
                   "VALUES (%s, %s, %s, %s, %s, %s);")
        add_clickData= (pageTitle, fromPage, fromCount, toPage, toCount, content)
        DatabaseDAO.insert(create_clickData, add_clickData)
