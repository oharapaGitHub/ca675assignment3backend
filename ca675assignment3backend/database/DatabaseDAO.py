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
import pymysql
import ConfigParser

#connect to db
def getConnection(): 
    """ 
     Retrives a connection to the mySQL database using the configuation file
     dbconfig.  The properties set in the configuration file are:
     
     host -- the host location of the database, default "localhost"
     port -- the port number for the database, default 3306
     user -- the user to connect to the database as, default "root"
     password -- the password for the user connecting to the database as, default "Password1"
     dbname -- the name of the database to connect to, default "ca675Assignment3"
    """ 
    # retrive the database connection details    
    config = ConfigParser.RawConfigParser()
    
    config.read('./ca675assignment3backend/database/dbconfig.cfg')
    
    # get the database connection
    db = pymysql.connect(host=config.get('DatabaseDetails', 'host'), 
                         port=config.getint('DatabaseDetails', 'port'),
                         user=config.get('DatabaseDetails', 'user'),
                         passwd=config.get('DatabaseDetails', 'passwd'),
                         db=config.get('DatabaseDetails', 'db'), 
                         charset=config.get('DatabaseDetails', 'charset'))
    return db
 
   
def read(sqlStatement, data):
    """ 
     Read a record from the database
     
     Keyword arguments:
     sqlStatement -- the read SQL statement to be executed
     data -- the data to used as parameters as part of the SQL statement
    """     
    db = getConnection()    
    #setup cursor
    cursor = db.cursor() 
    # attempt to read the record    
    cursor.execute(sqlStatement, data)
    result = cursor.fetchone()
    db.close()   
    return result
   
def search(sqlStatement, data):
    """ 
     Searchs for one or more record from the database based on the sql 
     statement passed in
     
     Keyword arguments:
     sqlStatement -- the read SQL statement to be executed
     data -- the data to used as parameters as part of the SQL statement
    """     
    db = getConnection()    
    #setup cursor
    cursor = db.cursor() 
    # attempt to read the record    
    cursor.execute(sqlStatement, data)
    result = cursor.fetchall()
    db.close()   
    return result
   

def insert(sqlStatement, data, db):
    """ 
     Inserts a record into the database
     
     Keyword arguments:
     sqlStatement -- the insert SQL statement to be executed
     data -- the data to be inserted into the database as part of the SQL statement
     db -- the database connection
    """ 
      
    #setup cursor
    cursor = db.cursor() 

    # attempt to insert the record    
    try:
        cursor.execute(sqlStatement, data)
    except:     
        db.rollback()
