# -*- coding: utf-8 -*-
"""
Created on Sat Apr 02 00:12:01 2016

@author: I310684
"""
import pdb

from flask import Flask
from database.ClickDataDAO import ClickDataDAO

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello  World!"

@app.route('/clickdata/page/<string:pageTitle>', methods=['GET'])
def get_tasks(pageTitle):
    pdb.set_trace()
    clickDataDAO = ClickDataDAO()
    return clickDataDAO.readByPageTitle(pageTitle)

    
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
    
    
