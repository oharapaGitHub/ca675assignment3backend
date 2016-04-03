sap.ui.define([ "com/dcu/ca675/ui/js/utility/ResourceProperty", "sap/m/MessageBox" ], function(ResourceProperty,
        MessageBox) {
    "use strict";

    var ErrorHandler = function() {
    };

    ErrorHandler.prototype.eventBus = sap.ui.getCore().getEventBus();
    ErrorHandler.prototype.properties = new ResourceProperty("ErrorMessages.properties");

    /**
     * Function to show a message dialog notifying the user that the single sign on session has expired. The window will
     * then reload to force sign in and retrieve a new session.
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
