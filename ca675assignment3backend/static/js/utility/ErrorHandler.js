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
sap.ui.define([ "com/dcu/ca675/ui/js/utility/ResourceProperty", "sap/m/MessageBox" ], function(ResourceProperty,
        MessageBox) {
    "use strict";

    var ErrorHandler = function() {
    };

    ErrorHandler.prototype.eventBus = sap.ui.getCore().getEventBus();
    ErrorHandler.prototype.properties = new ResourceProperty("ErrorMessages.properties");

    /**
     * Function to show a message dialog notifying the user that a general error has occured in the application. The window will
     * then reload.
     *
     */
    ErrorHandler.prototype.handleSessionTimeout = function() {

        var pageReloadCallback = function() {
            window.location.reload();
        };

        // only show dialog if one is not already open.
        if (jQuery(".sessionExpiredDialog").length === 0) {
            MessageBox.show(ErrorHandler.prototype.properties.getText("App.Alert.Message.GeneralError"), {
                title: ErrorHandler.prototype.properties.getText("App.Alert.Title.GeneralError"),
                onClose: pageReloadCallback,
                styleClass: "sessionExpiredDialog"
            });
        }

    };


    return ErrorHandler;
}, true);
