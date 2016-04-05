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
sap.ui.define([ "com/dcu/ca675/ui/js/utility/ErrorHandler" ],
        function(ErrorHandler) {
            "use strict";
            var AppRoot = sap.ui.core.mvc.Controller.extend("com.dcu.ca675.ui.view.AppRoot", {});

            /**
             * Called when the application is initialised.
             */
            AppRoot.prototype.onInit = function() {

                /**
                 * This controller is always loaded meaning it is the most sensible place to handle the global session
                 * timeout failure when the application tries to require sources. When the session expires and the user
                 * clicks an element of the UI which triggers a request for application resources, a parse XML error is
                 * thrown. This error occurs because the response contains a HTML page which should redirect to the SAML
                 * login in order to generate a new session. For some reason, SAPUI5 does not parse this HTML, therefore
                 * we must check that the response intended to redirect to login and trigger a refresh of the window.
                 * The window refresh will force the user login and retrieve a new session.
                 *
                 * @param {String}
                 *            errorMsg - Error message sent when 'onerror' event was raised.
                 */
                window.onerror = function(errorMsg) {
                    // this error is requesting the user to login again, force window reload to trigger SSO login.
                    if (jQuery.inArray("Check for 'file not found' or parse errors. Reason: Error: Invalid XML:",
                            errorMsg) >= 0
                            && jQuery.inArray("action=\"https://accounts.sap.com/saml2/idp/sso/accounts.sap.com\"",
                                    errorMsg) >= 0) {
                        ErrorHandler.prototype.handleSessionTimeout();
                    }
                };
            };
            return AppRoot;
        }, true);