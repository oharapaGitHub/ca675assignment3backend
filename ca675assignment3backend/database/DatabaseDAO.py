# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 16:27:42 2016

@author: I310684
"""
import pymysql

#connect to db
def getConnection(host, port, user, password, dbname): 
    #db = pymysql.connect(host="localhost", port=3306, user="root", passwd="Password1", db="ca675Assignment3" )
    db = pymysql.connect(host=host, port=port, user=user, passwd=password, db=dbname )
    return db
 
   
# Insert new record
def read(sqlStatement, data):
    db = getConnection("localhost", 3306, "root", "Password1", "ca675Assignment3" )    
    #setup cursor
    cursor = db.cursor() 
    # attempt to read the record    
    cursor.execute(sqlStatement, data)
    result = cursor.fetchone()
    print(result)
    db.close()   
    return result
   
# Insert new record
def insert(sqlStatement, data):
    db = getConnection("localhost", 3306, "root", "Password1", "ca675Assignment3" )    
    #setup cursor
    cursor = db.cursor() 

    # attempt to insert the record    
    try:
        cursor.execute(sqlStatement, data)
        db.commit()
    except:     
        db.rollback()
    db.close()