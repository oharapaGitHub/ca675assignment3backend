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

sap.ui.define([],

/**
 * App Config file to access the Config properties file.
 */
function() {
    "use strict";

    var config = function() {
    };
    var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
    var oBundle = jQuery.sap.resources({
        url: "resources/Config.properties",
        locale: sLocale
    });

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