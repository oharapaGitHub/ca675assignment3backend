/**
	* Disclaimer: Submitted to Dublin City University, School of Computing for module CA675: Cloud
	* Technologies, 2016. We hereby certify that the work presented and the material contained
	* herein is our own except where explicitly stated references to other material are made.
	* 
	* Author, StudentId, Email
	* - John Segrave, 14212108, john.segravedaly2@mail.dcu.ie
	* - Paul O'Hara, 14212372, paul.ohara6@mail.dcu.ie
	* - Claire Breslin, 14210826, claire.breslin4@mail.dcu.ie
	* 
	* Code available online:
	* https://github.com/oharapaGitHub/ca675assignment3backend
*/

/**
	* Controller for the UI of the click data application.  Controls the interaction 
	* between the various UI controls, and communication with the backend
	* services that provide the data for the clid data application.
*/
sap.ui
.define(
[ ],
function() {
	
	"use strict";
	
	var ClickDataExplorer = sap.ui.core.mvc.Controller.extend(
	"com.dcu.ca675.ui.view.ClickData_explore", {
		
	});
	/**
		* Called when a controller is instantiated and its View controls (if available) are already
		* created. Can be used to modify the View before it is displayed, to bind event handlers and do
		* other one-time initialization.
		*
	*/
	ClickDataExplorer.prototype.onInit = function() {
		
		// properties used to hold a reference to the selected items in the 
		// to and from lists
		this._selectedFromListItem = null;
		this._selectedToListItem = null;
		this._wikiLinkURI = 'https://en.wikipedia.org/wiki/'
		
		// initialise the models used by the related view
		this.initModels();
	};
	
	/**
		* Initialise the model used by the view related to this controller.
	*/
	ClickDataExplorer.prototype.initModels = function() {
		
		var clickData = new sap.ui.model.json.JSONModel({
			query: '',
			from: [{
				article: 'Sample From',
				count: 999,
				percentage: 100
			}],
			to: [{
				article: 'Sample To',
				count: 999,
				percentage: 100
			}]
		});
		
		
		this.getView().setModel(clickData);
		
	};
	
	/**
		* Callback to handle the scenario where the an error occured in the attempted retrieval of 
		* click data based on the query term.    
		* 
		* On error, a toast is display to the user stating no items were returned to the user for
		* the search parameter used. 
	*/
	ClickDataExplorer.prototype.onQueryError = function() {
		sap.m.MessageToast.show("Failed to find any items for search parameter");
	};
	
	/**
		* Search the click data and update the model with the results
		* @param {object} data the resutls data returned from the response
		* @param {string} testStatus status code providing additional information on the state of the successful 
		*                            query
		* @param {object} jqXHR The jqXHR (jQuery XMLHttpRequest) object, replaces the browser native XMLHttpRequest
	*/
	ClickDataExplorer.prototype.onQuerySucess = function(data,textStatus, jqXHR) {
		// retrieve the results data from the response 
		var queryResultsData = data[0];
		
		// reset the selected items in the to and from list
		this.resetSelectedFromList();
		this.resetSelectedToList();
		this._selectedFromListItem=null;
		this._selectedToListItem=null;
		
		// update the to and from lists, and related visualisation
		this.updateQueryTables(queryResultsData);
		this.updateQueryVisualisation(queryResultsData);
		
	};
	
	/**
		* Resets the selected itmes in the from list after a successful result is returned from
		* a call to retrieve the click data results for a page.  The currently stored item in the
		* from list is set to deselected
	*/
	ClickDataExplorer.prototype.resetSelectedFromList = function() {
		if(this._selectedFromListItem) {
			this._selectedFromListItem.setSelected(false);
		}
	};
	
	/**
		* Resets the selected itmes in the to list after a successful result is returned from
		* a call to retrieve the click data results for a page.  The currently stored item in the
		* to list is set to deselected
	*/
	ClickDataExplorer.prototype.resetSelectedToList = function() {
		if(this._selectedToListItem) {
			this._selectedToListItem.setSelected(false);
		}
	};
	
	/**
		* Updates the model controling the display of the results from the query
		* @param  {object} ResultData json object containing the results of the click data query 
	*/
	ClickDataExplorer.prototype.updateQueryTables = function(queryResultData) {
		
		var emptyTables = {
			article: null,
			count: null,
			percentage: null
		};
		var from =[];
		var to =[];
		
		
		// map the new content to the structure required by the lists
		queryResultData.fromPages.forEach(function(item, itemIndex) {
			from.push({
				article: item,
				count: queryResultData.fromCounts[itemIndex],
				percentage: queryResultData.fromPercentages[itemIndex]
			});
		}, this);
		
		queryResultData.toPages.forEach(function(item, itemIndex) {
			to.push({
				article: item,
				count: queryResultData.toCounts[itemIndex],
				percentage: queryResultData.toPercentages[itemIndex]
			});
		}, this);
		
		// update the models with bindings to the mapped content
		this.getView().getModel().setProperty('/query', queryResultData.pageTitle);
		this.getView().getModel().setProperty('/uri', this._wikiLinkURI + queryResultData.pageTitle);
		// empty the model of the lists before binging the new content, this will reset any scrolling done
		this.getView().getModel().setProperty('/from', emptyTables); 
		this.getView().getModel().setProperty('/to', emptyTables);
		
		this.getView().getModel().setProperty('/from', from); 
		this.getView().getModel().setProperty('/to', to); 
	};
	
	/**
		* Updates the query results visualisation with the content of search results
		* @param  {object} queryResultData josn object contaiing the results of the click data query
	*/
	ClickDataExplorer.prototype.updateQueryVisualisation = function(queryResultData) {

		//** SANKEY DIAGRAM**/
		
		
		//Get data from queryResultData and format into JSON
		var ResultData = {};
		if(queryResultData.fromCounts.length>11){
			ResultData.fromCounts = queryResultData.fromCounts.slice(0, 10);
			} else{
			ResultData.fromCounts = queryResultData.fromCounts;
		}
		
		if(queryResultData.fromPages.length>11){
			ResultData.fromPages = queryResultData.fromPages.slice(0, 10);
			} else{
			ResultData.fromPages = queryResultData.fromPages;
		}
		
		
		if(queryResultData.fromPercentages.length>11){
			ResultData.fromPercentages = queryResultData.fromPercentages.slice(0, 10);
			} else{
			ResultData.fromPercentages = queryResultData.fromPercentages;
		}
		
		if(queryResultData.toCounts.length>11){
			ResultData.toCounts = queryResultData.toCounts.slice(0, 10);
			} else{
			ResultData.toCounts = queryResultData.toCounts;
		}
		
		if(queryResultData.toPages.length>11){
			ResultData.toPages = queryResultData.toPages.slice(0, 10);
			} else{
			ResultData.toPages = queryResultData.toPages;
		}
		
		if(queryResultData.toPercentages.length>11){
			ResultData.toPercentages = queryResultData.toPercentages.slice(0, 10);
			} else{
			ResultData.toPercentages = queryResultData.toPercentages;
		}
		ResultData.pageTitle = queryResultData.pageTitle;
		//prepare the data - an array of objects
		var data_nodes = [];
		
		
		//*********NODES*************
		//get a list of all the inbound nodes
		ResultData.fromPages.forEach(function(item, itemIndex) {
			
			
			data_nodes.push({
				name: ResultData.fromPages[itemIndex]
			}); 
			
		}, this);
		
		//get a list of all the outbound nodes
		ResultData.toPages.forEach(function(item, itemIndex) {
			data_nodes.push({
				name: ResultData.toPages[itemIndex]
			});
		}, this);	
		
		var search_term = queryResultData.pageTitle;
		data_nodes.push({name: search_term});
		
		var orig_length = data_nodes.length;
		//check to see if there are any duplicate nodes and remove
		for( var i = 0; i < data_nodes.length; i++){
			for( var x = i+1; x < data_nodes.length; x++){
				if( data_nodes[x].name == data_nodes[i].Name ){
					data_nodes.splice(x,1);
					--x;
				}
			}
			// add
		}
		
		

		var final_length = data_nodes.length;
		
		var json_nodes = JSON.stringify(data_nodes);
		
		//*********LINKS******************
		var data_links = [];
		//setting up the links coming 
		ResultData.fromPages.forEach(function(item, itemIndex) {
			data_links.push({
				source: item,
				target: ResultData.pageTitle,
				value: ResultData.fromCounts[itemIndex],
				percentage: ResultData.fromPercentages[itemIndex],
				
			});
		}, this);
		
		ResultData.toPages.forEach(function(item, itemIndex) {
			data_links.push({
				source: ResultData.pageTitle,
				target: item,
				value: ResultData.toCounts[itemIndex],
				percentage: ResultData.toPercentages[itemIndex],
			});
		}, this);
		
		// turn data into a JSON file
		var json_links = JSON.stringify(data_links);
		var json_data = "{ \"nodes\": " + json_nodes + ", \"links\": " + json_links + "}";
		
		//parse JSON variable to access data elements		
		var data = JSON.parse(json_data);
		
		//get data into correct format for sankey
		var nodeMap = {};
		data.nodes.forEach(function(x){ nodeMap[x.name] = x;});
		data.links = data.links.map(function(x){
			return{
				source: nodeMap[x.source],
				target: nodeMap[x.target],
				value: x.value
			};
		});
		var units = "Clicks";  
		
		var margin = {top: 100, right: 100, bottom: 100, left: 100},  
		width = 1200 - margin.left - margin.right,  
		height = 1000 - margin.top - margin.bottom;  
		var formatNumber = d3.format(",.0f"),  // zero decimal places  
		format = function(d) { return formatNumber(d) + " " + units; },  
		color = d3.scale.category20(); 
		
		//remove previous chart before adding a new one
		document.querySelector('.clickdatachart-p').innerHTML = '';
		
		// append the svg canvas to the page  
		var svg = d3.select(".clickdatachart-p").append("svg")  
		.attr("width", width + margin.left + margin.right)  
		.attr("height", height + margin.top + margin.bottom)  
		.append("g")  
		.attr("transform",   
		"translate(" + margin.left + "," + margin.top + ")");  
		
		svg.append("text")
		.attr("x", (width / 2))             
		.attr("y", 0 - (margin.top / 2))
		.attr("text-anchor", "middle")  
		.style("font-size", "40px")
		.style("font-family", "Verdana")
		.style("text-decoration", "underline")  
		.text("Web Traffic Flow ");	
		
		// Set the sankey diagram properties
		var sankey = d3.sankey()
		.nodeWidth(36)
		.nodePadding(10)
		.size([width, height]);
		
		var path = sankey.link();
		
		sankey
		.nodes(data.nodes)
		.links(data.links)
		.layout(32);
		
		// add in the links
		var link = svg.append("g").selectAll(".link")
		.data(data.links)
		.enter().append("path")
		.attr("class", "link")
		.attr("d", path)
		.style("stroke-width", function(d) { return Math.max(1, d.dy); })
		.sort(function(a, b) { return b.dy - a.dy; }); 
		link.filter( function(d) { return !d.causesCycle} )
		.style("stroke-width", function(d) { return Math.max(1, d.dy); })	
		
		// add the link titles
		link.append("title")
		.text(function(d) {
			return d.source.name + " ? " +
		d.target.name + "\n" + format(d.value); });
		
		// add in the nodes
		var node = svg.append("g").selectAll(".node")
		.data(data.nodes)
		.enter().append("g")
		.attr("class", "node")
		.attr("transform", function(d) {
		return "translate(" + d.x + "," + d.y + ")"; })
		.on("click", dblclick)
		
		.call(d3.behavior.drag()
		.origin(function(d) { return d; })
		.on("dragstart", function() {
		this.parentNode.appendChild(this); })
		.on("drag", dragmove));
		
		// add the rectangles for the nodes
		node.append("rect")
		.attr("height", function(d) { return d.dy; })
		.attr("width", sankey.nodeWidth())
		.style("fill", function(d) {
		return d.color = color(d.name.replace(/ .*/, "")); })
		.style("stroke", function(d) {
		return d3.rgb(d.color).darker(2); })
		.append("title")
		.text(function(d) {
		return d.name + "\n" + format(d.value); });
		
		// add in the title for the nodes
		node.append("text")
		.attr("x", -6)
		.attr("y", function(d) { return d.dy / 2; })
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.attr("transform", null)
		.text(function(d) { return d.name; })
		.filter(function(d) { return d.x < width / 2; })
		.attr("x", 6 + sankey.nodeWidth())
		.attr("text-anchor", "start");
		
		
		// the function for moving the nodes
		function dragmove(d) {
			d3.select(this).attr("transform",
			"translate(" + (
			d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
			) + "," + (
			d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
			) + ")");
			sankey.relayout();
			link.attr("d", path);
		}
		
		//open link in a new window when click on node
		function dblclick(a){
			window.open("http://en.wikipedia.org/wiki/"+a.name, '_blank');
		}
	}
	
	
	/**
		* Search the click data and update the model with the results based on the user selecting an 
		* item related to the 'from' list
		* 
		* @param {object} oEvent the event object containing the selected wiki page title
		*                        to be passed as the page title in the rest query
	*/
	ClickDataExplorer.prototype.fromListItemSelected = function(oEvent) {
		// deselect selected to list item, if one selected
		this.resetSelectedToList();
		// update the stored from selected item
		this._selectedFromListItem = oEvent.getParameters().listItem;
		// call the service to retrieve the click data
		this.getClickDataForListItem(oEvent);
		
	};
	
	/**
		* Search the click data and update the model with the results based on the user selecting an 
		* item related to the 'to' list
		* 
		* @param {object} oEvent the event object containing the selected wiki page title
		*                        to be passed as the page title in the rest query
	*/
	ClickDataExplorer.prototype.toListItemSelected = function(oEvent) {
		// deselect selected from list item, if one selected
		this.resetSelectedFromList();
		// update the stored to selected item
		this._selectedToListItem = oEvent.getParameters().listItem;
		// call the service to retrieve the click data
		this.getClickDataForListItem(oEvent);
	};
	
	/**
		* Search the click data and update the model with the results
		* 
		* @param {object} oEvent the event object containing the selected wiki page title
		*                        to be passed as the page title in the rest query
	*/
	ClickDataExplorer.prototype.getClickDataForListItem = function(oEvent) {
		
		// the query parameter will always be the first cell item
		var searchParameter = oEvent.mParameters.listItem.mAggregations.cells[0].mProperties.text;
		this.invokeBackendService("http://localhost:5000/clickdata/page/" + searchParameter);
	};
	
	/**
		* Search the click data and update the model with the results
		* @param {object} oEvent the event object containing the searched for wiki page title
		*                        to be passes as the page title in the rest query
	*/
	ClickDataExplorer.prototype.searchClickData = function(oEvent) {
		var searchParameter = oEvent.getParameter('query');
		this.invokeBackendService("http://localhost:5000/clickdata/page/" + searchParameter);
		
	};
	
	/**
		* Search the click data and update the model with the results
		* @param {string} queryURL the restful url to be called
	*/
	ClickDataExplorer.prototype.invokeBackendService = function(queryURL) {
		
		var aData = jQuery.ajax({
			type : "GET",
			contentType : "application/json",
			url : queryURL,
			dataType : "json",
			async: false,
			success : this.onQuerySucess.bind(this),
			error: this.onQueryError.bind(this)
		});     
	};
	return ClickDataExplorer;
}, true);
