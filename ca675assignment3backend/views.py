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
import json
from ca675assignment3backend import app
from ca675assignment3backend.service.ClickDataImpl import ClickDataImpl
from flask import render_template


"""
   Root destination of the applicatin, where the content of the application 
   is loaded
"""
@app.route("/")
def root():
     return render_template('Index.html')

"""
   Retrieves the click details for a searched page tilte.  The retrieved 
   information include an array of the inbound pages, an array containing 
   the counts of each inbound page, an array containing the percentage
   representation of each inbound page from which the searched page title was
   navigated to from, an array of the out bound pages from the searched page 
   title, an array of the counts of each outbound page, an array containing 
   the percentage representation of each outbound page clicked.  
"""
@app.route('/clickdata/page/<string:pageTitle>', methods=['GET'])
def get_tasks(pageTitle):
    clickDataImpl= ClickDataImpl()
    clickdatadetails = clickDataImpl.readData(pageTitle)
    jsonobject = json.dumps(clickdatadetails)
    return jsonobject

"""
   Retrieves the click details for a searched page tilte.  The retrieved 
   information include an array of the inbound pages, an array containing 
   the counts of each inbound page, an array containing the percentage
   representation of each inbound page from which the searched page title was
   navigated to from, an array of the out bound pages from the searched page 
   title, an array of the counts of each outbound page, an array containing 
   the percentage representation of each outbound page clicked.  
"""
@app.route('/clickdata/page/<string:pageTitle>', methods=['GET'])
def searchByPageTile(pageTitle):
    clickDataImpl= ClickDataImpl()
    clickdatadetails = clickDataImpl.readData(pageTitle)
    jsonobject = json.dumps(clickdatadetails)
    return jsonobject

