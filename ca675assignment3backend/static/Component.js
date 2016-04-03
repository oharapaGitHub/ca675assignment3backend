sap.ui.define([ "com/dcu/ca675/ui/js/AppConfig", "sap/ui/core/routing/History",
        "sap/m/routing/RouteMatchedHandler" ], function(AppConfig) {
    "use strict";
    var Component = sap.ui.core.UIComponent.extend("com.dcu.ca675.ui.Component", {

        metadata: {
            name: "ca675_cbpohjs_ui",
            version: "1.0",
            includes: [],
            dependencies: {
                libs: [ "sap.m", "sap.ui.layout" ],
                components: []
            },
            rootView: "com.dcu.ca675.ui.view.AppRoot",

            config: {
                resourceBundle: "resources/ClickData_general.properties"
            },

            routing: {
                config: {

                    viewType: sap.ui.core.mvc.ViewType.XML,
                    viewPath: "com.dcu.ca675.ui.view",
                    targetControl: "rootAppControl",
                    targetAggregation: "pages",
                    clearTarget: false
                },
                routes: [ {
                    pattern: "",
                    name: "ClickData_explore",
                    view: "ClickData_explore"
                } ]
            }
        }
    });

    Component.prototype.destroy = function() {
        if (this.routeHandler) {
            this.routeHandler.destroy();
        }
        sap.ui.core.UIComponent.apply(this.arguments);

    };

    Component.prototype.init = function() {

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        var mConfig = this.getMetadata().getConfig();

        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath("com.dcu.ca675.ui");

        var router = this.getRouter();

        this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
        router.register("appRouter");
        router.initialize();

        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: [ rootPath, mConfig.resourceBundle ].join("/")
        });
        this.setModel(i18nModel, "resources");

        // set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
        });
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "device");

        sap.ui.getCore().setModel(new AppConfig(), "appConfig");
    };

    return Component;
}, true);
