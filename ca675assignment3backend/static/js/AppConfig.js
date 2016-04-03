sap.ui.define([],

/**
 * App Config file to access the Config properties file.
 */
function() {

    var config = function() {
    };
    var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
    var oBundle = jQuery.sap.resources({
        url: "resources/Config.properties",
        locale: sLocale
    });
    "use strict";
    /**
     * Call out to the config property file and retrieve the property value for the propertyName.
     * 
     * @param propertyName
     *            The name of the property to retrieve.
     */
    config.prototype.getProperty = function(propertyName) {
        return oBundle.getText(propertyName);
    };
    return config;
}, true);