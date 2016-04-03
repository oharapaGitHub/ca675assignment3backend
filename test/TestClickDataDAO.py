# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 19:00:52 2016

@author: I310684
"""

import pdb
from flask import Flask
from database import ClickDataDAO


def readData():
    clickDataDAO = ClickDataDAO();
    return clickDataDAO.readByPageTitle('David_Bowie')
    