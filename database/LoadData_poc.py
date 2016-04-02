# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 09:57:56 2016

@author: I310684
"""



# insert new row to click data 
def insertClickData(pageTitle, fromPage, fromCount, toPage, toCount, content):
    create_clickData = ("INSERT INTO clickdata "
               "(pagetitle, `from`, fromCount, `to`, toCount, content) "
               "VALUES (%s, %s, %s, %s, %s, %s);")
    add_clickData= (pageTitle, fromPage, fromCount, toPage, toCount, content)
    insert(create_clickData, add_clickData)


#connect to db
def getConnection(host, port, user, password, dbname): 
    #db = pymysql.connect(host="localhost", port=3306, user="root", passwd="Password1", db="ca675Assignment3" )
    db = pymysql.connect(host=host, port=port, user=user, passwd=password, db=dbname )
    return db
    
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