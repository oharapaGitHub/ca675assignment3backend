# -*- coding: utf-8 -*-
"""
Created on Mon Apr 04 12:11:15 2016

@author: I310684
"""

import json
import pdb
from ca675assignment3backend import app
from ca675assignment3backend.service.ClickDataImpl import ClickDataImpl
from flask import render_template


pageTitle = 'Ziggy_Stardust_Tour'
clickDataImpl= ClickDataImpl()
print(pageTitle)
clickdatadetails = clickDataImpl.readData(pageTitle)
jsonobject = json.dumps(clickdatadetails)
print(jsonobject)