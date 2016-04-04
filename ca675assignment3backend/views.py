import json
import pdb
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
    jsonobject = json.dumps(clickdatadetails)
    return jsonobject

