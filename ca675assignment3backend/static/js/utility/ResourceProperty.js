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

function() {
    "use strict";

    /**
     * Controls the retrieving of localisable text from the passed in properties files.
     * 
     * @param {String}
     *            resourceName the name of the properties file
     */
    var ResourceProperty = function(resourceName) {
        this.resourceURL = resourceName;
        this.locale = sap.ui.getCore().getConfiguration().getLanguage();
        this.oBundle = jQuery.sap.resources({
            url: "resources/" + this.resourceURL,
            locale: this.locale
        });
    };

    /**
     * Retrieves a localisable text property, substituting in the parameters of the passed in parameter array.
     * 
     * @param {string}
     *            propertyName The name of the property to be retrieved
     * @param {string[]}
     *            [parameterArray] Optional array of parameters that when passed the function will be attempted to
     *            substitute into the property being retrieved
     * @return {string} the localised property for display on the client
     */
    ResourceProperty.prototype.getText = function(propertyName, parameterArray) {
        var result;

        if (parameterArray) {
            result = this.oBundle.getText(propertyName, parameterArray);
        } else {
            result = this.oBundle.getText(propertyName);
        }
        return result;
    };

    /**
     * Retrieves a string text, that is a concatenation of the passed in array of labels, with each label separated by
     * the passed in separator.
     * 
     * @param {string}
     *            separator the separator for between the labels
     * @param {string[]}
     *            labelItems Array of localised items that are to be concatenated into a label, where each item is
     *            separated by the passed in separator
     * @return {string} the localised property for display on the client
     */
    ResourceProperty.prototype.getSeperatorText = function(separator, labelItems) {
        var result;
        if (labelItems.lowerBound) {
            return labelItems.lowerBound + " - " + labelItems.higherBound;
        } else {
            if (labelItems.label) {
                result = labelItems.label;
            } else {
                result = labelItems.group;
            }
            return result;
        }
    };

    return ResourceProperty;
}, true);
