# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 19:00:52 2016

@author: I310684
"""

class ClickDataDetails:
    def __init__(self,pageTitle,fromPages,fromCounts,fromPercentages,toPages,toCounts,toPercentages):
        self.pageTitle = pageTitle
        self.fromPages = fromPages
        self.fromCounts = fromCounts
        self.fromPercentages = fromPercentages
        self.toPages = toPages
        self.toCounts = toCounts
        self.toPercentages = toPercentages
    description ="Object to hold click data to be serialized to json and returned to the frontend"
    author="Paul O'Hara"
    