sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("logaligroup.invocices.controller.MainView", {
        onInit() {
            const oJSONMODEL = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONMODEL.loadData("/model/SelectionScreenMenu.json");
            oView.setModel(oJSONMODEL, "SelectionScreen");
        },
        onFilter: function(onEvent){

            const oData = this.getView().getModel("SelectionScreen").getData();
            let filters = [];
            if(oData.ShipName !== ""){
                filters.push(new Filter("ShipName",FilterOperator.Contains, oData.ShipName));
            }

            if(oData.CountryKey !== ""){
                filters.push(new Filter("Country",FilterOperator.EQ, oData.CountryKey));
            }
            const oList = this.getView().byId("InvoicesList");
            const oBinding = oList.getBinding("items");
            oBinding.filter(filters);

        },
        onClearFilter: function(){

            const oModelSelScreen = this.getView().getModel("SelectionScreen");

            oModelSelScreen.setProperty("/ShipName", "");
            oModelSelScreen.setProperty("/CountryKey", "");

            const oList = this.getView().byId("InvoicesList");
            const oBinding = oList.getBinding("items");
            oBinding.filter([]);
        }
    });
});