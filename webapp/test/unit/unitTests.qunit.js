/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"logaligroup/invocices/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
