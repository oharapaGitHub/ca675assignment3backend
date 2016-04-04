/**
 * Manages and displays the results of a Key Influencer analysis and Outliners service call. Handles triggering
 * services, polling services and manipulating the dom to render the results of the service calls. It also handles user
 * interactions with the rendered elements.
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
                     * Constants for model used with this view, could use default but will set it
                     * for now
                     */
                    ClickDataExplorer.prototype.STORED_CLICK_DATA = "clickdata";

                    /**
                     * Called when a controller is instantiated and its View controls (if available) are already
                     * created. Can be used to modify the View before it is displayed, to bind event handlers and do
                     * other one-time initialization.
                     *
                     * @memberOf exploreanalytics.exploreanalyticsview
                     */
                    ClickDataExplorer.prototype.onInit = function() {

                        this.initModels();
                    };

                    /**
                     * Initialise the model used by this view.
                     */
                    ClickDataExplorer.prototype.initModels = function() {



                        var clickDataStored = new sap.ui.model.json.JSONModel({
                            query : null,
                            from: [],
                            to: []
                        });


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

                        this.getView().setModel(clickDataStored, this.STORED_CLICK_DATA);

                    };

                    /**
                     * Search the click data and update the model with the results
                     */
                    ClickDataExplorer.prototype.onQuerySucess = function(data,textStatus, jqXHR) {
                        var queryResultsData = data[0];
                        this.updateQueryTables(queryResultsData);
                        this.updateQueryVisualisation(queryResultsData);
                    };

                    /**
                     * Updates the model controling the display of the results from the query
                     * @param  {object} queryResultData json object containing the results of the click data query 
                     */
                    ClickDataExplorer.prototype.updateQueryTables = function(queryResultData) {

                                var from =[];
                                var to =[];
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

                                this.getView().getModel().setProperty('/query', queryResultData.pageTitle);
                                this.getView().getModel().setProperty('/from', from); 
                                this.getView().getModel().setProperty('/to', to); 
                    };

                    /**
                     * Updates the query results visualisation with the content of search results
                     * @param  {[type]} queryResultData josn object contaiing the results of the click data query
                     */
                    ClickDataExplorer.prototype.updateQueryVisualisation = function(queryResultData) {
                        // TODO: Implement
                        var units = "%";

                        var margin = {top: 10, right: 10, bottom: 10, left: 10},
                            width = 1200 - margin.left - margin.right,
                            height = 740 - margin.top - margin.bottom;

                        var formatNumber = d3.format(",.0f"),    // zero decimal places
                            format = function(d) { return formatNumber(d) + " " + units; },
                            color = d3.scale.category20();


                        // append the svg canvas to the page
                        var svg = d3.select(".clickdatachart-p").append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

                        // Set the sankey diagram properties
                        var sankey = d3.sankey()
                            .nodeWidth(36)
                            .nodePadding(10)
                            .size([width, height]);

                        var path = sankey.link();

                        // load the data
                        d3.json("../static/sampledata/sankeygreenhouse.json", function(error, graph) {
                            var nodeMap = {};
                            graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
                                graph.links = graph.links.map(function(x) {
                                return {
                                    source: nodeMap[x.source],
                                    target: nodeMap[x.target],
                                    value: x.value
                                };
                            });

                            sankey
                                .nodes(graph.nodes)
                                .links(graph.links)
                                .layout(32);

                            // add in the links
                            var link = svg.append("g").selectAll(".link")
                                .data(graph.links)
                                .enter().append("path")
                                    .attr("class", "link")
                                    .attr("d", path)
                                .style("stroke-width", function(d) { return Math.max(1, d.dy); })
                                .sort(function(a, b) { return b.dy - a.dy; });

                            // add the link titles
                            link.append("title")
                                .text(function(d) {
                                    return d.source.name + " ? " +
                                        d.target.name + "\n" + format(d.value); });

                            // add in the nodes
                            var node = svg.append("g").selectAll(".node")
                                .data(graph.nodes)
                                .enter().append("g")
                                .attr("class", "node")
                                .attr("transform", function(d) {
                                  return "translate(" + d.x + "," + d.y + ")"; })
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
                        });
                    };

                    /**
                     * Search the click data and update the model with the results
                     */
                    ClickDataExplorer.prototype.searchClickData = function(oEvent) {
                        var searchParameter = oEvent.getParameter('query');

                        var aData = jQuery.ajax({
                            type : "GET",
                            contentType : "application/json",
                            url : "http://localhost:5000/clickdata/page/" + searchParameter,
                            dataType : "json",
                            async: false,
                            success : this.onQuerySucess.bind(this)
                        });     
                        // now call the sevice to update the model
                       

                    };
                    return ClickDataExplorer;
                }, true);
