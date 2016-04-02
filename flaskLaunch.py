# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 00:12:01 2016

@author: I310684
"""
from flask import Flask
from flaskext.mysql import MySQL
 
mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Password1'
app.config['MYSQL_DATABASE_DB'] = 'ca676Assignment3'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)



 
 
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/Authenticate")
def Authenticate():
    username = request.args.get('UserName')
    password = request.args.get('Password')
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from User where Username='" + username + "' and Password='" + password + "'")
    data = cursor.fetchone()
    if data is None:
     return "Username or Password is wrong"
    else:
     return "Logged in successfully"

if __name__ == "__main__":
    app.run()
    
    
