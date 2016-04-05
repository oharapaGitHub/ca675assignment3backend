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
from flask import Flask    

app = Flask(__name__)
## load the views
import ca675assignment3backend.views
    
