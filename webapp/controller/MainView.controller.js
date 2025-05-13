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
        },
        clickAqui: function(){
            const aPersonas = [
                { nombre: "Juan", apellido: "Pérez" },
                { nombre: "Ana", apellido: "García" },
                { nombre: "Luis", apellido: "Martínez" }
            ];
        
            const oModelPersonas = new sap.ui.model.json.JSONModel(aPersonas);
            const oView = this.getView();
        
            oView.setModel(oModelPersonas, "Personas");
        
            sap.m.MessageToast.show("Modelo 'Personas' cargado en la vista");
        },
        metodoAgregarPersona: function () {
            const oView = this.getView();
        
            const sNombre = oView.byId("inputNombre").getValue();
            const sApellido = oView.byId("inputApellido").getValue();
        
            if (!sNombre || !sApellido) {
                sap.m.MessageToast.show("Por favor ingresa nombre y apellido.");
                return;
            }
        
            const oModel = oView.getModel("Personas");
            const aPersonas = oModel.getData();
        
            aPersonas.push({
                nombre: sNombre,
                apellido: sApellido
            });
        
            oModel.setData(aPersonas); // actualiza el modelo
        
            // Limpia los campos
            oView.byId("inputNombre").setValue("");
            oView.byId("inputApellido").setValue("");
        
            sap.m.MessageToast.show("Persona agregada correctamente.");
        },
        metodoBorrarPersona: function (oEvent) {
            const oButton = oEvent.getSource(); // Botón que fue presionado
            const oListItem = oButton.getParent(); // `CustomListItem` del botón
            const oContext = oListItem.getBindingContext("Personas"); // Obtiene el contexto de la persona
            const oModel = this.getView().getModel("Personas"); // Modelo Personas
            const aPersonas = oModel.getData(); // Datos del modelo (array de personas)
        
            const iIndex = oContext.getPath().split("/").pop(); // Obtiene el índice de la persona seleccionada
            
            // Elimina la persona del array
            aPersonas.splice(iIndex, 1);
        
            // Actualiza el modelo
            oModel.setData(aPersonas);
        
            sap.m.MessageToast.show("Persona eliminada correctamente.");
        }

    });
});