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
                    ClickDataExplorer.prototype.searchClickData = function(oEvent) {
                        var searchParameter = oEvent.getParameter('query');

                        // now call the sevice to update the model
                        this.getView().getModel().setProperty('/query', searchParameter);

                    };
                    return ClickDataExplorer;
                }, true);
