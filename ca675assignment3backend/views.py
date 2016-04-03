import json
from ca675assignment3backend import app
from ca675assignment3backend.service.ClickDataImpl import ClickDataImpl
from flask import render_template


@app.route("/")
def hello():
     return render_template('Index.html')

@app.route('/clickdata/page/<string:pageTitle>', methods=['GET'])
def get_tasks(pageTitle):

    clickDataImpl= ClickDataImpl()
    clickdatadetails = clickDataImpl.readData(pageTitle)
    #print(clickdatadetails.pageTitle)
    jsonobject = json.dumps(clickdatadetails)
    return jsonobject

    
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
